/*
  Warnings:

  - You are about to drop the `Park` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Park`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Compte` (
    `idCompte` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NULL,
    `prenom` VARCHAR(191) NULL,
    `numDelephone` VARCHAR(191) NULL,
    `motDePasse` VARCHAR(191) NULL,
    `motDePasseCompte` VARCHAR(191) NULL,

    UNIQUE INDEX `Compte_email_key`(`email`),
    PRIMARY KEY (`idCompte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Noter` (
    `idNote` INTEGER NOT NULL AUTO_INCREMENT,
    `note` INTEGER NOT NULL,
    `commentaire` VARCHAR(191) NULL,
    `compteIdCompte` INTEGER NULL,
    `parkingIdParking` INTEGER NULL,

    PRIMARY KEY (`idNote`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parking` (
    `idParking` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nomParking` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `commune` VARCHAR(191) NULL,
    `etat` VARCHAR(191) NULL,
    `tauxOccupation` DOUBLE NOT NULL,
    `tarifHeure` INTEGER NOT NULL,
    `adresseParking` VARCHAR(191) NULL,
    `nombrePlaceMax` INTEGER NULL,

    PRIMARY KEY (`idParking`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `numReservation` INTEGER NOT NULL AUTO_INCREMENT,
    `dateReservation` DATETIME(3) NOT NULL,
    `heureEntre` VARCHAR(191) NOT NULL,
    `heureSortie` VARCHAR(191) NOT NULL,
    `numPlaceParking` VARCHAR(191) NOT NULL,
    `codeQr` VARCHAR(191) NOT NULL,
    `paye` BOOLEAN NOT NULL,

    PRIMARY KEY (`numReservation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Avoir` (
    `id` INTEGER NOT NULL,
    `compteIdCompte` INTEGER NOT NULL,
    `reservationNumReservation` INTEGER NOT NULL,
    `parkingIdParking` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horaire` (
    `idHoraire` INTEGER NOT NULL AUTO_INCREMENT,
    `horaireOuverture` VARCHAR(191) NOT NULL,
    `horaireFermeture` VARCHAR(191) NOT NULL,
    `jour` DATETIME(3) NULL,

    PRIMARY KEY (`idHoraire`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Associer` (
    `id` INTEGER NOT NULL,
    `parkingIdParking` INTEGER NOT NULL,
    `horaireIdHoraire` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Noter` ADD CONSTRAINT `Noter_compteIdCompte_fkey` FOREIGN KEY (`compteIdCompte`) REFERENCES `Compte`(`idCompte`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Noter` ADD CONSTRAINT `Noter_parkingIdParking_fkey` FOREIGN KEY (`parkingIdParking`) REFERENCES `Parking`(`idParking`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avoir` ADD CONSTRAINT `Avoir_compteIdCompte_fkey` FOREIGN KEY (`compteIdCompte`) REFERENCES `Compte`(`idCompte`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avoir` ADD CONSTRAINT `Avoir_parkingIdParking_fkey` FOREIGN KEY (`parkingIdParking`) REFERENCES `Parking`(`idParking`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avoir` ADD CONSTRAINT `Avoir_reservationNumReservation_fkey` FOREIGN KEY (`reservationNumReservation`) REFERENCES `Reservation`(`numReservation`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Associer` ADD CONSTRAINT `Associer_parkingIdParking_fkey` FOREIGN KEY (`parkingIdParking`) REFERENCES `Parking`(`idParking`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Associer` ADD CONSTRAINT `Associer_horaireIdHoraire_fkey` FOREIGN KEY (`horaireIdHoraire`) REFERENCES `Horaire`(`idHoraire`) ON DELETE RESTRICT ON UPDATE CASCADE;
