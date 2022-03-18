-- CreateEnum
CREATE TYPE "PeriodCoupon" AS ENUM ('infinite', 'due_date', 'quantity');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "promotions" TEXT[],
ADD COLUMN     "slugs" TEXT[];

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "coupon" TEXT NOT NULL,
    "dicount" DECIMAL(65,30) NOT NULL,
    "period" "PeriodCoupon" NOT NULL,
    "number_used" INTEGER,
    "expires_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "banner" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "discount" DECIMAL(65,30) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
