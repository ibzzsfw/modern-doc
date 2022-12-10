/*
  Warnings:

  - You are about to drop the column `ModifiedDate` on the `Note` table. All the data in the column will be lost.
  - Added the required column `modifiedDate` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "ModifiedDate",
ADD COLUMN     "modifiedDate" TIMESTAMP(3) NOT NULL;
