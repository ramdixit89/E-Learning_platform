const cloudinary = require('./cloudinary'); // Import Cloudinary configuration

const uploadImage = async (userId, image, folderName = "general") => {
    try {
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: folderName, // Dynamic folder name
            public_id: `user_${userId}_${Date.now()}`, // Unique public ID
            use_filename: true,
        });
        return result.secure_url; // Return the uploaded image URL
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Image upload failed");
    }
};

module.exports = { uploadImage };
