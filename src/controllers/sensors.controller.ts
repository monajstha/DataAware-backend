import Send from "@utils/response.utils";
import { prisma } from "@db/index";
import { Request, Response } from "express";

const getSensors = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10" } = req?.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    const skip = (pageNumber - 1) * pageSize;

    const [sensors, totalSensors] = await Promise.all([
      prisma.sensor.findMany({
        orderBy: { id: "asc" },
        skip,
        take: pageSize,
      }),
      prisma.sensor.count(),
      // If sensors don't exist, return an error
    ]);

    const totalPages = Math.ceil(totalSensors / pageSize);
    // Return a successful response with sensors
    return Send.success(
      res,
      {
        sensors,
        pagination: {
          totalSensors,
          totalPages,
          currentPage: pageNumber,
          pageSize,
          hasNextPage: pageNumber < totalPages,
          hasPrevPage: pageNumber > 1,
        },
      },
      "Sensors successfully retrieved"
    );
  } catch (error) {
    // If any error occurs, return a generic error response
    console.error("Failed to get sensors:", error); // Log the error for debugging
    return Send.error(res, null, "Something went wrong.");
  }
};

const sensorsController = {
  getSensors,
};

export default sensorsController;
