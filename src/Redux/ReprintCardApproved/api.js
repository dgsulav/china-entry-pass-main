import axiosInstance from "../../utils/axios";
import { printerAxiosInstance } from "../../utils/axios";

//obtaining the paginated data
export const getReprintCardApproved = (postsPerPage) =>
  axiosInstance.get(
    `api/v1/application/entry-pass-list?offset=0&limit=${postsPerPage}&ordering=-id&status=approved&application_type=reprint`
  );

//obtaining all data
export const getAllReprintCardApproved = () =>
  axiosInstance.get(
    `api/v1/application/entry-pass-list?ordering=-id&status=approved&application_type=reprint`
  );

//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getParticularPage = (number, postsPerPage) =>
  axiosInstance.get(
    `api/v1/application/entry-pass-list?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&ordering=-id&status=approved&application_type=reprint`
  );

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `api/v1/application/entry-pass-list?offset=0&limit=${postsPerPage}&search=${search}&status=approved&application_type=reprint`
  );

// /api/v1/application/entry-pass/print-card/1
export const generateCardNumber = (id, body) =>
  axiosInstance.patch(`/api/v1/application/entry-pass/print-card/${id}`, body);

export const printCard = (body) =>
  printerAxiosInstance.post("/api/v1/china-pass-card-printer-app/", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
export const confirmPrint = (id) =>
  axiosInstance.patch(
    `/api/v1/application/entry-pass/print-card/${id}`
  );
