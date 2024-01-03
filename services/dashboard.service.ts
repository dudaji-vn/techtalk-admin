import { dashboardEndpoint } from "@/const/apiEndpoint";
import { IApiResponse } from "@/interfaces/http";
import http from "./http.service";
import { arrayWithIndexItem } from "../utils/array";
import { IAnalyst, IStatisticsScore, IUserCompleteLecture } from "../interfaces/dashboard";

class DashboardService {
  async getAnalyst() {
    const res = await http.get<IApiResponse<IAnalyst>>(dashboardEndpoint.analyst);
    return res.data.data;
  }
  async getTopUserCompleteLecture({ country, numberLecture }: { country: string; numberLecture?: number }) {
    const res = await http.get<IApiResponse<IUserCompleteLecture[]>>(dashboardEndpoint.getTopUserCompleteLecture, {
      params: {
        country,
        numberLecture: 10,
      },
    });
    return arrayWithIndexItem(res.data.data);
  }
  async getTop5Lectures() {
    const res = await http.get<IApiResponse<any>>(dashboardEndpoint.getTop5Lectures);
    return res.data.data;
  }
  async getStatisticsScore() {
    const res = await http.get<IApiResponse<IStatisticsScore[]>>(dashboardEndpoint.getStatisticsScore);
    return res.data.data;
  }
}
export const dashboardService = new DashboardService();
