import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Site } from "../models/heritage.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const insertSiteData = asyncHandler(async (req, res) => {
  const jsonPath = path.join(__dirname, "data", "cities.json");
  console.log(jsonPath);

  if (!jsonPath) {
    throw new ApiError(500, "Path not found");
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

  // Check if data already exists
  const existingData = await Site.find(); // Fetch all existing records
  const existingNames = new Set(existingData.map((site) => site.name)); // Create a Set of existing site names

  // Filter out data that's already in the database
  const newData = data.filter((site) => !existingNames.has(site.name));

  if (newData.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, "No new data to insert; data already exists!")
    );
  }

  // Insert only new records
  await Site.insertMany(newData);

  return res.status(201).json(
    new ApiResponse(201, `Inserted ${newData.length} new records successfully!`)
  );
});

//to get sites
const getSitesData=asyncHandler(async(req,res)=>{
    const sites=await Site.find();
    if(!sites)
    {
        throw new ApiError(401,"Data not found")
    }
    return res.status(201).json(
        new ApiResponse(200,sites,"Data fetched successfully!")
    )

})
export { insertSiteData ,getSitesData};
