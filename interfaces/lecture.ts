import { IVocabulariesByLectureResponse } from './vocabulary';

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
  lectureId: string;
  status: 'Draft' | 'Published';
  lectureName: string;
  imgSrc: string;
  listVocabulary: IVocabulariesByLectureResponse[];
}
export interface IChangeStatusLectureRequest {
  lectureId: string;
  status: 'Draft' | 'Published';
}
