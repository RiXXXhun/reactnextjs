/*
  Warnings:

  - Added the required column `closingTime` to the `PlazaStore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingTime` to the `PlazaStore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `plazastore` ADD COLUMN `closingTime` VARCHAR(191) NOT NULL,
    ADD COLUMN `openingTime` VARCHAR(191) NOT NULL;
