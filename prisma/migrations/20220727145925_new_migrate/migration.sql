/*
  Warnings:

  - You are about to drop the `Comissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comissions" DROP CONSTRAINT "Comissions_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Comissions" DROP CONSTRAINT "Comissions_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "Comissions" DROP CONSTRAINT "Comissions_order_id_fkey";

-- DropTable
DROP TABLE "Comissions";

-- CreateTable
CREATE TABLE "comissions" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comissions" ADD CONSTRAINT "comissions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comissions" ADD CONSTRAINT "comissions_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comissions" ADD CONSTRAINT "comissions_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
