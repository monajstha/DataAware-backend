/*
  Warnings:

  - You are about to drop the column `dataType` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `dataType` on the `Sensor` table. All the data in the column will be lost.
  - You are about to drop the column `dataType` on the `Tracker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "dataType",
ADD COLUMN     "dataTypeId" INTEGER;

-- AlterTable
ALTER TABLE "Sensor" DROP COLUMN "dataType",
ADD COLUMN     "dataTypeId" INTEGER;

-- AlterTable
ALTER TABLE "Tracker" DROP COLUMN "dataType",
ADD COLUMN     "dataTypeId" INTEGER;

-- CreateTable
CREATE TABLE "DataType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "economicValueUsd" DOUBLE PRECISION NOT NULL,
    "description" TEXT,

    CONSTRAINT "DataType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DataType_name_key" ON "DataType"("name");

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_dataTypeId_fkey" FOREIGN KEY ("dataTypeId") REFERENCES "DataType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tracker" ADD CONSTRAINT "Tracker_dataTypeId_fkey" FOREIGN KEY ("dataTypeId") REFERENCES "DataType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_dataTypeId_fkey" FOREIGN KEY ("dataTypeId") REFERENCES "DataType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
