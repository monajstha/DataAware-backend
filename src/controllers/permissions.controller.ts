import Send from "@utils/response.utils";
import prisma from "@lib/prisma";
import { Request, Response } from "express";

const getPermissions = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10" } = req?.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    const skip = (pageNumber - 1) * pageSize;

    const [permissions, totalPermissions] = await Promise.all([
      prisma.permission.findMany({
        orderBy: { id: "asc" },
        skip,
        take: pageSize,
      }),
      prisma.permission.count(),
      // If permissions don't exist, return an error
    ]);

    const totalPages = Math.ceil(totalPermissions / pageSize);
    // Return a successful response with permissions
    return Send.success(
      res,
      {
        permissions,
        pagination: {
          totalPermissions,
          totalPages,
          currentPage: pageNumber,
          pageSize,
          hasNextPage: pageNumber < totalPages,
          hasPrevPage: pageNumber > 1,
        },
      },
      "Permissions successfully retrieved"
    );
  } catch (error) {
    // If any error occurs, return a generic error response
    console.error("Failed to get permissions:", error); // Log the error for debugging
    return Send.error(res, null, "Something went wrong.");
  }
};

const permissionsController = {
  getPermissions,
};

export default permissionsController;
