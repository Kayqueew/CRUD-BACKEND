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
  HOMEM = 'HOMEM',
  MULHER = 'MULHER',
  OUTRO = 'OUTRO',
  PREFIRO_NÃO_RESPONDER = 'PREFIRO_NÃO_RESPONDER',
}

export enum MaritalStatus {
  SOLTEIRO = 'SOLTEIRO',
  CASADO = 'CASADO',
  VIÚVO = 'VIÚVO',
  DIVORCIADO = 'DIVORCIADO',
  OUTRO = 'OUTRO',
}

export enum AcademicStatus {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
  GRADUADO = 'GRADUADO',
  FORA_DA_FACULDADE = 'FORA_DA_FACULDADE',
  SUSPENSO = 'SUSPENSO',
}

export enum EducationMode {
  PRESENCIAL = 'PRESENCIAL',
  REMOTO = 'REMOTO',
  HIBRIDO = 'HIBRIDO',
}

// DTOs para dados relacionados
export class AddressDto {
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
  complement: string;

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

export class AcademicDataDto {
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
  gpa: string;

  @IsNotEmpty()
  @IsEnum(EducationMode)
  educationMode: EducationMode;
  //id: number;
}

export class EmergencyContactDto {
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
  //id: number;
}

export class CreateUserLogin {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

// DTO principal
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

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
  @IsArray()
  @Type(() => AddressDto)
  address: AddressDto[];

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => AcademicDataDto)
  academicData: AcademicDataDto[];

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => EmergencyContactDto)
  emergencyContacts: EmergencyContactDto[];
  //static id: any;
}
