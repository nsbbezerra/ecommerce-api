/*
  Warnings:

  - You are about to drop the column `companyId` on the `clients` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_companyId_fkey";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "companyId";
