-- CreateTable
CREATE TABLE "assessment_insights" (
    "id" SERIAL NOT NULL,
    "sessionId" UUID NOT NULL,
    "startTimestamp" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "preScore" INTEGER,
    "preAnswers" JSONB,
    "preTimeSpent" INTEGER,
    "preTimestamp" TIMESTAMP(3),
    "postScore" INTEGER,
    "postAnswers" JSONB,
    "postTimeSpent" INTEGER,
    "postTimestamp" TIMESTAMP(3),
    "improvement" INTEGER,
    "modulesCompleted" JSONB NOT NULL,
    "totalTimeSpent" INTEGER NOT NULL DEFAULT 0,
    "timePerModule" JSONB NOT NULL,
    "quizzesAttempted" INTEGER NOT NULL DEFAULT 0,
    "userName" VARCHAR(255),
    "feedback" TEXT,
    "ageRange" VARCHAR(20),
    "techProficiency" VARCHAR(50),
    "priorPrivacyKnowledge" VARCHAR(50),
    "referralSource" TEXT,

    CONSTRAINT "assessment_insights_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assessment_insights_sessionId_key" ON "assessment_insights"("sessionId");

-- CreateIndex
CREATE INDEX "assessment_insights_sessionId_idx" ON "assessment_insights"("sessionId");

-- CreateIndex
CREATE INDEX "assessment_insights_createdAt_idx" ON "assessment_insights"("createdAt");
