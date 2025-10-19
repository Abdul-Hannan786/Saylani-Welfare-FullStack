import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { fileTypeFromBuffer } from "file-type";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

/**
 * Upload file buffer to Cloudinary.
 * Handles both PDFs and images, and ensures PDFs open inline in browser.
 */
export const uploadToCloudinary = async (buffer, folder = "saylani-welfare") => {
  try {
    const type = await fileTypeFromBuffer(buffer);
    const isPDF = type?.mime === "application/pdf";
    const extension = type?.ext || "file";

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: isPDF ? "raw" : "auto", // ✅ Use "raw" for PDFs, "auto" for images
          public_id: `${Date.now()}.${extension}`, // ✅ Include file extension
          use_filename: true,
          unique_filename: false,
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(error);
          }
          resolve(result); // ✅ Just return the basic result
        }
      );

      const readable = new Readable();
      readable._read = () => {};
      readable.push(buffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

export default cloudinary;
