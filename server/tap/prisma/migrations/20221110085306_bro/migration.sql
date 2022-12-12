/*
  Warnings:

  - The `relationship` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `sex` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FolderGeneratedFile" ADD COLUMN     "remark" TEXT;

-- AlterTable
ALTER TABLE "FolderUploadedFile" ADD COLUMN     "remark" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sex",
ADD COLUMN     "sex" "Sex" NOT NULL,
DROP COLUMN "relationship",
ADD COLUMN     "relationship" "Relationship" NOT NULL DEFAULT 'householder';

-- AlterTable
ALTER TABLE "UserFolder" ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "UserGeneratedFile" ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "UserUploadedFile" ADD COLUMN     "note" TEXT;
