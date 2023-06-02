/*
  Warnings:

  - The primary key for the `contacts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `telephone_numbers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `telephone` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "telephone_numbers" DROP CONSTRAINT "telephone_numbers_contact_id_fkey";

-- AlterTable
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_pkey",
ADD COLUMN     "telephone" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "contacts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "contacts_id_seq";

-- DropTable
DROP TABLE "telephone_numbers";
