import { IFormVocabulary, IVocabulariesByLectureResponse } from './vocabulary';

export interface ILectureItem {
  lectureId: string;
  lectureName: string;
  imgSrc: string;
  status: 'Draft' | 'Published';
}
export interface IFormLecture {
  lectureName: string;
  file?: File | null;
  imgSrc: string;
  lectureId?: string;
}

export interface IFormLectureAndVocabulary {
  status: string;
  lectureName: string;
  imgSrc: string;
  listVocabulary: IVocabulariesByLectureResponse[];
}
