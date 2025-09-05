-- CreateTable
CREATE TABLE `Mae` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `endereco` VARCHAR(200) NOT NULL,
    `telefone` CHAR(11) NOT NULL,
    `dataNasc` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medicos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `crm` VARCHAR(8) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `telefone` CHAR(11) NOT NULL,
    `especialidade` ENUM('Ginecologista', 'Cirugião_Geral', 'Obstetra') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecemNascidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `dataNasc` DATETIME NOT NULL,
    `peso` DECIMAL(7, 2) NOT NULL,
    `parto` ENUM('Normal', 'Cesária') NOT NULL DEFAULT 'Normal',
    `altura` DECIMAL(5, 2) NOT NULL,
    `maeID` INTEGER NOT NULL,
    `medicoID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecemNascidos` ADD CONSTRAINT `RecemNascidos_maeID_fkey` FOREIGN KEY (`maeID`) REFERENCES `Mae`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecemNascidos` ADD CONSTRAINT `RecemNascidos_medicoID_fkey` FOREIGN KEY (`medicoID`) REFERENCES `Medicos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
