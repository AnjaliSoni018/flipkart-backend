import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadImage = async (
  imagePath: string,
  folder = "flipkart/products"
) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder,
    });
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    console.error("Provided Image Path:", imagePath);
    throw new Error("Image upload failed");
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary Deletion Error:", err);
    throw new Error("Image deletion failed");
  }
};
