import { lectureEndpoint, vocabularyEndpoint } from "../const/apiEndpoint";
import {
  IFormVocabulary,
  IVocabulariesByLectureResponse,
} from "../interfaces/vocabulary";
import http from "./http.service";
import { IApiResponse } from "@/interfaces/http";

class VocabularyService {
  async getAllVocabularyByLectureId(lectureId: string) {
    const res = await http.get<IApiResponse<IVocabulariesByLectureResponse[]>>(
      vocabularyEndpoint.getAllVocabularyByLectureId,
      {
        params: { lectureId },
      }
    );
    return res.data.data;
  }

  async addOrUpdateVocabulary(payload: IFormVocabulary): Promise<boolean> {
    const res = await http.put<IApiResponse<boolean>>(
      vocabularyEndpoint.addOrUpdateVocabulary,
      payload
    );
    return res.data.data;
  }
}
export const vocabularyService = new VocabularyService();
