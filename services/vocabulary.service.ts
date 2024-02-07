import { lectureEndpoint, vocabularyEndpoint } from "../const/api-endpoint";
import { IFormVocabulary, IVocabulariesByLectureResponse } from "../interfaces/vocabulary.interface";
import http from "./http.service";
import { IApiResponse } from "@/interfaces/http.interface";

class VocabularyService {
  async getAllVocabularyByLectureId(lectureId: string) {
    const res = await http.get<IApiResponse<IVocabulariesByLectureResponse[]>>(vocabularyEndpoint.getAllVocabularyByLectureId, {
      params: { lectureId },
    });
    return res.data.data;
  }

  async addOrUpdateVocabulary(payload: IFormVocabulary): Promise<boolean> {
    const res = await http.put<IApiResponse<boolean>>(vocabularyEndpoint.addOrUpdateVocabulary, payload);
    return res.data.data;
  }
}
export const vocabularyService = new VocabularyService();
