-- DropForeignKey
ALTER TABLE "AcademicData" DROP CONSTRAINT "AcademicData_userId_fkey";

-- DropForeignKey
ALTER TABLE "EmergencyContact" DROP CONSTRAINT "EmergencyContact_userId_fkey";

-- AlterTable
ALTER TABLE "AcademicData" ALTER COLUMN "registrationNumber" DROP NOT NULL,
ALTER COLUMN "course" DROP NOT NULL,
ALTER COLUMN "yearOfEntry" DROP NOT NULL,
ALTER COLUMN "currentSemester" DROP NOT NULL,
ALTER COLUMN "academicStatus" DROP NOT NULL,
ALTER COLUMN "gpa" DROP NOT NULL,
ALTER COLUMN "educationMode" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "number" DROP NOT NULL,
ALTER COLUMN "complement" DROP NOT NULL,
ALTER COLUMN "neighborhood" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "postalCode" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EmergencyContact" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "relationship" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AcademicData" ADD CONSTRAINT "AcademicData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
