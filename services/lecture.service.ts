import { IApiResponse } from '@/interfaces/http';
import { lectureEndpoint } from '@/const/apiEndpoint';
import { IChangeStatusLectureRequest, IFormLectureAndVocabulary, ILectureItem } from '@/interfaces/lecture';
import http from './http.service';

class LectureService {
  async getAllLecture() {
    const res = await http.get<IApiResponse<ILectureItem[]>>(lectureEndpoint.getAll);
    return res.data.data;
  }

  async addOrUpdateLectureAndVocabulary(payload: IFormLectureAndVocabulary): Promise<boolean> {
    const res = await http.put<IApiResponse<boolean>>(lectureEndpoint.addOrUpdateLectureAndVocabulary, payload);
    return res.data.data;
  }
  async changeStatusLecture(payload: IChangeStatusLectureRequest): Promise<boolean> {
    const res = await http.put<IApiResponse<boolean>>(lectureEndpoint.changeStatusLecture, payload);
    return res.data.data;
  }
  async uploadExcelFile(payload: any) {
    const res = await http.post<IApiResponse<boolean>>(lectureEndpoint.changeStatusLecture, payload);
    return res.data.data;
  }
}
export const lectureService = new LectureService();
