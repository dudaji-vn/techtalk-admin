export const baseApiUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const authEndpoint = {
  login: "auth/adminLogin",
};
export const fileEndpoint = {
  uploadLectureAndVocabularyFromCsv: "file/uploadLectureAndVocabularyFromCsv",
};

export const lectureEndpoint = {
  getAll: "lecture/allForAdmin",
  addOrUpdateLectureAndVocabulary: "lecture/addLectureAndVocabulary",
  changeStatusLecture: "lecture/changeStatusLecture",
};

export const vocabularyEndpoint = {
  getAllVocabularyByLectureId: "vocabulary/getAllVocabulariesByLectureId",
  addOrUpdateVocabulary: "vocabulary/addOrUpdateVocabulary",
};

export const dashboardEndpoint = {
  analyst: "dashboard/analyst",
  getTopUserCompleteLecture: "dashboard/getTopUserCompleteLecture",
  getTop5Lectures: "dashboard/getTop5Lectures",
  getStatisticsScore: "dashboard/getStatisticsScore",
};

export const certificateEndpoint = {
  getUsersCertificate: "certificate/getUsersCertificate",
};
