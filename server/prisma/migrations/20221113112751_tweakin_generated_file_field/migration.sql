/*
  Warnings:

  - You are about to drop the column `uploadedFileId` on the `GeneratedFileField` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GeneratedFileField" DROP COLUMN "uploadedFileId",
ADD COLUMN     "isRequired" BOOLEAN NOT NULL DEFAULT false;
