import { toast } from "react-toastify";

export const notify = (message, success) => {
  if (success) {
    toast.success(message);
  } else {
    toast.error(message);
  }
};
