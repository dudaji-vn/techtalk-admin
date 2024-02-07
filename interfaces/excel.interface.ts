import { ColInfo } from "xlsx";

export interface IColInfo {
  width: number;
  name: string;
}
export interface IExportExcelParams {
  fileName: string;
  data: object[];
  colInfo?: IColInfo[];
}
