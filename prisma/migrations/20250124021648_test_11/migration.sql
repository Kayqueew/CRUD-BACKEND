/*
  Warnings:

  - The values [ACTIVE,INACTIVE,GRADUATED,DROPPED_OUT,SUSPENDED] on the enum `AcademicStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PRESENTIAL,REMOTE,HYBRID] on the enum `EducationMode` will be removed. If these variants are still used in the database, this will fail.
  - The values [MALE,FEMALE,OTHER,PREFER_NOT_TO_SAY] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [SINGLE,MARRIED,DIVORCED,WIDOWED,OTHER] on the enum `MaritalStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AcademicStatus_new" AS ENUM ('ATIVO', 'INATIVO', 'GRADUADO', 'FORA_DA_FACULDADE', 'SUSPENSO');
ALTER TABLE "AcademicData" ALTER COLUMN "academicStatus" TYPE "AcademicStatus_new" USING ("academicStatus"::text::"AcademicStatus_new");
ALTER TYPE "AcademicStatus" RENAME TO "AcademicStatus_old";
ALTER TYPE "AcademicStatus_new" RENAME TO "AcademicStatus";
DROP TYPE "AcademicStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EducationMode_new" AS ENUM ('PRESENCIAL', 'REMOTO', 'HIBRIDO');
ALTER TABLE "AcademicData" ALTER COLUMN "educationMode" TYPE "EducationMode_new" USING ("educationMode"::text::"EducationMode_new");
ALTER TYPE "EducationMode" RENAME TO "EducationMode_old";
ALTER TYPE "EducationMode_new" RENAME TO "EducationMode";
DROP TYPE "EducationMode_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('HOMEM', 'MULHER', 'OUTRO', 'PREFIRO_NÃO_RESPONDER');
ALTER TABLE "User" ALTER COLUMN "gender" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
ALTER TABLE "User" ALTER COLUMN "gender" SET DEFAULT 'PREFIRO_NÃO_RESPONDER';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "MaritalStatus_new" AS ENUM ('SOLTEIRO', 'CASADO', 'DIVORCIADO', 'VIÚVO', 'OUTRO');
ALTER TABLE "User" ALTER COLUMN "maritalStatus" TYPE "MaritalStatus_new" USING ("maritalStatus"::text::"MaritalStatus_new");
ALTER TYPE "MaritalStatus" RENAME TO "MaritalStatus_old";
ALTER TYPE "MaritalStatus_new" RENAME TO "MaritalStatus";
DROP TYPE "MaritalStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "dateOfBirth" SET DATA TYPE TEXT,
ALTER COLUMN "gender" SET DEFAULT 'PREFIRO_NÃO_RESPONDER';
