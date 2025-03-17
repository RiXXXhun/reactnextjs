/*
  Warnings:

  - Added the required column `city` to the `Plaza` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `plaza` ADD COLUMN `city` VARCHAR(191) NOT NULL;
