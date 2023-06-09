/*
  Warnings:

  - Added the required column `creatorId` to the `Meetup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meetup" ADD COLUMN     "creatorId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_MeetupParticipants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MeetupParticipants_AB_unique" ON "_MeetupParticipants"("A", "B");

-- CreateIndex
CREATE INDEX "_MeetupParticipants_B_index" ON "_MeetupParticipants"("B");

-- AddForeignKey
ALTER TABLE "Meetup" ADD CONSTRAINT "Meetup_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeetupParticipants" ADD CONSTRAINT "_MeetupParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "Meetup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeetupParticipants" ADD CONSTRAINT "_MeetupParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
