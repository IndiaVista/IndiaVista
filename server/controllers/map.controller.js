import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Site } from "../models/heritage.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Setup __dirname

// __filename: The absolute path of the current module (e.g., /path/to/your/file.js).
// __dirname: The directory of the current module (e.g., /path/to/your).
// fileURLToPath(import.meta.url):
// The fileURLToPath function from the url module is used to convert the file:// URL into a file system path (string format).
// So, if import.meta.url is file:///path/to/your/file.js, fileURLToPath converts it into /path/to/your/file.js.

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

const getSite=asyncHandler(async(req,res)=>{
  // const {sr_no}=req.params;   
  // PATH parameter
  //when sent as const 
  // response = await apiConnector("GET", MAP_GET_SITE.replace(":sr_no", sr_no)); 
  const {sr_no}=req.query;   
  //query Parameter 
  //when sent as 
  // const response = await apiConnector("GET", MAP_GET_SITE,null,null,{sr_no});
  
  const site=await Site.findOne({sr_no});
  // console.log("I am :"+site)
  if(!site)
  {
    throw new ApiError(404,"Site not found!")
  }
  return res.status(201).json(
    new ApiResponse(200,site,"Site fetched successfully!")
  )

})

//To get only paginated sites
const getPaginatedSites=asyncHandler(async(req,res)=>{
  const sites=await Site.find({});

  //getting no. of pages and page limit from req.query
  const page=parseInt(req.query.page)  //ex page=1 limit=5
  const limit=parseInt(req.query.limit)
  console.log(page+"  "+limit)
  //setting startindex and lastindex to be displayed
  const startindex=(page-1)*limit;
  console.log(startindex)
  const lastindex=(page)*limit;
  console.log(lastindex)


  const results={}

  results.totalSites=sites.length
  results.pagecount=Math.ceil(sites.length/limit)
  //to set next page of selected page
  if(lastindex<sites.length)
    {
    results.next={
      page:page+1
    }  
  }
  //to set previous page of selected page
  if(startindex>0)
  {
    results.prev={
      page:page-1
    }
  }
  results.result=sites.slice(startindex,lastindex)
  return res.status(201).json(
    new ApiResponse(200,results,"Data fetched successfully!")
  )
})

export { insertSiteData ,getSitesData,getSite,getPaginatedSites};