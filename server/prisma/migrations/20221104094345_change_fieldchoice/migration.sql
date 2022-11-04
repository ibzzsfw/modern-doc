/*
  Warnings:

  - You are about to drop the column `choice` on the `FieldChoice` table. All the data in the column will be lost.
  - Added the required column `name` to the `FieldChoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officialText` to the `FieldChoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FieldChoice" DROP COLUMN "choice",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "officialText" TEXT NOT NULL;
