-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "expires_code_date" DROP NOT NULL,
ALTER COLUMN "company_code" DROP NOT NULL,
ALTER COLUMN "thumbnail" DROP NOT NULL;
