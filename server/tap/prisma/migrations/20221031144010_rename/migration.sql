/*
  Warnings:

  - You are about to drop the column `phoneNumbers` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_phoneNumbers_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phoneNumbers",
ADD COLUMN     "phoneNumber" VARCHAR(10) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");
