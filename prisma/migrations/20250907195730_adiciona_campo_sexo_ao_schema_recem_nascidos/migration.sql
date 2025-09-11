/*
  Warnings:

  - You are about to alter the column `dataNasc` on the `RecemNascidos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `sexo` to the `RecemNascidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RecemNascidos` ADD COLUMN `sexo` ENUM('M', 'F') NOT NULL,
    MODIFY `dataNasc` DATETIME NOT NULL;
