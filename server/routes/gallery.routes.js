import { Router } from 'express';
import { getAllMedia, getUserMedia, uploadMedia, deleteMedia, makeAllMediaPublic, updateMedia } from '../controllers/gallery.controller.js'
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import Gallery from '../models/gallery.model.js';

const router = Router();

// Public routes
router.get('/public', getAllMedia);

// Temporary route to check database content
router.get('/check', async (req, res) => {
    try {
        const publicCount = await Gallery.countDocuments({ isPublic: true });
        const totalCount = await Gallery.countDocuments();
        res.json({
            publicCount,
            totalCount,
            message: `Found ${publicCount} public items out of ${totalCount} total items`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/make-public', makeAllMediaPublic);

// Protected routes
router.get('/user', verifyJWT, getUserMedia);
router.post('/upload', verifyJWT, upload.array('media'), uploadMedia);
router.delete('/:id', verifyJWT, deleteMedia);
router.put('/:id', verifyJWT, upload.single('media'), updateMedia);

export default router;