/*
  Warnings:

  - You are about to drop the column `productId` on the `user_doc_data` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `user_doc_data` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_doc_data_productId_idx";

-- AlterTable
ALTER TABLE "user_doc_data" DROP COLUMN "productId",
ADD COLUMN     "product_id" "ProductId" NOT NULL;

-- CreateIndex
CREATE INDEX "user_doc_data_product_id_idx" ON "user_doc_data"("product_id");
