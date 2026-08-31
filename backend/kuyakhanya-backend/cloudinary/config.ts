/**
 * Cloudinary — free tier (25 GB storage + 25 GB bandwidth/month)
 * Primary media stays in DatoCMS CDN, but this config lets you
 * mirror uploads or use Cloudinary for audio/programmes.
 *
 * Free-tier only, no trial.
 */
import { v2 as cloudinary } from "cloudinary";

export function initCloudinary() {
  const name = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  const url = process.env.CLOUDINARY_URL; // alternative: cloudinary://key:secret@name
  if (url) {
    // cloudinary.config parses CLOUDINARY_URL automatically
    cloudinary.config({ secure: true });
    return cloudinary;
  }
  if (!name || !key || !secret) {
    throw new Error("Missing CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET — set in .env");
  }
  cloudinary.config({ cloud_name: name, api_key: key, api_secret: secret, secure: true });
  return cloudinary;
}

export { cloudinary };

// Example helpers:
// const c = initCloudinary();
// const { secure_url } = await c.uploader.upload(filePath, { folder: "kuyakhanya/programmes" });
