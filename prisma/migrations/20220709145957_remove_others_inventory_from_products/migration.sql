/*
  Warnings:

  - You are about to drop the column `length` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `liter` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `products` table. All the data in the column will be lost.
  - You are about to alter the column `inventory` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "length",
DROP COLUMN "liter",
DROP COLUMN "weight",
ALTER COLUMN "inventory" SET DATA TYPE DECIMAL(10,2);
