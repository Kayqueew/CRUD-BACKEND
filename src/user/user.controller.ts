import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('/address/:id')
  @UseGuards(JwtAuthGuard)
  async getAddress(@Param('id') id: string) {
    return this.userService.getAddress(+id);
  }

  @Get('/academicData/:id')
  @UseGuards(JwtAuthGuard)
  async getAcademicData(@Param('id') id: string) {
    return this.userService.getAcademicData(+id);
  }

  @Get('/emergencyContacts/:id')
  @UseGuards(JwtAuthGuard)
  async getEmergencyContacts(@Param('id') id: string) {
    return this.userService.getEmergencyContacts(+id);
  }

  @Patch('/update/:id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
