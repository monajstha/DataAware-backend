/*
  Warnings:

  - Added the required column `commonUses` to the `DataType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protectionTip` to the `DataType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `riskLevel` to the `DataType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataType" ADD COLUMN     "commonUses" TEXT NOT NULL,
ADD COLUMN     "protectionTip" TEXT NOT NULL,
ADD COLUMN     "riskLevel" TEXT NOT NULL;
