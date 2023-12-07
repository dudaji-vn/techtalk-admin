export const baseApiUrl = 'https://wd4dz44x-5000.asse.devtunnels.ms/api';
export const authEndpoint = {
  login: 'auth/adminLogin',
};

export const lectureEndpoint = {
  getAll: 'lecture/allForAdmin',
  addOrUpdateLectureAndVocabulary: 'lecture/addLectureAndVocabulary',
  changeStatusLecture: 'lecture/changeStatusLecture',
};

export const vocabularyEndpoint = {
  getAllVocabularyByLectureId: 'vocabulary/getAllVocabulariesByLectureId',
  addOrUpdateVocabulary: 'vocabulary/addOrUpdateVocabulary',
};
