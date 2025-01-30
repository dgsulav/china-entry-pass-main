import axiosInstance from "../../utils/axios";

const cardURL = "api/v1/application/";
//obtaining the paginated data
export const getVerifyCard = (postsPerPage) =>
  axiosInstance.get(
    `api/v1/application/entry-pass-list?offset=0&limit=${postsPerPage}&ordering=-id&status=verified&application_type=new`
  );

//obtaining all data
export const getAllVerifyCard = () =>
  axiosInstance.get(
    `api/v1/application/entry-pass-list?ordering=-id&status=verified&application_type=new`
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
    }&limit=${postsPerPage}&ordering=-id&status=verified&application_type=new`
  );

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `api/v1/application/entry-pass-list?offset=0&limit=${postsPerPage}&search=${search}&status=verified&application_type=new`
  );

export const verifyCard = (id, body) =>
  axiosInstance.patch(`api/v1/application/entry-pass/approve/${id}`, body, {
    "Content-Type": "multipart/form-data",
  });

export const getVerifyCardById = (id) =>
  axiosInstance.get(`api/v1/application/entry-pass/${id}`);
