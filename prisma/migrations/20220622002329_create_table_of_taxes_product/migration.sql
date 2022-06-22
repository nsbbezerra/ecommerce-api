/*
  Warnings:

  - You are about to drop the column `cest` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `cfop` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `cofins_base_calc` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `cofins_cst` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `cofins_rate` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `fcp_base_calc` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `fcp_rate` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `fcp_ret_rate` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `fcp_st_base_calc` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `fcp_st_rate` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `icms_base_calc` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `icms_csosn` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `icms_marg_val_agregate` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `icms_origin` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `icms_rate` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `icms_st_mod_bc` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `icms_st_rate` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `imcs_st_base_calc` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `ipi_code` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `ipi_cst` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `ipi_rate` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `isTributed` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `ncm` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `pis_base_calc` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `pis_cst` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `pis_rate` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "cest",
DROP COLUMN "cfop",
DROP COLUMN "cofins_base_calc",
DROP COLUMN "cofins_cst",
DROP COLUMN "cofins_rate",
DROP COLUMN "fcp_base_calc",
DROP COLUMN "fcp_rate",
DROP COLUMN "fcp_ret_rate",
DROP COLUMN "fcp_st_base_calc",
DROP COLUMN "fcp_st_rate",
DROP COLUMN "icms_base_calc",
DROP COLUMN "icms_csosn",
DROP COLUMN "icms_marg_val_agregate",
DROP COLUMN "icms_origin",
DROP COLUMN "icms_rate",
DROP COLUMN "icms_st_mod_bc",
DROP COLUMN "icms_st_rate",
DROP COLUMN "imcs_st_base_calc",
DROP COLUMN "ipi_code",
DROP COLUMN "ipi_cst",
DROP COLUMN "ipi_rate",
DROP COLUMN "isTributed",
DROP COLUMN "ncm",
DROP COLUMN "pis_base_calc",
DROP COLUMN "pis_cst",
DROP COLUMN "pis_rate";

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

-- AddForeignKey
ALTER TABLE "taxes" ADD CONSTRAINT "taxes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
