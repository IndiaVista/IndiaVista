import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Site } from "../models/heritage.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";




const __filename = fileURLToPath(import.meta.url);  //The full path of the current file.
const __dirname = path.dirname(__filename);  // The directory containing the current file.

const insertSiteData = asyncHandler(async (req, res) => {
  const jsonPath = path.join(__dirname, "data", "cities.json");
  // console.log(jsonPath);

  if (!jsonPath) {
    throw new ApiError(500, "Path not found");
  }

  //reads data in file and parses it to a JS object
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
  const {sr_no}=req.query;   
  
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
  results.pagecount=Math.ceil(sites.length/limit)  //dividing no. of sites per page
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

//Saves a site to user data

const saveSite = asyncHandler(async (req, res) => {
  const { siteId } = req.body;
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  // Check if site exists in DB
  const site = await Site.findOne({ sr_no: siteId });
  if (!site) {
    throw new ApiError(404, "Site not found!");
  }

  // Avoid duplicate saves
  if (!user.savedSites.includes(siteId)) {
    user.savedSites.push(siteId);
    await user.save();
    return res
      .status(200)
      .json(new ApiResponse(200, { message: "Site saved successfully." }));
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, { message: "Site already saved." }));
  }
});


const getSavedSites = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Get all site documents matching saved serial numbers
  const savedSites = await Site.find({ sr_no: { $in: user.savedSites } });

  if(!savedSites){
    throw new ApiError(404,"Cannot save site")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, savedSites, "Saved sites fetched successfully."));
});
const unsaveSite = asyncHandler(async (req, res) => {
  const { sr_no } = req.body; // destructure from body
  const userId = req.user._id; // assuming req.user is populated by auth middleware
  const user=req.user
  console.log(sr_no)

  if (!sr_no) {
    throw new ApiError(400, "Site sr_no is required to unsave.");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { savedSites: sr_no } }, // remove sr_no from savedSites array
    { new: true }
  );

  if (!updatedUser) {
    throw new ApiError(404, "User not found.");
  }
  if(updatedUser.savedSites.length>0)
  {
    return res
    .status(200)
    .json(new ApiResponse(200, updatedUser.savedSites, "Site unsaved successfully"));
  }else{
    return res
    .status(200)
    .json(new ApiResponse(200, null, "Site unsaved successfully"));
  }
});


export { insertSiteData ,getSitesData,getSite,getPaginatedSites,saveSite,getSavedSites,unsaveSite};
