import { dashboardEndpoint } from '@/const/apiEndpoint';
import { IApiResponse } from '@/interfaces/http';
import http from './http.service';

class DashboardService {
  async getAnalyst() {
    const res = await http.get<IApiResponse<IAnalyst>>(dashboardEndpoint.analyst);
    return res.data.data;
  }
}
export const dashboardService = new DashboardService();
