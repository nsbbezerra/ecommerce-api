-- CreateEnum
CREATE TYPE "CashierStatus" AS ENUM ('opened', 'closed');

-- CreateEnum
CREATE TYPE "CashierMovimentType" AS ENUM ('deposit', 'withdraw');

-- CreateTable
CREATE TABLE "cashiers" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "open_value" DECIMAL(10,2) NOT NULL,
    "open_date" TIMESTAMP(3) NOT NULL,
    "close_value" DECIMAL(10,2) NOT NULL,
    "close_date" TIMESTAMP(3) NOT NULL,
    "status" "CashierStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cashiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cashier_moviments" (
    "id" TEXT NOT NULL,
    "cashier_id" TEXT NOT NULL,
    "moviment_type" "CashierMovimentType" NOT NULL,
    "description" TEXT NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cashier_moviments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cashiers" ADD CONSTRAINT "cashiers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cashiers" ADD CONSTRAINT "cashiers_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cashier_moviments" ADD CONSTRAINT "cashier_moviments_cashier_id_fkey" FOREIGN KEY ("cashier_id") REFERENCES "cashiers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
