/*
  Warnings:

  - You are about to drop the `generatedFileTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `uploadedFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `uploadedFileTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userField` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userFolder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userGeneratedFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FolderUploadedFile" DROP CONSTRAINT "FolderUploadedFile_uploadedFileId_fkey";

-- DropForeignKey
ALTER TABLE "UserUploadedFile" DROP CONSTRAINT "UserUploadedFile_uploadedFileId_fkey";

-- DropForeignKey
ALTER TABLE "generatedFileTag" DROP CONSTRAINT "generatedFileTag_generatedFileId_fkey";

-- DropForeignKey
ALTER TABLE "generatedFileTag" DROP CONSTRAINT "generatedFileTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "uploadedFileTag" DROP CONSTRAINT "uploadedFileTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "uploadedFileTag" DROP CONSTRAINT "uploadedFileTag_uploadedFileId_fkey";

-- DropForeignKey
ALTER TABLE "userField" DROP CONSTRAINT "userField_fieldId_fkey";

-- DropForeignKey
ALTER TABLE "userField" DROP CONSTRAINT "userField_userId_fkey";

-- DropForeignKey
ALTER TABLE "userFolder" DROP CONSTRAINT "userFolder_folderId_fkey";

-- DropForeignKey
ALTER TABLE "userFolder" DROP CONSTRAINT "userFolder_userId_fkey";

-- DropForeignKey
ALTER TABLE "userGeneratedFile" DROP CONSTRAINT "userGeneratedFile_generatedFileId_fkey";

-- DropForeignKey
ALTER TABLE "userGeneratedFile" DROP CONSTRAINT "userGeneratedFile_userId_fkey";

-- DropTable
DROP TABLE "generatedFileTag";

-- DropTable
DROP TABLE "uploadedFile";

-- DropTable
DROP TABLE "uploadedFileTag";

-- DropTable
DROP TABLE "userField";

-- DropTable
DROP TABLE "userFolder";

-- DropTable
DROP TABLE "userGeneratedFile";

-- CreateTable
CREATE TABLE "UploadedFile" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "officialName" TEXT NOT NULL,
    "description" TEXT,
    "dayLifeSpan" INTEGER NOT NULL DEFAULT 0,
    "URI" TEXT NOT NULL,

    CONSTRAINT "UploadedFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadedFileTag" (
    "id" UUID NOT NULL,
    "uploadedFileId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "UploadedFileTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneratedFileTag" (
    "id" UUID NOT NULL,
    "generatedFileId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "GeneratedFileTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFolder" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "folderId" UUID NOT NULL,

    CONSTRAINT "UserFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGeneratedFile" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "generatedFileId" UUID NOT NULL,

    CONSTRAINT "UserGeneratedFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserField" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "fieldId" UUID NOT NULL,

    CONSTRAINT "UserField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FolderTag" (
    "id" UUID NOT NULL,
    "folderId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "FolderTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UploadedFile_name_key" ON "UploadedFile"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UploadedFile_officialName_key" ON "UploadedFile"("officialName");

-- CreateIndex
CREATE UNIQUE INDEX "UploadedFileTag_uploadedFileId_tagId_key" ON "UploadedFileTag"("uploadedFileId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "GeneratedFileTag_generatedFileId_tagId_key" ON "GeneratedFileTag"("generatedFileId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFolder_userId_folderId_key" ON "UserFolder"("userId", "folderId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGeneratedFile_userId_generatedFileId_key" ON "UserGeneratedFile"("userId", "generatedFileId");

-- CreateIndex
CREATE UNIQUE INDEX "UserField_userId_fieldId_key" ON "UserField"("userId", "fieldId");

-- CreateIndex
CREATE UNIQUE INDEX "FolderTag_folderId_tagId_key" ON "FolderTag"("folderId", "tagId");

-- AddForeignKey
ALTER TABLE "UserUploadedFile" ADD CONSTRAINT "UserUploadedFile_uploadedFileId_fkey" FOREIGN KEY ("uploadedFileId") REFERENCES "UploadedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderUploadedFile" ADD CONSTRAINT "FolderUploadedFile_uploadedFileId_fkey" FOREIGN KEY ("uploadedFileId") REFERENCES "UploadedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedFileTag" ADD CONSTRAINT "UploadedFileTag_uploadedFileId_fkey" FOREIGN KEY ("uploadedFileId") REFERENCES "UploadedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedFileTag" ADD CONSTRAINT "UploadedFileTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedFileTag" ADD CONSTRAINT "GeneratedFileTag_generatedFileId_fkey" FOREIGN KEY ("generatedFileId") REFERENCES "GeneratedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedFileTag" ADD CONSTRAINT "GeneratedFileTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFolder" ADD CONSTRAINT "UserFolder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFolder" ADD CONSTRAINT "UserFolder_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGeneratedFile" ADD CONSTRAINT "UserGeneratedFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGeneratedFile" ADD CONSTRAINT "UserGeneratedFile_generatedFileId_fkey" FOREIGN KEY ("generatedFileId") REFERENCES "GeneratedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserField" ADD CONSTRAINT "UserField_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserField" ADD CONSTRAINT "UserField_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderTag" ADD CONSTRAINT "FolderTag_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderTag" ADD CONSTRAINT "FolderTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
