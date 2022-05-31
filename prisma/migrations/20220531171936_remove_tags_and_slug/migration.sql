/*
  Warnings:

  - You are about to drop the `slugs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "slugs" DROP CONSTRAINT "slugs_product_id_fkey";

-- DropForeignKey
ALTER TABLE "slugs" DROP CONSTRAINT "slugs_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_company_id_fkey";

-- DropTable
DROP TABLE "slugs";

-- DropTable
DROP TABLE "tags";
