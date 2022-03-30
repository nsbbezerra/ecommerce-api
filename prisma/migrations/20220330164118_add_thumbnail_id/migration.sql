/*
  Warnings:

  - Added the required column `file_id` to the `assets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_id` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assets" ADD COLUMN     "file_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "thumbnail_id" TEXT,
ALTER COLUMN "type_activation" DROP NOT NULL;

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "image_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "thumbnail_id" TEXT,
ALTER COLUMN "thumbnail" DROP NOT NULL;
