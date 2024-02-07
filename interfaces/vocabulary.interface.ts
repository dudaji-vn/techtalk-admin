export interface IVocabulariesByLectureResponse {
  textVN: string;
  textKR: string;
  vocabularyId: string;
  numberOrder: number;
  lectureName?: string;
  titleDisplay: string;
  phonetic: string;
}

export interface IFormVocabulary {
  numberOrder: number;
  lectureId: string;
  titleDisplay: string;
  phonetic: string;
  vocabularyId?: string;
  textVN: string;
  textKR: string;
}
