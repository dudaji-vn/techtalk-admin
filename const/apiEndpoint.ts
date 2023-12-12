export const baseApiUrl = 'https://techtalk-backend-production.onrender.com/api';
export const authEndpoint = {
  login: 'auth/adminLogin',
};
export const fileEndpoint = {
  uploadLectureAndVocabularyFromCsv: 'file/uploadLectureAndVocabularyFromCsv',
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

export const dashboardEndpoint = {
  analyst: 'dashboard/analyst',
};
