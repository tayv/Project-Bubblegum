-- AlterTable
ALTER TABLE "license" ALTER COLUMN "user_id" SET DEFAULT 'user_id_test',
ALTER COLUMN "license_type" SET DEFAULT 'FREE',
ALTER COLUMN "license_duration" SET DEFAULT 'INDEFINITE',
ALTER COLUMN "license_start" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "license_expire" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "product_catalog" ALTER COLUMN "product_id" SET DEFAULT 'PRODUCT1',
ALTER COLUMN "product_schema" SET DEFAULT '/product1';

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "user_id" SET DEFAULT 'user_id_1';

-- AlterTable
ALTER TABLE "user_doc_data" ALTER COLUMN "user_id" SET DEFAULT 'user_id_test',
ALTER COLUMN "doc_name" SET DEFAULT 'doc_name_test',
ALTER COLUMN "status" SET DEFAULT 'DRAFT',
ALTER COLUMN "product_id" SET DEFAULT 'PRODUCT1';
