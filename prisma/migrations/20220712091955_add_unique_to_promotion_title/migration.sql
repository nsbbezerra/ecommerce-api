/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `promotions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "promotions" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "promotions_title_key" ON "promotions"("title");
