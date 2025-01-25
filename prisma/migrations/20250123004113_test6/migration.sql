/*
  Warnings:

  - Made the column `userId` on table `UserCreate` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserCreate" DROP CONSTRAINT "UserCreate_userId_fkey";

-- AlterTable
ALTER TABLE "UserCreate" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "UserCreate" ADD CONSTRAINT "UserCreate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
