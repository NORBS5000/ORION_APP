// routes/uploadData.js
const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// Firebase Init
const serviceAccount = require('./orion-africa-firebase-adminsdk-fbsvc-3a1282a140.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://orion-africa-default-rtdb.firebaseio.com"
  });
}

const db = admin.database();

// Upload form + Cloudinary URLs
router.post('/upload-data', async (req, res) => {
  try {
    const {
      amount,
      repaymentDate,
      ownsBusiness,
      businessRegNo,
      businessLocation,
      guarantors,
      cloudinaryUrls,
    } = req.body;

    if (!cloudinaryUrls || cloudinaryUrls.length === 0) {
      return res.status(400).json({ error: 'No image URLs received' });
    }

    const newRef = db.ref('loanApplications').push();
    await newRef.set({
      amount,
      repaymentDate,
      ownsBusiness,
      businessRegNo,
      businessLocation,
      guarantors,
      uploadedFiles: cloudinaryUrls,
      createdAt: new Date().toISOString(),
    });

    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error("Firebase error:", error);
    res.status(500).json({ error: 'Failed to store data' });
  }
});

module.exports = router;
