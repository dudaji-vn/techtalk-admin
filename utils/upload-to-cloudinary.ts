import axios from "axios";
import { CLOUDINARY_CONFIG } from "../const/path";

export interface ICloudinaryResponse {
  url: string;
  type: string;
}
export const uploadToCloudinary = async (files: File[]) => {
  const {cloudName,cloudiaryUrl,uploadPreset} =CLOUDINARY_CONFIG
  const uploadFiles = files.map(async (file) => {
    return new Promise<ICloudinaryResponse>((resolve, reject) => {
      const formData = new FormData();
      formData.append(`file`, file);
      formData.append("upload_preset", uploadPreset);
      formData.append("cloud_name", cloudName);
      

      axios
        .post<ICloudinaryResponse>(cloudiaryUrl, formData)
        .then((response) => {
          resolve({
            url: response.data.url,
            type: "image",
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  });

  try {
    const imgArr = await Promise.all(uploadFiles);
    return imgArr;
  } catch (error) {
    console.log(error);
  }
};
