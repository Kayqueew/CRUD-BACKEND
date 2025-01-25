import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    // Retorna todos os usuários com os dados relacionados
    return this.prisma.user.findMany({
      include: {
        addressId: true,
        academicDataId: true,
        emergencyContactsId: true,
      },
    });
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          addressId: true,
          academicDataId: true,
          emergencyContactsId: true,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      console.error('Error finding user:', error.message);
      throw error;
    }
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
        await prisma.address.deleteMany({ where: { userId: id } }); // Deleta dados antigos
        await prisma.address.createMany({
          data: address.map((data) => ({
            ...data,
            userId: id, // Atualiza os dados relacionados ao ID do usuário
          })),
        });
      }

      if (academicData) {
        await prisma.academicData.deleteMany({ where: { userId: id } });
        await prisma.academicData.createMany({
          data: academicData.map((data) => ({
            ...data,
            userId: id, //
            gpa: data.gpa,
          })),
        });
      }

      if (emergencyContacts?.length) {
        await prisma.emergencyContact.deleteMany({ where: { userId: id } });
        await prisma.emergencyContact.createMany({
          data: emergencyContacts.map((contact) => ({
            ...contact,
            userId: id,
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
