import { Request, Response } from "express";
import prisma from "@lib/prisma";
import { Prisma } from "../../generated/prisma/client";

interface SessionData {
  sessionId: string;
  startTimestamp: string;
  preAssessment: {
    score: number;
    answers: number[];
    timeSpent: number;
    timestamp: string;
  } | null;
  postAssessment: {
    score: number;
    answers: number[];
    timeSpent: number;
    timestamp: string;
  } | null;
  behavior: {
    modulesCompleted: number[];
    totalTimeSpent: number;
    timePerModule: { [key: number]: number };
    quizzesAttempted: number;
    simulatorInteractions: number;
    timelineViews: number;
  };
  userContext: {
    ageRange: string | null;
    techProficiency: string | null;
    priorPrivacyKnowledge: string | null;
    referralSource: string | null;
  };
  userName: string | null;
  feedback: string | null;
}

interface ConsentData {
  consent: boolean;
  userName?: string;
  feedback?: string;
  demographics: {
    ageRange?: string;
    techProficiency?: string;
    priorPrivacyKnowledge?: string;
    referralSource?: string;
  };
}

// POST /api/assessment-insights
const submitAssessmentInsight = async (req: Request, res: Response) => {
  try {
    const sessionData: SessionData = req.body;

    // Validate required fields
    if (!sessionData.sessionId || !sessionData.startTimestamp) {
      return res.status(400).json({
        ok: false,
        message:
          "Missing required fields: sessionId and startTimestamp are required",
      });
    }

    // Check if session already exists
    const existingSession = await prisma.assessmentInsight.findUnique({
      where: { sessionId: sessionData.sessionId },
    });

    if (existingSession) {
      return res.status(409).json({
        ok: false,
        message: "Session data already submitted",
      });
    }

    // Calculate improvement if both assessments exist
    const improvement =
      sessionData.preAssessment && sessionData.postAssessment
        ? sessionData.postAssessment.score - sessionData.preAssessment.score
        : null;

    // Prepare data for insertion
    const insertData = {
      sessionId: sessionData.sessionId,
      startTimestamp: new Date(sessionData.startTimestamp),

      preScore: sessionData.preAssessment?.score ?? null,
      preAnswers: sessionData.preAssessment?.answers ?? Prisma.JsonNull,
      preTimeSpent: sessionData.preAssessment?.timeSpent ?? null,
      preTimestamp: sessionData.preAssessment?.timestamp
        ? new Date(sessionData.preAssessment.timestamp)
        : null,

      postScore: sessionData.postAssessment?.score ?? null,
      postAnswers: sessionData.postAssessment?.answers ?? Prisma.JsonNull,
      postTimeSpent: sessionData.postAssessment?.timeSpent ?? null,
      postTimestamp: sessionData.postAssessment?.timestamp
        ? new Date(sessionData.postAssessment.timestamp)
        : null,

      improvement,

      modulesCompleted: sessionData.behavior.modulesCompleted ?? [],
      totalTimeSpent: sessionData.behavior.totalTimeSpent ?? 0,
      timePerModule: sessionData.behavior.timePerModule ?? {},
      quizzesAttempted: sessionData.behavior.quizzesAttempted ?? 0,

      userName: sessionData.userName ?? null,
      feedback: sessionData.feedback ?? null,

      ageRange: sessionData.userContext.ageRange ?? null,
      techProficiency: sessionData.userContext.techProficiency ?? null,
      priorPrivacyKnowledge:
        sessionData.userContext.priorPrivacyKnowledge ?? null,
      referralSource: sessionData.userContext.referralSource ?? null,
    };

    // Insert into database
    const result = await prisma.assessmentInsight.create({
      data: insertData,
    });

    return res.status(201).json({
      ok: true,
      message: "Assessment insight submitted successfully",
      data: {
        id: result.id,
        sessionId: result.sessionId,
        improvement: result.improvement,
      },
    });
  } catch (error) {
    console.error("Error submitting assessment insight:", error);
    return res.status(500).json({
      ok: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};

// DELETE /api/assessment-insights/:sessionId (for GDPR compliance - right to be forgotten)
const deleteAssessmentInsight = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) throw new Error("Session not found");
    const deleted = await prisma.assessmentInsight.delete({
      where: { sessionId },
    });

    return res.status(200).json({
      ok: true,
      message: "Assessment insight deleted successfully",
      data: { sessionId: deleted.sessionId },
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        ok: false,
        message: "Session not found",
      });
    }

    console.error("Error deleting assessment insight:", error);
    return res.status(500).json({
      ok: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};

const assessmentInsightsController = {
  submitAssessmentInsight,
  deleteAssessmentInsight,
};

export default assessmentInsightsController;
