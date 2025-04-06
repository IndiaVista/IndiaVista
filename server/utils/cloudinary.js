import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    timeout: 60000 // Increase timeout to 60 seconds
});

// Upload File to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // File uploaded successfully, delete local file
        try {
            fs.unlinkSync(localFilePath);
        } catch (err) {
            console.error("Error deleting temp file:", err);
        }

        return response;
    } catch (error) {
        console.error("Upload to Cloudinary failed:", error);

        // Delete local file if upload fails
        try {
            fs.unlinkSync(localFilePath);
        } catch (err) {
            console.error("Error deleting failed upload file:", err);
        }

        return null;
    }
};

// Delete File from Cloudinary
const deleteOnCloudinary = async (public_id, resource_type = "image") => {
    try {
        if (!public_id) return null;

        const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: resource_type
        });

        return result;
    } catch (error) {
        console.error("Cloudinary delete failed:", error);
        return null;
    }
};

export { uploadOnCloudinary, deleteOnCloudinary };
