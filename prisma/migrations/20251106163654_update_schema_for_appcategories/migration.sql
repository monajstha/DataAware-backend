/*
  Warnings:

  - You are about to drop the column `appCategoryId` on the `Scenario` table. All the data in the column will be lost.
  - You are about to drop the `AppCategoryPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AppCategorySensor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AppCategoryTracker` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `permissions` to the `AppCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sensors` to the `AppCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackers` to the `AppCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AppCategoryPermission" DROP CONSTRAINT "AppCategoryPermission_appCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "AppCategoryPermission" DROP CONSTRAINT "AppCategoryPermission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "AppCategorySensor" DROP CONSTRAINT "AppCategorySensor_appCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "AppCategorySensor" DROP CONSTRAINT "AppCategorySensor_sensorId_fkey";

-- DropForeignKey
ALTER TABLE "AppCategoryTracker" DROP CONSTRAINT "AppCategoryTracker_appCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "AppCategoryTracker" DROP CONSTRAINT "AppCategoryTracker_trackerId_fkey";

-- DropForeignKey
ALTER TABLE "Scenario" DROP CONSTRAINT "Scenario_appCategoryId_fkey";

-- AlterTable
ALTER TABLE "AppCategory" ADD COLUMN     "permissions" JSONB NOT NULL,
ADD COLUMN     "sensors" JSONB NOT NULL,
ADD COLUMN     "trackers" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Scenario" DROP COLUMN "appCategoryId",
ADD COLUMN     "appCategoryName" TEXT;

-- DropTable
DROP TABLE "AppCategoryPermission";

-- DropTable
DROP TABLE "AppCategorySensor";

-- DropTable
DROP TABLE "AppCategoryTracker";

-- AddForeignKey
ALTER TABLE "Scenario" ADD CONSTRAINT "Scenario_appCategoryName_fkey" FOREIGN KEY ("appCategoryName") REFERENCES "AppCategory"("name") ON DELETE SET NULL ON UPDATE CASCADE;
