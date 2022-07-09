-- AlterEnum
ALTER TYPE "Unity" ADD VALUE 'sizes';

-- CreateTable
CREATE TABLE "sizes" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "inventory" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sizes" ADD CONSTRAINT "sizes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
