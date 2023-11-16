import { lectureEndpoint } from "../const/apiEndpoint";
import { IFormLecture, ILectureItem } from "../interfaces/lecture";
import http from "./http.service";
import { IApiResponse } from "@/interfaces/http";

class LectureService {
  async getAllLecture() {
    const res = await http.get<IApiResponse<ILectureItem[]>>(
      lectureEndpoint.getAll
    );
    return res.data.data;
  }
  async addOrUpdateLecture(payload: IFormLecture): Promise<boolean> {
    const res = await http.put<IApiResponse<boolean>>(
      lectureEndpoint.addOrUpdateLecture,
      payload
    );
    return res.data.data;
  }
}
export const lectureService = new LectureService();
