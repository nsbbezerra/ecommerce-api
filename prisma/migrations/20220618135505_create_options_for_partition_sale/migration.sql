/*
  Warnings:

  - You are about to drop the column `product_id` on the `partition_sale` table. All the data in the column will be lost.
  - Added the required column `category` to the `partition_sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `partition_sale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "partition_sale" DROP CONSTRAINT "partition_sale_product_id_fkey";

-- AlterTable
ALTER TABLE "partition_sale" DROP COLUMN "product_id",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "company_id" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "sale_options_category" TEXT;

-- AddForeignKey
ALTER TABLE "partition_sale" ADD CONSTRAINT "partition_sale_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partition_sale" ADD CONSTRAINT "partition_sale_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
