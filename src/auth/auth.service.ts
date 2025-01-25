import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { CreateUserLogin } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  async login(loginDto: CreateUserLogin) {
    const { username, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new NotFoundException('Invalid password');
    }

    // Criar o payload do JWT
    const payload = { id: user.id, name: user.username };

    return {
      token: this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: CreateUserLogin): Promise<any> {
    const { username, password } = registerDto;

    // Verificar se o username já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Montar os dados para criação
    const createData: CreateUserLogin = {
      username,
      password: hashedPassword,
    };

    // Criar o usuário
    const newUser = await this.prisma.user.create({
      data: createData,
    });

    // Criar o payload do JWT
    const payload = { id: newUser.id, name: newUser.username };
    console.log(this.jwtService.sign(payload));
    return {
      message: 'User registered successfully',
      token: this.jwtService.sign(payload),
    };
  }
}
