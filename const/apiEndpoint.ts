export const baseApiUrl = "https://techtalk-02ik.onrender.com/api";
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
