/*
  Warnings:

  - You are about to drop the column `productId` on the `partition_sale` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "partition_sale" DROP CONSTRAINT "partition_sale_productId_fkey";

-- AlterTable
ALTER TABLE "partition_sale" DROP COLUMN "productId";
