import axios from "axios";
export interface ICloudinaryResponse {
  url: string;
  type: string;
}
export const uploadToCloudinary = async (files: File[]) => {
  const uploadFiles = files.map(async (file) => {
    return new Promise<ICloudinaryResponse>((resolve, reject) => {
      const formData = new FormData();
      formData.append(`file`, file);
      formData.append("upload_preset", "guq1cwrf");
      formData.append("cloud_name", "hoquanglinh");

      axios
        .post<ICloudinaryResponse>("https://api.cloudinary.com/v1_1/hoquanglinh/image/upload", formData)
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
