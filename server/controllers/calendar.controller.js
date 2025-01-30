import { Event } from "../models/calendarDate.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const saveEvents = asyncHandler(async (req, res) => {
  try {
    const eventData = req.body;

    for (const date in eventData) {
      const { event, type, extras, region, religion, festive_type, description } = eventData[date];

      if (!event || !type || !region || !religion || !festive_type) {
        console.error(`Missing required fields for date: ${date}`);
        continue; 
      }

      // Upsert to prevent duplicates
      await Event.updateOne(
        { date }, // Query: match by date
        { date, event, type, extras, region, religion, festive_type, description }, // Update data
        { upsert: true } // Insert new if not found
      );
    }

    console.log("Data saved successfully!");
    return res.status(201).json(
      new ApiResponse(200, {}, "Data saved successfully!")
    )
  } catch (error) {
    if (error.code === 11000) {
      console.error("Duplicate date error:", error);
      throw new ApiError(400, "Event with this date already exists!");
    }
    console.error("Error saving data:", error);
    throw new ApiError(500, "Error saving data!");
  }
});


const getEvent = asyncHandler( async(req,res) => {
    try {
        const { date } = req.query; 
        const event = await Event.findOne({ date }); 
        if (event) {
          return res.status(201).json(
            new ApiResponse(200, event)
          )
        } else {
          return res.status(201).json(
            new ApiResponse(200, {event:null}, "No event found for this date.")
        )
        }
      } catch (error) {
        console.error(error);
        throw new ApiError(500, "Error fetching data!")
      }
});

export {saveEvents, getEvent}