import { toast as toastLib } from "react-toastify";
export function toastSuccess(message: string, config = {}) {
  return toastLib(message, {
    autoClose: 1000,
    ...config,
  });
}
export function toastError(message: string, config = {}) {
  return toastLib.error(message, {
    autoClose: 1000,
    ...config,
  });
}
