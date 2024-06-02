/*
  Warnings:

  - You are about to drop the `License` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductCatalog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserDocData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "License";

-- DropTable
DROP TABLE "ProductCatalog";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserDocData";

-- CreateTable
CREATE TABLE "license" (
    "user_id" TEXT NOT NULL,
    "license_type" "LicenseType" NOT NULL,
    "license_duration" "LicenseDuration" NOT NULL,
    "license_start" TIMESTAMP(3) NOT NULL,
    "license_expire" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "product_catalog" (
    "product_id" "ProductId" NOT NULL,
    "product_schema" TEXT NOT NULL,

    CONSTRAINT "product_catalog_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_doc_data" (
    "user_id" TEXT NOT NULL,
    "productId" "ProductId" NOT NULL,
    "doc_id" SERIAL NOT NULL,
    "doc_name" TEXT NOT NULL,
    "status" "DocStatus" NOT NULL,
    "form_data" JSONB DEFAULT '{}',

    CONSTRAINT "user_doc_data_pkey" PRIMARY KEY ("doc_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "license_user_id_key" ON "license"("user_id");

-- CreateIndex
CREATE INDEX "license_user_id_idx" ON "license"("user_id");

-- CreateIndex
CREATE INDEX "user_doc_data_productId_idx" ON "user_doc_data"("productId");

-- CreateIndex
CREATE INDEX "user_doc_data_user_id_idx" ON "user_doc_data"("user_id");
