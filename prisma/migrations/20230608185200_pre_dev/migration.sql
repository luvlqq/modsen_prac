/*
  Warnings:

  - Added the required column `userId` to the `Meetup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_joinMeetup_fkey";

-- AlterTable
ALTER TABLE "Meetup" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Meetup" ADD CONSTRAINT "Meetup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
