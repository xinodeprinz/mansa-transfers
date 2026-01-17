/*
  Warnings:

  - You are about to drop the column `reference` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `products` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "payments_reference_idx";

-- DropIndex
DROP INDEX "products_slug_idx";

-- DropIndex
DROP INDEX "products_slug_key";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "reference";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "slug",
ADD COLUMN     "user_id" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "products_user_id_idx" ON "products"("user_id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
