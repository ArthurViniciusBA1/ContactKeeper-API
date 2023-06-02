/*
  Warnings:

  - You are about to drop the `phone_numbers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "phone_numbers" DROP CONSTRAINT "phone_numbers_contact_id_fkey";

-- DropTable
DROP TABLE "phone_numbers";

-- CreateTable
CREATE TABLE "telephone_numbers" (
    "id" SERIAL NOT NULL,
    "phone_number" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "contact_id" INTEGER NOT NULL,

    CONSTRAINT "telephone_numbers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "telephone_numbers" ADD CONSTRAINT "telephone_numbers_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
