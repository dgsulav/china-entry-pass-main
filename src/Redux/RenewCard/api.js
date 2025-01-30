import axiosInstance from "../../utils/axios";

const cardURL = "api/v1/application/";
//obtaining the paginated data
export const getRenewCardRequest = (postsPerPage) =>
  axiosInstance.get(
    `api/v1/application/entry-pass-list?offset=0&limit=${postsPerPage}&ordering=-id&application_type=renew&status=pending`
  );

//obtaining all data
export const getAllRenewCardRequest = () =>
  axiosInstance.get(
    `api/v1/application/entry-pass-list?ordering=-id&application_type=renew&status=pending`
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
    }&limit=${postsPerPage}&ordering=-id&application_type=renew&status=pending`
  );

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `api/v1/application/entry-pass-list?offset=0&limit=${postsPerPage}&search=${search}&application_type=renew&status=pending`
  );
export const updateRenewCard = (id, body) =>
  axiosInstance.patch(`api/v1/application/entry-pass/${id}`, body, {
    "Content-Type": "multipart/form-data",
  });
