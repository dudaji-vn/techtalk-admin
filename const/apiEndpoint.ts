export const baseApiUrl = "https://techtalk-backend-delta.vercel.app/api";
export const authEndpoint = {
  login: "auth/adminLogin",
};

export const lectureEndpoint = {
  getAll: "lecture/allForAdmin",
  addOrUpdateLecture: "lecture/addOrUpdateLecture",
};

export const vocabularyEndpoint = {
  getAllVocabularyByLectureId: "vocabulary/getAllVocabulariesByLectureId",
  addOrUpdateVocabulary: "vocabulary/addOrUpdateVocabulary",
};
