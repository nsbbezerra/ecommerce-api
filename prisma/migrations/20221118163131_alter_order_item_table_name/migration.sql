/*
  Warnings:

  - You are about to drop the `product_items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_items" DROP CONSTRAINT "product_items_order_id_fkey";

-- DropForeignKey
ALTER TABLE "product_items" DROP CONSTRAINT "product_items_product_id_fkey";

-- DropTable
DROP TABLE "product_items";

-- CreateTable
CREATE TABLE "order_items" (
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

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
