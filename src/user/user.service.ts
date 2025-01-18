import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { address, academicData, emergencyContacts, ...userData } =
      createUserDto;

    const user = await this.prisma.$transaction(async (prisma) => {
      // Cria o usuário principal
      const createdUser = await prisma.user.create({
        data: userData,
      });

      // Cria o endereço
      if (address) {
        await prisma.address.create({
          data: {
            ...address,
            userId: createdUser.id, // Relaciona ao ID do usuário criado
          },
        });
      }

      // Cria os dados acadêmicos
      if (academicData?.length) {
        await prisma.academicData.createMany({
          data: academicData.map((data) => ({
            ...data,
            userId: createdUser.id, // Relaciona ao ID do usuário criado
            gpa: data.gpa,
          })),
        });
      }

      // Cria os contatos de emergência
      if (emergencyContacts?.length) {
        await prisma.emergencyContact.createMany({
          data: emergencyContacts.map((contact) => ({
            ...contact,
            userId: createdUser.id, // Relaciona ao ID do usuário criado
          })),
        });
      }

      return createdUser;
    });

    return user;
  }

  findAll() {
    // Retorna todos os usuários com os dados relacionados
    return this.prisma.user.findMany({
      include: {
        address: true,
        academicData: true,
        emergencyContacts: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        address: true,
        academicData: true,
        emergencyContacts: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { address, academicData, emergencyContacts, ...userData } =
      updateUserDto;

    // Atualiza o usuário e os dados relacionados
    const user = await this.prisma.$transaction(async (prisma) => {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: userData,
      });

      if (address) {
        await prisma.address.update({
          where: { userId: id },
          data: address,
        });
      }

      if (academicData) {
        await prisma.academicData.deleteMany({ where: { userId: id } }); // Deleta dados acadêmicos antigos
        await prisma.academicData.createMany({
          data: academicData.map((data) => ({
            ...data,
            userId: id, // Atualiza os dados relacionados ao ID do usuário
            gpa: data.gpa,
          })),
        });
      }

      if (emergencyContacts?.length) {
        await prisma.emergencyContact.deleteMany({ where: { userId: id } }); // Deleta contatos antigos
        await prisma.emergencyContact.createMany({
          data: emergencyContacts.map((contact) => ({
            ...contact,
            userId: id, // Atualiza os contatos relacionados ao ID do usuário
          })),
        });
      }

      return updatedUser;
    });

    return user;
  }

  async getAddress(userId: number) {
    const address = await this.prisma.address.findUnique({
      where: { userId },
    });
    return address;
  }

  async getAcademicData(userId: number) {
    const academicData = await this.prisma.academicData.findMany({
      where: { userId },
    });
    return academicData;
  }

  async getEmergencyContacts(userId: number) {
    const emergencyContacts = await this.prisma.emergencyContact.findMany({
      where: { userId },
    });
    return emergencyContacts;
  }
  remove(id: number) {
    // Remove o usuário e todos os dados relacionados
    return this.prisma.$transaction(async (prisma) => {
      await prisma.address.deleteMany({ where: { userId: id } });
      await prisma.academicData.deleteMany({ where: { userId: id } });
      await prisma.emergencyContact.deleteMany({ where: { userId: id } });
      return prisma.user.delete({ where: { id } });
    });
  }
}
