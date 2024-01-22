import { IApiResponse } from "@/interfaces/http";
import { certificateEndpoint } from "@/const/apiEndpoint";
import { IUserCertificate } from "@/interfaces/certificate";
import http from "./http.service";

class CertificateService {
  async getUsersCertificate() {
    const res = await http.get<IApiResponse<IUserCertificate[]>>(certificateEndpoint.getUsersCertificate);
    return res.data.data;
  }
}
export const certificateService = new CertificateService();
