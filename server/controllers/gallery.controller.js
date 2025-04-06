import Gallery from '../models/gallery.model.js';
import { uploadOnCloudinary, deleteOnCloudinary } from '../utils/cloudinary.js';

// Get public media
const getAllMedia = async (req, res) => {
    try {
        const media = await Gallery.find({ isPublic: true }).sort({ createdAt: -1 });
        // Remove or comment out this log
        // console.log('Public media being sent:', media);
        res.json(media);
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get user media
const getUserMedia = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have authentication middleware
        const media = await Gallery.find({ userId }).sort({ createdAt: -1 });
        res.json(media);
    } catch (error) {
        console.error('Error fetching user media:', error);
        res.status(500).json({ message: error.message });
    }
};

// Upload media
const uploadMedia = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const mediaItems = [];
        // Only log if needed for debugging
        // console.log('isPublic value received:', req.body.isPublic);

        for (let file of req.files) {
            const cloudinaryResponse = await uploadOnCloudinary(file.path);
            
            if (!cloudinaryResponse) {
                return res.status(400).json({ message: 'Error uploading file to cloudinary' });
            }

            const mediaItem = new Gallery({
                userId: req.user._id,
                title: req.body.title,
                description: req.body.description,
                location: req.body.location,
                isPublic: req.body.isPublic === true || req.body.isPublic === 'true',
                type: cloudinaryResponse.resource_type,
                url: cloudinaryResponse.url,
                public_id: cloudinaryResponse.public_id,
                secure_url: cloudinaryResponse.secure_url
            });

            await mediaItem.save();
            mediaItems.push(mediaItem);
        }

        res.status(201).json(mediaItems);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Error uploading media', error: error.message });
    }
};

// Modify delete media to check user ownership
const deleteMedia = async (req, res) => {
    try {
        const userId = req.user._id;
        const media = await Gallery.findOne({ _id: req.params.id, userId });
        
        if (!media) {
            return res.status(404).json({ message: 'Media not found or unauthorized' });
        }

        await deleteOnCloudinary(media.public_id, media.type);
        await media.deleteOne();
        
        res.json({ message: 'Media deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Add this temporary route to make all media public (for testing)
const makeAllMediaPublic = async (req, res) => {
    try {
        await Gallery.updateMany({}, { isPublic: true });
        res.json({ message: 'All media items set to public' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update the updateMedia controller function
const updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const { title, description, location, isPublic } = req.body;

        const media = await Gallery.findOne({ _id: id, userId });
        
        if (!media) {
            return res.status(404).json({ message: 'Media not found or unauthorized' });
        }

        // Update basic fields
        media.title = title;
        media.description = description;
        media.location = location;
        media.isPublic = isPublic === 'true' || isPublic === true;

        // If new media file is uploaded
        if (req.file) {
            // Delete old media from cloudinary
            await deleteOnCloudinary(media.public_id, media.type);

            // Upload new media to cloudinary
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            
            if (!cloudinaryResponse) {
                return res.status(400).json({ message: 'Error uploading file to cloudinary' });
            }

            // Update media fields
            media.type = cloudinaryResponse.resource_type;
            media.url = cloudinaryResponse.url;
            media.public_id = cloudinaryResponse.public_id;
            media.secure_url = cloudinaryResponse.secure_url;
        }

        await media.save();
        res.json(media);
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: error.message });
    }
};

export { getAllMedia, getUserMedia, uploadMedia, deleteMedia, updateMedia, makeAllMediaPublic };