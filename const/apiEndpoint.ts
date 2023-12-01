export const baseApiUrl = 'http://localhost:5000/api';
export const authEndpoint = {
  login: 'auth/adminLogin',
};

export const lectureEndpoint = {
  getAll: 'lecture/allForAdmin',
  addOrUpdateLecture: 'lecture/addOrUpdateLecture',
};

export const vocabularyEndpoint = {
  getAllVocabularyByLectureId: 'vocabulary/getAllVocabulariesByLectureId',
  addOrUpdateVocabulary: 'vocabulary/addOrUpdateVocabulary',
};
