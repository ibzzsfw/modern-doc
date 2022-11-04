/*
  Warnings:

  - You are about to drop the column `officialText` on the `FieldChoice` table. All the data in the column will be lost.
  - Added the required column `officialName` to the `FieldChoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FieldChoice" DROP COLUMN "officialText",
ADD COLUMN     "officialName" TEXT NOT NULL;
