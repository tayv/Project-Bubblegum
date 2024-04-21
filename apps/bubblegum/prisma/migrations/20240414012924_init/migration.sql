-- CreateEnum
CREATE TYPE "LicenseType" AS ENUM ('FREE', 'PRO');

-- CreateEnum
CREATE TYPE "LicenseDuration" AS ENUM ('INDEFINITE', 'ONE_MONTH', 'THREE_MONTHS', 'SIX_MONTHS', 'ONE_YEAR');

-- CreateEnum
CREATE TYPE "ProductId" AS ENUM ('PRODUCT1', 'PRODUCT2', 'PRODUCT3');

-- CreateEnum
CREATE TYPE "DocStatus" AS ENUM ('DRAFT', 'PENDING_SIGNATURE', 'DONE_ESIGN', 'DONE_PRINTSIGN');

-- CreateTable
CREATE TABLE "License" (
    "userId" TEXT NOT NULL,
    "licenseType" "LicenseType" NOT NULL,
    "licenseDuration" "LicenseDuration" NOT NULL,
    "licenseStart" TIMESTAMP(3) NOT NULL,
    "licenseExpire" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ProductCatalog" (
    "productId" "ProductId" NOT NULL,
    "productSchema" TEXT NOT NULL,

    CONSTRAINT "ProductCatalog_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserDocData" (
    "userId" TEXT NOT NULL,
    "productId" "ProductId" NOT NULL,
    "docId" SERIAL NOT NULL,
    "docName" TEXT NOT NULL,
    "status" "DocStatus" NOT NULL,
    "formData" JSONB DEFAULT '{}',

    CONSTRAINT "UserDocData_pkey" PRIMARY KEY ("docId")
);

-- CreateIndex
CREATE UNIQUE INDEX "License_userId_key" ON "License"("userId");

-- CreateIndex
CREATE INDEX "License_userId_idx" ON "License"("userId");

-- CreateIndex
CREATE INDEX "UserDocData_productId_idx" ON "UserDocData"("productId");

-- CreateIndex
CREATE INDEX "UserDocData_userId_idx" ON "UserDocData"("userId");
