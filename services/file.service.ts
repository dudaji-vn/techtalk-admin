import { IApiResponse } from "@/interfaces/http.interface";
import { fileEndpoint } from "../const/api-endpoint";
import http from "./http.service";
import { AxiosRequestConfig } from "axios";

class FileService {
  async uploadLectureAndVocabularyFromCsv(csvBlob: Blob, config?: AxiosRequestConfig<any>): Promise<boolean> {
    const formData = new FormData();
    formData.append("csvFile", csvBlob, "file.csv");
    const res = await http.put<IApiResponse<boolean>>(fileEndpoint.uploadLectureAndVocabularyFromCsv, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.data;
  }
}
export const fileService = new FileService();
