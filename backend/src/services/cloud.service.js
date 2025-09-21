const cloudinary = require('cloudinary').v2;
const { ErrorHandler } = require('../utils/ErrorHandler');

// Configure upload to cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadFile = async (localPath, resource_type = 'image', folder_name, public_id) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(localPath, {
      public_id,
      resource_type,
      folder: folder_name,
      use_filename: true,
      unique_filename: false,
    });

    const optimizeUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: 'auto',
      quality: 'auto',
      resource_type,
    });

    const autoCropUrl = cloudinary.url(uploadResult.public_id, {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
      resource_type,
    });

    return {
      localPath,
      uploadResult,
      optimizeUrl,
      autoCropUrl,
    };
  } catch (error) {
    throw new ErrorHandler(500, `Cloudinary upload error: ${error.message}`);
  }
};

module.exports = { uploadFile };
