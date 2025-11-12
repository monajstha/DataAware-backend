import Send from "@utils/response.utils";
import { prisma } from "@db/index";
import { Request, Response } from "express";

const getAppCategories = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10" } = req?.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    const skip = (pageNumber - 1) * pageSize;

    const [appCategories, totalAppCategories] = await Promise.all([
      prisma.appCategory.findMany({
        orderBy: { id: "asc" },
        skip,
        take: pageSize,
      }),
      prisma.appCategory.count(),
      // If appCategories don't exist, return an error
    ]);

    const totalPages = Math.ceil(totalAppCategories / pageSize);
    // Return a successful response with appCategories
    return Send.success(
      res,
      {
        appCategories,
        pagination: {
          totalAppCategories,
          totalPages,
          currentPage: pageNumber,
          pageSize,
          hasNextPage: pageNumber < totalPages,
          hasPrevPage: pageNumber > 1,
        },
      },
      "App Categories successfully retrieved"
    );
  } catch (error) {
    // If any error occurs, return a generic error response
    console.error("Failed to get App Categories:", error); // Log the error for debugging
    return Send.error(res, null, "Something went wrong.");
  }
};

const appCategoriesController = {
  getAppCategories,
};

export default appCategoriesController;
