/*
  Warnings:

  - Made the column `gpa` on table `AcademicData` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AcademicData" ALTER COLUMN "gpa" SET NOT NULL,
ALTER COLUMN "gpa" SET DATA TYPE TEXT;
