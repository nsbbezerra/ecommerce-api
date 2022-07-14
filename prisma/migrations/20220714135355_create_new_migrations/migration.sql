-- CreateEnum
CREATE TYPE "TypeActive" AS ENUM ('monthly', 'yearly', 'definitive');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('all', 'cashier', 'seller');

-- CreateEnum
CREATE TYPE "Calc" AS ENUM ('marge', 'markup');

-- CreateEnum
CREATE TYPE "Unity" AS ENUM ('square_meter', 'meter', 'unity', 'weight', 'liter', 'without', 'sizes');

-- CreateEnum
CREATE TYPE "TypeSale" AS ENUM ('unique', 'partition');

-- CreateEnum
CREATE TYPE "Payment" AS ENUM ('wait', 'paid_out', 'refused', 'cancel');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('awaiting_payment', 'in_separation', 'cancel', 'order_dispatched', 'finish');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('money', 'credit_card', 'debit_card', 'ticket', 'duplicata', 'pix');

-- CreateEnum
CREATE TYPE "PeriodCoupon" AS ENUM ('infinite', 'due_date', 'quantity');

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" VARCHAR(20) NOT NULL,
    "fantasy_name" TEXT NOT NULL,
    "municipal_registration" TEXT,
    "state_registration" TEXT,
    "phone" VARCHAR(18) NOT NULL,
    "email" TEXT,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "comp" TEXT,
    "district" TEXT NOT NULL,
    "zip_code" VARCHAR(11) NOT NULL,
    "city" TEXT NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "expires_code_date" TIMESTAMP(3),
    "company_code" TEXT,
    "type_activation" "TypeActive",
    "thumbnail" TEXT,
    "thumbnail_id" TEXT,
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
CREATE TABLE "Comissions" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comissions_pkey" PRIMARY KEY ("id")
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
    "password" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "sub_category_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "sku" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "internal_code" TEXT NOT NULL,
    "calc_price" "Calc" NOT NULL,
    "cost_value" JSONB NOT NULL,
    "profit_percent" DECIMAL(10,2) NOT NULL,
    "markup_factor" DECIMAL(10,2) NOT NULL,
    "sale_value" DECIMAL(10,2) NOT NULL,
    "type_sale" "TypeSale",
    "sale_options" TEXT,
    "sale_options_category" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "in_promotion" BOOLEAN NOT NULL DEFAULT false,
    "thumbnail" TEXT,
    "thumbnail_id" TEXT,
    "type_unit" "Unity" NOT NULL,
    "unit_desc" TEXT,
    "inventory" DECIMAL(10,2),
    "width" JSONB,
    "shipping" JSONB,
    "unity" TEXT,
    "details" TEXT,
    "promotions" TEXT,
    "tags" TEXT[],
    "have_adictional" BOOLEAN NOT NULL DEFAULT false,
    "adictional_items_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sizes" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "inventory" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxes" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "cfop" TEXT,
    "ncm" TEXT,
    "icms_rate" TEXT,
    "icms_origin" TEXT,
    "icms_csosn" TEXT,
    "icms_st_rate" TEXT,
    "icms_marg_val_agregate" TEXT,
    "icms_st_mod_bc" TEXT,
    "icms_base_calc" TEXT,
    "imcs_st_base_calc" TEXT,
    "fcp_rate" TEXT,
    "fcp_st_rate" TEXT,
    "fcp_ret_rate" TEXT,
    "fcp_base_calc" TEXT,
    "fcp_st_base_calc" TEXT,
    "ipi_cst" TEXT,
    "ipi_rate" TEXT,
    "ipi_code" TEXT,
    "pis_cst" TEXT,
    "pis_rate" TEXT,
    "pis_base_calc" TEXT,
    "cofins_cst" TEXT,
    "cofins_rate" TEXT,
    "cofins_base_calc" TEXT,
    "cest" TEXT,
    "isTributed" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "taxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
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
    "total_order" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(10,2) NOT NULL,
    "total_to_pay" DECIMAL(10,2) NOT NULL,
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
    "value" DECIMAL(10,2) NOT NULL,
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
    "value" DECIMAL(10,2) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL,
    "payment_status" "Payment" NOT NULL,
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "coupon" TEXT NOT NULL,
    "dicount" DECIMAL(10,2) NOT NULL,
    "period" "PeriodCoupon" NOT NULL,
    "number_used" INTEGER,
    "expires_date" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "banner" TEXT,
    "banner_id" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "discount" DECIMAL(10,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "icon" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_categories" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addictional_items_category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addictional_items_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addictional_items" (
    "id" TEXT NOT NULL,
    "addictional_item_category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addictional_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partition_sale_category" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partition_sale_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partition_sale" (
    "id" TEXT NOT NULL,
    "partition_sale_category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" TEXT,

    CONSTRAINT "partition_sale_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "companies_company_code_key" ON "companies"("company_code");

-- CreateIndex
CREATE UNIQUE INDEX "employees_user_key" ON "employees"("user");

-- CreateIndex
CREATE UNIQUE INDEX "clients_cpf_key" ON "clients"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "products_internal_code_key" ON "products"("internal_code");

-- CreateIndex
CREATE UNIQUE INDEX "promotions_title_key" ON "promotions"("title");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comissions" ADD CONSTRAINT "Comissions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comissions" ADD CONSTRAINT "Comissions_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comissions" ADD CONSTRAINT "Comissions_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "sub_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sizes" ADD CONSTRAINT "sizes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxes" ADD CONSTRAINT "taxes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addictional_items_category" ADD CONSTRAINT "addictional_items_category_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addictional_items" ADD CONSTRAINT "addictional_items_addictional_item_category_id_fkey" FOREIGN KEY ("addictional_item_category_id") REFERENCES "addictional_items_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partition_sale_category" ADD CONSTRAINT "partition_sale_category_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partition_sale" ADD CONSTRAINT "partition_sale_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partition_sale" ADD CONSTRAINT "partition_sale_partition_sale_category_id_fkey" FOREIGN KEY ("partition_sale_category_id") REFERENCES "partition_sale_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pay_forms" ADD CONSTRAINT "pay_forms_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
