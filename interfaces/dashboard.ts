export interface IAnalyst {
  totalLectures: number;
  totalUser: number;
  totalCompletedRecordUser: number;
  totalUserVN: number;
  totalUserKR: number;
}
export interface IUserCompleteLecture {
  index: number;
  nickName: string;
  email: string;
  lastCompleted: string;
}
