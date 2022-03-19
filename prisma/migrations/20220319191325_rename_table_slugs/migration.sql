/*
  Warnings:

  - You are about to drop the `Slug` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Slug" DROP CONSTRAINT "Slug_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Slug" DROP CONSTRAINT "Slug_tag_id_fkey";

-- DropTable
DROP TABLE "Slug";

-- CreateTable
CREATE TABLE "slugs" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "slugs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "slugs" ADD CONSTRAINT "slugs_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slugs" ADD CONSTRAINT "slugs_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
