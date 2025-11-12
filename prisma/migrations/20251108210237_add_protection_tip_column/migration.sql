/*
  Warnings:

  - You are about to drop the column `dataTypeId` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `economicValue` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `dataTypeId` on the `Sensor` table. All the data in the column will be lost.
  - You are about to drop the column `economicValue` on the `Sensor` table. All the data in the column will be lost.
  - You are about to drop the column `dataTypeId` on the `Tracker` table. All the data in the column will be lost.
  - You are about to drop the column `economicValue` on the `Tracker` table. All the data in the column will be lost.
  - Added the required column `category` to the `Permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protectionTip` to the `Permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `possibleInterference` to the `Sensor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protectionTip` to the `Tracker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purpose` to the `Tracker` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_dataTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Sensor" DROP CONSTRAINT "Sensor_dataTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Tracker" DROP CONSTRAINT "Tracker_dataTypeId_fkey";

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "dataTypeId",
DROP COLUMN "economicValue",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "protectionTip" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sensor" DROP COLUMN "dataTypeId",
DROP COLUMN "economicValue",
ADD COLUMN     "possibleInterference" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tracker" DROP COLUMN "dataTypeId",
DROP COLUMN "economicValue",
ADD COLUMN     "protectionTip" TEXT NOT NULL,
ADD COLUMN     "purpose" TEXT NOT NULL;
