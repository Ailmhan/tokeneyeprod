-- CreateTable
CREATE TABLE "RiskAssessmentCache" (
    "id" SERIAL NOT NULL,
    "input" TEXT NOT NULL,
    "result" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RiskAssessmentCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RiskAssessmentCache_input_key" ON "RiskAssessmentCache"("input");
