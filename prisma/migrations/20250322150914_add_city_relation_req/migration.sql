/*
  Warnings:

  - Made the column `image` on table `plaza` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `plaza` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `plaza` MODIFY `image` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;
