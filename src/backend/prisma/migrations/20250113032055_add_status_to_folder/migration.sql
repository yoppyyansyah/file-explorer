-- AlterTable
ALTER TABLE `Folder` ADD COLUMN `status` ENUM('active', 'nonactive') NOT NULL DEFAULT 'active';
