/*
  Warnings:

  - You are about to drop the column `validationSchema` on the `Field` table. All the data in the column will be lost.
  - Added the required column `type` to the `Field` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('text', 'number', 'date', 'singleSelect', 'multipleSelect');

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "validationSchema",
ADD COLUMN     "type" "FieldType" NOT NULL;

-- CreateTable
CREATE TABLE "FieldChoice" (
    "id" UUID NOT NULL,
    "fieldId" UUID NOT NULL,
    "choice" TEXT NOT NULL,

    CONSTRAINT "FieldChoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FieldChoice" ADD CONSTRAINT "FieldChoice_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
