-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('m', 'f');

-- CreateEnum
CREATE TYPE "Relationship" AS ENUM ('householder', 'father', 'mother', 'children', 'cousin', 'spouse', 'other');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "householdId" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "phoneNumbers" VARCHAR(10) NOT NULL,
    "email" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "citizenId" VARCHAR(13) NOT NULL,
    "relationship" "Relationship" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "officialName" TEXT NOT NULL,
    "description" TEXT,
    "validationSchema" JSONB NOT NULL,
    "generatedFileId" UUID,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneratedFile" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "officialName" TEXT NOT NULL,
    "description" TEXT,
    "dayLifeSpan" INTEGER NOT NULL DEFAULT 0,
    "URI" TEXT NOT NULL,

    CONSTRAINT "GeneratedFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneratedFileField" (
    "id" UUID NOT NULL,
    "generatedFileId" UUID NOT NULL,
    "fieldId" UUID NOT NULL,
    "uploadedFileId" UUID,

    CONSTRAINT "GeneratedFileField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uploadedFile" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "officialName" TEXT NOT NULL,
    "description" TEXT,
    "dayLifeSpan" INTEGER NOT NULL DEFAULT 0,
    "URI" TEXT NOT NULL,

    CONSTRAINT "uploadedFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserUploadedFile" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "uploadedFileId" UUID NOT NULL,
    "URI" TEXT NOT NULL,
    "isShared" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserUploadedFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFreeUploadFile" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "uploadedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expirationDate" TIMESTAMP(3),
    "note" TEXT,
    "URI" TEXT NOT NULL,
    "isShared" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserFreeUploadFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMP(3) NOT NULL,
    "heading" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Folder" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "officialName" TEXT NOT NULL,
    "description" TEXT,
    "dayLifeSpan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FolderUploadedFile" (
    "id" UUID NOT NULL,
    "folderId" UUID NOT NULL,
    "uploadedFileId" UUID NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "FolderUploadedFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FolderGeneratedFile" (
    "id" UUID NOT NULL,
    "folderId" UUID NOT NULL,
    "generatedFileId" UUID NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "FolderGeneratedFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uploadedFileTag" (
    "id" UUID NOT NULL,
    "uploadedFileId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "uploadedFileTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generatedFileTag" (
    "id" UUID NOT NULL,
    "generatedFileId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "generatedFileTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userFolder" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "folderId" UUID NOT NULL,

    CONSTRAINT "userFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userGeneratedFile" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "generatedFileId" UUID NOT NULL,

    CONSTRAINT "userGeneratedFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userField" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "fieldId" UUID NOT NULL,

    CONSTRAINT "userField_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumbers_key" ON "User"("phoneNumbers");

-- CreateIndex
CREATE UNIQUE INDEX "User_citizenId_key" ON "User"("citizenId");

-- CreateIndex
CREATE UNIQUE INDEX "Field_name_key" ON "Field"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Field_officialName_key" ON "Field"("officialName");

-- CreateIndex
CREATE UNIQUE INDEX "GeneratedFile_name_key" ON "GeneratedFile"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GeneratedFile_officialName_key" ON "GeneratedFile"("officialName");

-- CreateIndex
CREATE UNIQUE INDEX "GeneratedFileField_generatedFileId_fieldId_key" ON "GeneratedFileField"("generatedFileId", "fieldId");

-- CreateIndex
CREATE UNIQUE INDEX "uploadedFile_name_key" ON "uploadedFile"("name");

-- CreateIndex
CREATE UNIQUE INDEX "uploadedFile_officialName_key" ON "uploadedFile"("officialName");

-- CreateIndex
CREATE UNIQUE INDEX "UserUploadedFile_userId_uploadedFileId_key" ON "UserUploadedFile"("userId", "uploadedFileId");

-- CreateIndex
CREATE UNIQUE INDEX "FolderUploadedFile_folderId_uploadedFileId_key" ON "FolderUploadedFile"("folderId", "uploadedFileId");

-- CreateIndex
CREATE UNIQUE INDEX "FolderGeneratedFile_folderId_generatedFileId_key" ON "FolderGeneratedFile"("folderId", "generatedFileId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "uploadedFileTag_uploadedFileId_tagId_key" ON "uploadedFileTag"("uploadedFileId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "generatedFileTag_generatedFileId_tagId_key" ON "generatedFileTag"("generatedFileId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "userFolder_userId_folderId_key" ON "userFolder"("userId", "folderId");

-- CreateIndex
CREATE UNIQUE INDEX "userGeneratedFile_userId_generatedFileId_key" ON "userGeneratedFile"("userId", "generatedFileId");

-- CreateIndex
CREATE UNIQUE INDEX "userField_userId_fieldId_key" ON "userField"("userId", "fieldId");

-- AddForeignKey
ALTER TABLE "GeneratedFileField" ADD CONSTRAINT "GeneratedFileField_generatedFileId_fkey" FOREIGN KEY ("generatedFileId") REFERENCES "GeneratedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedFileField" ADD CONSTRAINT "GeneratedFileField_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUploadedFile" ADD CONSTRAINT "UserUploadedFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUploadedFile" ADD CONSTRAINT "UserUploadedFile_uploadedFileId_fkey" FOREIGN KEY ("uploadedFileId") REFERENCES "uploadedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFreeUploadFile" ADD CONSTRAINT "UserFreeUploadFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderUploadedFile" ADD CONSTRAINT "FolderUploadedFile_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderUploadedFile" ADD CONSTRAINT "FolderUploadedFile_uploadedFileId_fkey" FOREIGN KEY ("uploadedFileId") REFERENCES "uploadedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderGeneratedFile" ADD CONSTRAINT "FolderGeneratedFile_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderGeneratedFile" ADD CONSTRAINT "FolderGeneratedFile_generatedFileId_fkey" FOREIGN KEY ("generatedFileId") REFERENCES "GeneratedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uploadedFileTag" ADD CONSTRAINT "uploadedFileTag_uploadedFileId_fkey" FOREIGN KEY ("uploadedFileId") REFERENCES "uploadedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uploadedFileTag" ADD CONSTRAINT "uploadedFileTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generatedFileTag" ADD CONSTRAINT "generatedFileTag_generatedFileId_fkey" FOREIGN KEY ("generatedFileId") REFERENCES "GeneratedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generatedFileTag" ADD CONSTRAINT "generatedFileTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFolder" ADD CONSTRAINT "userFolder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFolder" ADD CONSTRAINT "userFolder_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userGeneratedFile" ADD CONSTRAINT "userGeneratedFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userGeneratedFile" ADD CONSTRAINT "userGeneratedFile_generatedFileId_fkey" FOREIGN KEY ("generatedFileId") REFERENCES "GeneratedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userField" ADD CONSTRAINT "userField_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userField" ADD CONSTRAINT "userField_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
