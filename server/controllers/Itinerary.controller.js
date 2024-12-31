import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Iternary} from "../models/Iternary.model.js"

const CreateIternary=asyncHandler(async(req,res)=>{
    const {selectedPlaces,name}=req.body;
    console.log(selectedPlaces)
    console.log(name)
    if(!selectedPlaces)
    {
      throw new ApiError(404,"No places selected")
    }
    
    const iternary=await Iternary.create({
        iternaryName:name,
        places:selectedPlaces,
    })
    if(!iternary)
    {
      throw new ApiError(500,"Something went wrong")
    }
    return res.status(201).json(
      new ApiResponse(200,{selectedPlaces},{name},"Itinerary created successfully!")
    )
  })

  
  export {CreateIternary}