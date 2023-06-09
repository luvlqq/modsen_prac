/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Meetup` table. All the data in the column will be lost.
  - You are about to drop the `_MeetupParticipants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meetup" DROP CONSTRAINT "Meetup_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "_MeetupParticipants" DROP CONSTRAINT "_MeetupParticipants_A_fkey";

-- DropForeignKey
ALTER TABLE "_MeetupParticipants" DROP CONSTRAINT "_MeetupParticipants_B_fkey";

-- AlterTable
ALTER TABLE "Meetup" DROP COLUMN "creatorId",
ADD COLUMN     "meetupCreator" INTEGER;

-- DropTable
DROP TABLE "_MeetupParticipants";

-- CreateTable
CREATE TABLE "_MeetupFollower" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MeetupFollower_AB_unique" ON "_MeetupFollower"("A", "B");

-- CreateIndex
CREATE INDEX "_MeetupFollower_B_index" ON "_MeetupFollower"("B");

-- AddForeignKey
ALTER TABLE "Meetup" ADD CONSTRAINT "Meetup_meetupCreator_fkey" FOREIGN KEY ("meetupCreator") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeetupFollower" ADD CONSTRAINT "_MeetupFollower_A_fkey" FOREIGN KEY ("A") REFERENCES "Meetup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeetupFollower" ADD CONSTRAINT "_MeetupFollower_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
