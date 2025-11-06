-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sensitivity" TEXT NOT NULL,
    "riskScore" DOUBLE PRECISION NOT NULL,
    "dataType" TEXT NOT NULL,
    "economicValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tracker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "riskScore" DOUBLE PRECISION NOT NULL,
    "dataType" TEXT NOT NULL,
    "economicValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sensor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "riskScore" DOUBLE PRECISION NOT NULL,
    "dataType" TEXT NOT NULL,
    "economicValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AppCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppCategoryPermission" (
    "id" SERIAL NOT NULL,
    "appCategoryId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "AppCategoryPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppCategoryTracker" (
    "id" SERIAL NOT NULL,
    "appCategoryId" INTEGER NOT NULL,
    "trackerId" INTEGER NOT NULL,

    CONSTRAINT "AppCategoryTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppCategorySensor" (
    "id" SERIAL NOT NULL,
    "appCategoryId" INTEGER NOT NULL,
    "sensorId" INTEGER NOT NULL,

    CONSTRAINT "AppCategorySensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scenario" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "riskSummary" TEXT NOT NULL,
    "valueSummary" TEXT NOT NULL,
    "appCategoryId" INTEGER,

    CONSTRAINT "Scenario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tracker_name_key" ON "Tracker"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Sensor_name_key" ON "Sensor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AppCategory_name_key" ON "AppCategory"("name");

-- AddForeignKey
ALTER TABLE "AppCategoryPermission" ADD CONSTRAINT "AppCategoryPermission_appCategoryId_fkey" FOREIGN KEY ("appCategoryId") REFERENCES "AppCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppCategoryPermission" ADD CONSTRAINT "AppCategoryPermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppCategoryTracker" ADD CONSTRAINT "AppCategoryTracker_appCategoryId_fkey" FOREIGN KEY ("appCategoryId") REFERENCES "AppCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppCategoryTracker" ADD CONSTRAINT "AppCategoryTracker_trackerId_fkey" FOREIGN KEY ("trackerId") REFERENCES "Tracker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppCategorySensor" ADD CONSTRAINT "AppCategorySensor_appCategoryId_fkey" FOREIGN KEY ("appCategoryId") REFERENCES "AppCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppCategorySensor" ADD CONSTRAINT "AppCategorySensor_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scenario" ADD CONSTRAINT "Scenario_appCategoryId_fkey" FOREIGN KEY ("appCategoryId") REFERENCES "AppCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
