/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserCreate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserCreate" DROP CONSTRAINT "UserCreate_userId_fkey";

-- AlterTable
ALTER TABLE "UserCreate" ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserCreate_userId_key" ON "UserCreate"("userId");

-- AddForeignKey
ALTER TABLE "UserCreate" ADD CONSTRAINT "UserCreate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
