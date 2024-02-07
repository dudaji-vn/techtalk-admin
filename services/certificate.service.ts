import { IApiResponse } from "@/interfaces/http.interface";
import { certificateEndpoint } from "@/const/api-endpoint";
import { IUserCertificate } from "@/interfaces/certificate.interface";
import http from "./http.service";

class CertificateService {
  async getUsersCertificate() {
    const res = await http.get<IApiResponse<IUserCertificate[]>>(certificateEndpoint.getUsersCertificate);
    return res.data.data;
  }
}
export const certificateService = new CertificateService();
