-- CreateEnum
CREATE TYPE "TypeSale" AS ENUM ('unique', 'partition');

-- AlterEnum
ALTER TYPE "Unity" ADD VALUE 'without';

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "sale_options" INTEGER,
ADD COLUMN     "type_sale" "TypeSale";

-- CreateTable
CREATE TABLE "partition_sale" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partition_sale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "partition_sale" ADD CONSTRAINT "partition_sale_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
