import Send from "@utils/response.utils";
import { prisma } from "@db/index";
import { Request, Response } from "express";

const getTrackers = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10" } = req?.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    const skip = (pageNumber - 1) * pageSize;

    const [trackers, totalTrackers] = await Promise.all([
      prisma.tracker.findMany({
        orderBy: { id: "asc" },
        skip,
        take: pageSize,
      }),
      prisma.tracker.count(),
      // If permissions don't exist, return an error
    ]);

    const totalPages = Math.ceil(totalTrackers / pageSize);
    // Return a successful response with permissions
    return Send.success(
      res,
      {
        trackers,
        pagination: {
          totalTrackers,
          totalPages,
          currentPage: pageNumber,
          pageSize,
          hasNextPage: pageNumber < totalPages,
          hasPrevPage: pageNumber > 1,
        },
      },
      "Trackers successfully retrieved"
    );
  } catch (error) {
    // If any error occurs, return a generic error response
    console.error("Failed to get trackers:", error); // Log the error for debugging
    return Send.error(res, null, "Something went wrong.");
  }
};

const trakcersController = {
  getTrackers,
};

export default trakcersController;
