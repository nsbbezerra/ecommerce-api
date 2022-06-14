/*
  Warnings:

  - You are about to drop the column `taxes` on the `products` table. All the data in the column will be lost.
  - Added the required column `isTributed` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "taxes",
ADD COLUMN     "cest" TEXT,
ADD COLUMN     "cfop" TEXT,
ADD COLUMN     "cofins_base_calc" DECIMAL(65,30),
ADD COLUMN     "cofins_cst" TEXT,
ADD COLUMN     "cofins_rate" DECIMAL(65,30),
ADD COLUMN     "fcp_base_calc" DECIMAL(65,30),
ADD COLUMN     "fcp_rate" DECIMAL(65,30),
ADD COLUMN     "fcp_ret_rate" DECIMAL(65,30),
ADD COLUMN     "fcp_st_base_calc" DECIMAL(65,30),
ADD COLUMN     "fcp_st_rate" DECIMAL(65,30),
ADD COLUMN     "icms_base_calc" DECIMAL(65,30),
ADD COLUMN     "icms_csosn" TEXT,
ADD COLUMN     "icms_marg_val_agregate" DECIMAL(65,30),
ADD COLUMN     "icms_origin" TEXT,
ADD COLUMN     "icms_rate" DECIMAL(65,30),
ADD COLUMN     "icms_st_mod_bc" TEXT,
ADD COLUMN     "icms_st_rate" DECIMAL(65,30),
ADD COLUMN     "imcs_st_base_calc" DECIMAL(65,30),
ADD COLUMN     "ipi_code" TEXT,
ADD COLUMN     "ipi_cst" TEXT,
ADD COLUMN     "ipi_rate" DECIMAL(65,30),
ADD COLUMN     "isTributed" BOOLEAN NOT NULL,
ADD COLUMN     "ncm" TEXT,
ADD COLUMN     "pis_base_calc" DECIMAL(65,30),
ADD COLUMN     "pis_cst" TEXT,
ADD COLUMN     "pis_rate" DECIMAL(65,30);
