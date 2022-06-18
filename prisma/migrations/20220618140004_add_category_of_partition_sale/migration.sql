/*
  Warnings:

  - You are about to drop the column `category` on the `partition_sale` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `partition_sale` table. All the data in the column will be lost.
  - Added the required column `partition_sale_category_id` to the `partition_sale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "partition_sale" DROP CONSTRAINT "partition_sale_company_id_fkey";

-- AlterTable
ALTER TABLE "partition_sale" DROP COLUMN "category",
DROP COLUMN "company_id",
ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "partition_sale_category_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "partition_sale_category" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partition_sale_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "partition_sale_category" ADD CONSTRAINT "partition_sale_category_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partition_sale" ADD CONSTRAINT "partition_sale_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partition_sale" ADD CONSTRAINT "partition_sale_partition_sale_category_id_fkey" FOREIGN KEY ("partition_sale_category_id") REFERENCES "partition_sale_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
