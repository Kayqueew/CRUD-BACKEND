import {
  IsString,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsArray,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';

// Enums
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
  OTHER = 'OTHER',
}

export enum AcademicStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  GRADUATED = 'GRADUATED',
  DROPPED_OUT = 'DROPPED_OUT',
  SUSPENDED = 'SUSPENDED',
}

export enum EducationMode {
  PRESENTIAL = 'PRESENTIAL',
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
}

// DTOs para dados relacionados
class AddressDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}

class AcademicDataDto {
  @IsNotEmpty()
  @IsString()
  registrationNumber: string;

  @IsNotEmpty()
  @IsString()
  course: string;

  @IsNotEmpty()
  yearOfEntry: number;

  @IsNotEmpty()
  currentSemester: number;

  @IsNotEmpty()
  @IsEnum(AcademicStatus)
  academicStatus: AcademicStatus;

  @IsOptional()
  @IsString()
  gpa?: string;

  @IsNotEmpty()
  @IsEnum(EducationMode)
  educationMode: EducationMode;
}

class EmergencyContactDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  relationship: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

// DTO principal
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsNotEmpty()
  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => AcademicDataDto)
  academicData: AcademicDataDto[];

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => EmergencyContactDto)
  emergencyContacts: EmergencyContactDto[];
  static id: any;
}
