import { toast } from "react-toastify";
toast.configure();
//toast for error
export const errorFunction = (error) => {
  const errorMessage = typeof error === "string" ? error : "error";
  toast.error(errorMessage, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

//toast for success
export const successFunction = (data) => {
  const successMessage = typeof data === "string" ? data : "success";
  toast.success(successMessage, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
//toast for info
export const infoFunction = (data) => {
  const infoMessage = typeof data === "string" ? data : "success";
  toast.info(infoMessage, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
