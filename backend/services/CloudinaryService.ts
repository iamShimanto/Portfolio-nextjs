import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string,
) => {
  const base64String = file.buffer.toString("base64");
  const dataUrl = `data:${file.mimetype};base64,${base64String}`;

  return await cloudinary.uploader.upload(dataUrl, { folder });
};

export const destroyFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error: any) {
    if (error) {
      throw new Error(error);
    }
  }
};
