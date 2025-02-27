/*
  Warnings:

  - You are about to drop the column `addressId` on the `venues` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "venues" DROP CONSTRAINT "venues_addressId_fkey";

-- DropIndex
DROP INDEX "venues_addressId_key";

-- AlterTable
ALTER TABLE "venue_addresses" ADD COLUMN     "venueId" TEXT;

-- AlterTable
ALTER TABLE "venues" DROP COLUMN "addressId",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "postcode" TEXT;

-- AddForeignKey
ALTER TABLE "venue_addresses" ADD CONSTRAINT "venue_addresses_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venues"("id") ON DELETE SET NULL ON UPDATE CASCADE;
