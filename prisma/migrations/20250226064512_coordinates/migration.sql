/*
  Warnings:

  - You are about to drop the `venue_addresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "venue_addresses" DROP CONSTRAINT "venue_addresses_venueId_fkey";

-- AlterTable
ALTER TABLE "venues" ADD COLUMN     "coordinates" DOUBLE PRECISION[];

-- DropTable
DROP TABLE "venue_addresses";
