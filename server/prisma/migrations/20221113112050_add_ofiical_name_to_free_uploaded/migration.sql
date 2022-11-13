/*
  Warnings:

  - Added the required column `officialName` to the `UserFreeUploadFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserFreeUploadFile" ADD COLUMN     "officialName" TEXT NOT NULL;
