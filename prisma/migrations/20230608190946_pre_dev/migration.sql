/*
  Warnings:

  - You are about to drop the column `userId` on the `Meetup` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meetup" DROP CONSTRAINT "Meetup_userId_fkey";

-- AlterTable
ALTER TABLE "Meetup" DROP COLUMN "userId";
