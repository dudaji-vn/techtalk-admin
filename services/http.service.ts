import axios, { type AxiosInstance } from "axios";
import { keyStorage } from "../const/keyStorage";
import { baseApiUrl } from "../const/apiEndpoint";

export class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: baseApiUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (config.headers) {
          const accessToken = localStorage.getItem(keyStorage.accessToken);
          if (!!accessToken) {
            config.headers.Authorization = accessToken;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
const http = new Http().instance;

export default http;
