// routes/uploadImages.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary storage

// Cloudinary Config
cloudinary.config({
  cloud_name: 'dqefp322e',
  api_key: '118214196887964',
  api_secret: 'r6JtihtiAoYi9mSXDxcTxzafUlU',
});

// Upload route
router.post('/upload-images', upload.array('images', 10), async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const cloudinaryUrls = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'my_uploads'
      });

      fs.unlinkSync(file.path); // delete local temp file
      cloudinaryUrls.push(result.secure_url);
    }

    res.json({ cloudinaryUrls });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

module.exports = router;
