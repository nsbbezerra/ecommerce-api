-- AlterTable
ALTER TABLE "products" ALTER COLUMN "promotions" DROP NOT NULL,
ALTER COLUMN "promotions" SET DATA TYPE TEXT;
