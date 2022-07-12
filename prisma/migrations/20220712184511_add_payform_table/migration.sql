-- AlterEnum
ALTER TYPE "PaymentMethod" ADD VALUE 'pix';

-- CreateTable
CREATE TABLE "pay_forms" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tag" "PaymentMethod" NOT NULL,
    "is_installments" BOOLEAN NOT NULL,
    "installments" INTEGER NOT NULL,
    "interval_days" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pay_forms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pay_forms" ADD CONSTRAINT "pay_forms_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
