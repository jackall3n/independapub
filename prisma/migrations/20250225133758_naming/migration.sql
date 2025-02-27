/*
  Warnings:

  - You are about to drop the `Venue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VenueAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VenueOwner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_ownerId_fkey";

-- DropTable
DROP TABLE "Venue";

-- DropTable
DROP TABLE "VenueAddress";

-- DropTable
DROP TABLE "VenueOwner";

-- CreateTable
CREATE TABLE "venues" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "addressId" TEXT,
    "ownerId" TEXT,

    CONSTRAINT "venues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venue_owners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "venue_owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venue_addresses" (
    "id" TEXT NOT NULL,
    "line1" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,

    CONSTRAINT "venue_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "venues_addressId_key" ON "venues"("addressId");

-- AddForeignKey
ALTER TABLE "venues" ADD CONSTRAINT "venues_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "venue_addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venues" ADD CONSTRAINT "venues_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "venue_owners"("id") ON DELETE SET NULL ON UPDATE CASCADE;
