-- CreateTable
CREATE TABLE `Plaza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plazaName` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `openingTime` VARCHAR(191) NOT NULL,
    `closingTime` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `leafletMapId` INTEGER NOT NULL,
    `countyId` INTEGER NOT NULL,

    UNIQUE INDEX `Plaza_plazaName_key`(`plazaName`),
    UNIQUE INDEX `Plaza_location_key`(`location`),
    UNIQUE INDEX `Plaza_leafletMapId_key`(`leafletMapId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlazaStore` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeafletMap` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plazaName` VARCHAR(191) NOT NULL,
    `coordinates` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `County` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PlazaToStores` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PlazaToStores_AB_unique`(`A`, `B`),
    INDEX `_PlazaToStores_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Plaza` ADD CONSTRAINT `Plaza_countyId_fkey` FOREIGN KEY (`countyId`) REFERENCES `County`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlazaToStores` ADD CONSTRAINT `_PlazaToStores_A_fkey` FOREIGN KEY (`A`) REFERENCES `Plaza`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlazaToStores` ADD CONSTRAINT `_PlazaToStores_B_fkey` FOREIGN KEY (`B`) REFERENCES `PlazaStore`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
