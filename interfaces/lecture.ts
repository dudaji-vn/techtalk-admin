export interface ILectureItem {
  lectureId: string;
  lectureName: string;
  imgSrc: string;
}
export interface IFormLecture {
  lectureName: string;
  file?: File | null;
  imgSrc: string;
  lectureId?: string;
}
