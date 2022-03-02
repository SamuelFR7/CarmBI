-- CreateTable
CREATE TABLE `weighings` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `depositor` VARCHAR(191) NOT NULL,
    `lot` VARCHAR(191) NOT NULL,
    `product` VARCHAR(191) NOT NULL,
    `producer_type` VARCHAR(191) NOT NULL,
    `input` INTEGER NOT NULL,
    `output` INTEGER NOT NULL,
    `sync` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
