import moment from "moment";
export function formatDate(dateInput: string) {
  return moment(dateInput).format("DD MMM YYYY HH:mm");
}
export function formateDateWithoutTime(dateInput: string) {
  return moment(dateInput).format("DD MMM YYYY ");
}
