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

export interface IStatisticsScore {
  tryPeopleCount: number;
  passPeopleCount: number;
  vocabulary: string;
  lectureName: string;
}
