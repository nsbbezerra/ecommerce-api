-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('all', 'cashier', 'seller');

-- CreateEnum
CREATE TYPE "Calc" AS ENUM ('marge', 'markup');

-- CreateEnum
CREATE TYPE "Unity" AS ENUM ('square_meter', 'meter', 'unity', 'weight', 'liter');

-- CreateEnum
CREATE TYPE "Payment" AS ENUM ('wait', 'paid_out', 'refused', 'cancel');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('awaiting_payment', 'in_separation', 'cancel', 'order_dispatched', 'finish');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('money', 'credit_card', 'debit_card', 'ticket', 'duplicata');

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" VARCHAR(20) NOT NULL,
    "fantasy_name" TEXT NOT NULL,
    "municipal_registration" TEXT,
    "state_registration" TEXT,
    "phone" VARCHAR(12) NOT NULL,
    "email" TEXT,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "comp" TEXT,
    "district" TEXT NOT NULL,
    "zip_code" VARCHAR(11) NOT NULL,
    "city" TEXT NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "expires_code_date" TIMESTAMP(3) NOT NULL,
    "company_code" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "permission" "Permission" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" VARCHAR(15) NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "comp" TEXT,
    "district" TEXT NOT NULL,
    "zip_code" VARCHAR(11) NOT NULL,
    "city" TEXT NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "sku" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "internal_code" TEXT NOT NULL,
    "calc_price" "Calc" NOT NULL,
    "cost_value" DECIMAL(65,30) NOT NULL,
    "freight_value" DECIMAL(65,30) NOT NULL,
    "other_cost" DECIMAL(65,30) NOT NULL,
    "profit_percent" DECIMAL(65,30) NOT NULL,
    "sale_value" DECIMAL(65,30) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "in_promotion" BOOLEAN NOT NULL DEFAULT false,
    "thumbnail" TEXT NOT NULL,
    "type_unit" "Unity" NOT NULL,
    "unit_desc" TEXT,
    "inventory" INTEGER,
    "weight" DECIMAL(65,30),
    "liter" DECIMAL(65,30),
    "length" DECIMAL(65,30),
    "width" JSONB,
    "unity" TEXT,
    "details" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxes" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "ncm" TEXT,
    "cest" TEXT,
    "cfop" TEXT,
    "icms" JSONB,
    "cofins" JSONB,
    "pis" JSONB,
    "ipi" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "taxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "xmls" (
    "id" TEXT NOT NULL,
    "nfe_key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "xmls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "products" JSONB NOT NULL,
    "total_order" DECIMAL(65,30) NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL,
    "total_to_pay" DECIMAL(65,30) NOT NULL,
    "payment_id" TEXT,
    "payment_method" TEXT,
    "payment_type" TEXT,
    "payment_status" "Payment" NOT NULL,
    "order_status" "OrderStatus" NOT NULL,
    "shipping_code" TEXT,
    "shipping_information" TEXT,
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configs" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "max_tickets_installments" INTEGER NOT NULL,
    "max_card_installments" INTEGER NOT NULL,
    "min_value_ticket_installment" INTEGER NOT NULL,
    "min_value_card_installment" INTEGER NOT NULL,
    "invoices" BOOLEAN,
    "tickets" BOOLEAN,
    "cards" BOOLEAN,
    "pix" BOOLEAN,
    "digital_payment" BOOLEAN,
    "crypto" BOOLEAN,
    "payment_sdk_key" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revenues" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL,
    "payment_status" "Payment" NOT NULL,
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "revenues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL,
    "payment_status" "Payment" NOT NULL,
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "companies_company_code_key" ON "companies"("company_code");

-- CreateIndex
CREATE UNIQUE INDEX "employees_user_key" ON "employees"("user");

-- CreateIndex
CREATE UNIQUE INDEX "clients_cpf_key" ON "clients"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "products_barcode_key" ON "products"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "products_internal_code_key" ON "products"("internal_code");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxes" ADD CONSTRAINT "taxes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configs" ADD CONSTRAINT "configs_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenues" ADD CONSTRAINT "revenues_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
