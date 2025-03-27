/*
  Warnings:

  - You are about to drop the column `city` on the `plaza` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `Plaza` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `plaza` DROP COLUMN `city`,
    ADD COLUMN `cityId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `City` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `City_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Plaza` ADD CONSTRAINT `Plaza_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
