/*
  Warnings:

  - You are about to drop the column `coordinates` on the `leafletmap` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `LeafletMap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `LeafletMap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `leafletmap` DROP COLUMN `coordinates`,
    ADD COLUMN `latitude` DOUBLE NOT NULL,
    ADD COLUMN `longitude` DOUBLE NOT NULL;
