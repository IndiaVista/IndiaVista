import mongoose, { Schema } from "mongoose";

const SiteSchema = new Schema({
    sr_no: String,
    name: String,
    location: String,
    period: String,
    UNESCO_data: String,
    description: String,
    fulldesc: String,
    image_link: String,
    enlistment_year: String,
    site_type: String,
    latitude: Number,
    longitude: Number,
},{timestamps:true});

export const Site=mongoose.model("Site",SiteSchema)
