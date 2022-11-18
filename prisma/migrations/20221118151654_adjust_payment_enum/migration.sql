/*
  Warnings:

  - You are about to drop the column `payment_type` on the `orders` table. All the data in the column will be lost.
  - The `payment_method` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `checkout_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PaymentMethod" ADD VALUE 'check';
ALTER TYPE "PaymentMethod" ADD VALUE 'checkout';

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "payment_type",
ADD COLUMN     "checkout_id" TEXT NOT NULL,
DROP COLUMN "payment_method",
ADD COLUMN     "payment_method" "PaymentMethod";
