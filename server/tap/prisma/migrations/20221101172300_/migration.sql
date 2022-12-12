/*
  Warnings:

  - Added the required column `rawValue` to the `UserField` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserField" ADD COLUMN     "rawValue" TEXT NOT NULL;
