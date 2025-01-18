import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  //UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto); // Método público, sem o AuthGuard
  }

  @Get()
  // @UseGuards(AuthGuard('jwt')) // Exige autenticação
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  // @UseGuards(AuthGuard('jwt')) // Exige autenticação
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get(':id/address')
  // @UseGuards(AuthGuard('jwt')) // Exige autenticação
  async getAddress(@Param('id') id: string) {
    return this.userService.getAddress(+id);
  }

  @Get(':id/academicData')
  // @UseGuards(AuthGuard('jwt')) // Exige autenticação
  async getAcademicData(@Param('id') id: string) {
    return this.userService.getAcademicData(+id);
  }

  @Get(':id/emergencyContacts')
  // @UseGuards(AuthGuard('jwt')) // Exige autenticação
  async getEmergencyContacts(@Param('id') id: string) {
    return this.userService.getEmergencyContacts(+id);
  }

  @Patch(':id')
  // @UseGuards(AuthGuard('jwt')) // Exige autenticação
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard('jwt')) // Exige autenticação
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
