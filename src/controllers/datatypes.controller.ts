import Send from "@utils/response.utils";
import { prisma } from "@db/index";
import { Request, Response } from "express";

const getDatatypes = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10" } = req?.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    const skip = (pageNumber - 1) * pageSize;

    const [datatypes, totalDatatypes] = await Promise.all([
      prisma.dataType.findMany({
        orderBy: { id: "asc" },
        skip,
        take: pageSize,
      }),
      prisma.dataType.count(),
      // If datatypes don't exist, return an error
    ]);

    const totalPages = Math.ceil(totalDatatypes / pageSize);
    // Return a successful response with datatypes
    return Send.success(
      res,
      {
        datatypes,
        pagination: {
          totalDatatypes,
          totalPages,
          currentPage: pageNumber,
          pageSize,
          hasNextPage: pageNumber < totalPages,
          hasPrevPage: pageNumber > 1,
        },
      },
      "Datatypes successfully retrieved"
    );
  } catch (error) {
    // If any error occurs, return a generic error response
    console.error("Failed to get datatypes:", error); // Log the error for debugging
    return Send.error(res, null, "Something went wrong.");
  }
};

const datatypesController = {
  getDatatypes,
};

export default datatypesController;
