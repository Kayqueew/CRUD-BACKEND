/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateOfBirth` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cpf` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telephone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nationality` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maritalStatus` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
DROP COLUMN "username",
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "dateOfBirth" SET NOT NULL,
ALTER COLUMN "cpf" SET NOT NULL,
ALTER COLUMN "telephone" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "nationality" SET NOT NULL,
ALTER COLUMN "maritalStatus" SET NOT NULL;

-- CreateTable
CREATE TABLE "CreateUser" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL DEFAULT 'temp_username',
    "password" TEXT NOT NULL DEFAULT 'temp_password',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CreateUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CreateUser_userId_key" ON "CreateUser"("userId");

-- AddForeignKey
ALTER TABLE "CreateUser" ADD CONSTRAINT "CreateUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
