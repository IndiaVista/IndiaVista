import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Iternary} from "../models/Iternary.model.js"

const CreateIternary=asyncHandler(async(req,res)=>{
    const {selectedPlaces,name}=req.body;
    const user=req.user
    // console.log(selectedPlaces)
    // console.log(name)
    // console.log(user)

    if (!name || typeof name !== "string") {
      throw new ApiError(400, "Invalid itinerary name");
  }
  
  if (!Array.isArray(selectedPlaces) || selectedPlaces.length === 0) {
      throw new ApiError(400, "Selected places must be a non-empty array");
  }
  
    const ItiName=await Iternary.find({iternaryName: name})
    if(ItiName.length>0)
    {
      throw new ApiError(400,"Iternary Name already Exist")
    }
    if(!selectedPlaces)
    {
      throw new ApiError(404,"No places selected")
    }
    
    const iternary=await Iternary.create({
        iternaryName:name,
        places:selectedPlaces,
        owner:user
    })
    if(!iternary)
    {
      throw new ApiError(500,"Something went wrong")
    }
    return res.status(201).json(
      new ApiResponse(200,{iternary},"Itinerary created successfully!")
    )
  })

  const GetItinerary=asyncHandler(async(req,res)=>{
    const {name}=req.query;
    const itinerary=await Iternary.findOne({iternaryName:name})
    // console.log(itinerary)
    if(!itinerary)
    {
      throw new ApiError(404,"Itinerary does not exist")
    }
    return res
    .status(200)
    .json(
      new ApiResponse(200,{itinerary},"Itinerary fetched Successfully!!")
    )
  })

  const GetUserItineraries = asyncHandler(async (req, res) => {
    const user = req.user;
    
    const itineraries = await Iternary.find({ owner: user._id })
      .sort({ createdAt: -1 }); // Sort by creation date, newest first
    
    if (!itineraries || itineraries.length === 0) {
      return res.status(200).json(
        new ApiResponse(200, { itineraries: [] }, "No itineraries found for this user")
      );
    }

    return res.status(200).json(
      new ApiResponse(200, { itineraries }, "User itineraries fetched successfully")
    );
  });

  const DeleteItinerary = asyncHandler(async (req, res) => {
    const { itineraryId } = req.params;
    const user = req.user;

    // Check if itinerary exists
    const itinerary = await Iternary.findById(itineraryId);
    if (!itinerary) {
        throw new ApiError(404, "Itinerary not found");
    }

    // Check if user owns the itinerary
    if (itinerary.owner.toString() !== user._id.toString()) {
        throw new ApiError(403, "You don't have permission to delete this itinerary");
    }

    // Delete the itinerary
    await Iternary.findByIdAndDelete(itineraryId);

    return res.status(200).json(
        new ApiResponse(200, null, "Itinerary deleted successfully")
    );
  });

  export {CreateIternary, GetItinerary, GetUserItineraries, DeleteItinerary}