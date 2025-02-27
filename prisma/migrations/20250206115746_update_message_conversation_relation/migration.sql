/*
  Warnings:

  - You are about to drop the column `text` on the `Message` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "text",
ADD COLUMN     "content" TEXT NOT NULL;
