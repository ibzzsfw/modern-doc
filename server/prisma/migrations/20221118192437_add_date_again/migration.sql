-- AlterTable
ALTER TABLE "UserField" ALTER COLUMN "date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserFolder" ALTER COLUMN "date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserFreeUploadFile" ALTER COLUMN "date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserGeneratedFile" ALTER COLUMN "date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserUploadedFile" ADD COLUMN     "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
