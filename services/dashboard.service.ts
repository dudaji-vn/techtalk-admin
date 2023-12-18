import { dashboardEndpoint } from "@/const/apiEndpoint";
import { IApiResponse } from "@/interfaces/http";
import http from "./http.service";

class DashboardService {
  async getAnalyst() {
    const res = await http.get<IApiResponse<IAnalyst>>(dashboardEndpoint.analyst);
    return res.data.data;
  }
  async getTopUserCompleteLecture({ country, numberLecture }: { country: string; numberLecture?: number }) {
    const res = await http.get<IApiResponse<any>>(dashboardEndpoint.getTopUserCompleteLecture, {
      params: {
        country,
        numberLecture: 10,
      },
    });
    return res.data.data;
  }
  async getTop5Lectures() {
    const res = await http.get<IApiResponse<any>>(dashboardEndpoint.getTop5Lectures);
    return res.data.data;
  }
}
export const dashboardService = new DashboardService();
