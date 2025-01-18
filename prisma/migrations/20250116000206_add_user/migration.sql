/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalStatus` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "maritalStatus" TEXT NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "telephone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");