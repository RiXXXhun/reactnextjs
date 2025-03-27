-- AddForeignKey
ALTER TABLE `Plaza` ADD CONSTRAINT `Plaza_leafletMapId_fkey` FOREIGN KEY (`leafletMapId`) REFERENCES `LeafletMap`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
