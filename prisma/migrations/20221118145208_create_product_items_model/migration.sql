/*
  Warnings:

  - Added the required column `employee_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderOrigin" AS ENUM ('ecommerce', 'pdv');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "employee_id" TEXT NOT NULL,
ADD COLUMN     "origin" "OrderOrigin" NOT NULL;

-- CreateTable
CREATE TABLE "product_items" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL,
    "in_promotion" BOOLEAN NOT NULL,
    "profit_percent" DECIMAL(10,2) NOT NULL,
    "type" "Unity" NOT NULL,
    "sale_value" DECIMAL(10,2) NOT NULL,
    "sale_total" DECIMAL(10,2) NOT NULL,
    "partition" JSONB,
    "adictional" JSONB,
    "widths" DECIMAL(10,2),
    "height" DECIMAL(10,2),
    "size" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_items" ADD CONSTRAINT "product_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_items" ADD CONSTRAINT "product_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
