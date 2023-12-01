import moment from 'moment';
export function formatDate(dateInput: string) {
  return moment(dateInput).format('MMM DD, YYYY h:mm A');
}
