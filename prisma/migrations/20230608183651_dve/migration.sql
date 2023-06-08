/*
  Warnings:

  - Added the required column `joinMeetup` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "joinMeetup" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_joinMeetup_fkey" FOREIGN KEY ("joinMeetup") REFERENCES "Meetup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
