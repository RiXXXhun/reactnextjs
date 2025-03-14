/*
  Warnings:

  - You are about to drop the column `plazaName` on the `leafletmap` table. All the data in the column will be lost.
  - Added the required column `plazaMapName` to the `LeafletMap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `leafletmap` DROP COLUMN `plazaName`,
    ADD COLUMN `plazaMapName` VARCHAR(191) NOT NULL;
