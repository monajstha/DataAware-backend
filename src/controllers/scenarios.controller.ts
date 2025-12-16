import Send from "../utils/response.utils.js";
import prisma from "../lib/prisma.js";
import { Request, Response } from "express";

const getScenerios = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10" } = req?.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    const skip = (pageNumber - 1) * pageSize;

    const [scenarios, totalScenarios] = await Promise.all([
      prisma.scenario.findMany({
        orderBy: { id: "asc" },
        skip,
        take: pageSize,
      }),
      prisma.scenario.count(),
      // If scenarios don't exist, return an error
    ]);

    const totalPages = Math.ceil(totalScenarios / pageSize);
    // Return a successful response with scenarios
    return Send.success(
      res,
      {
        scenarios,
        pagination: {
          totalScenarios,
          totalPages,
          currentPage: pageNumber,
          pageSize,
          hasNextPage: pageNumber < totalPages,
          hasPrevPage: pageNumber > 1,
        },
      },
      "Scenarios successfully retrieved"
    );
  } catch (error) {
    // If any error occurs, return a generic error response
    console.error("Failed to get scenarios:", error); // Log the error for debugging
    return Send.error(res, null, "Something went wrong.");
  }
};

const scenariosController = {
  getScenerios,
};

export default scenariosController;
