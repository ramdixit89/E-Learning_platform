const cloudinary = require('./cloudinary'); // Import Cloudinary configuration

const uploadImage = async (userId, image, folderName = "general") => {
    try {
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            throw new Error("Cloudinary config missing");
        }
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: folderName, // Dynamic folder name
            public_id: `user_${userId}_${Date.now()}`, // Unique public ID
            use_filename: true,
        });
        return result.secure_url; // Return the uploaded image URL
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        if (error.message === "Cloudinary config missing") {
            throw error;
        }
        throw new Error("Image upload failed");
    }
};

module.exports = { uploadImage };
