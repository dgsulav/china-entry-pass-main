import axiosInstance from "../../utils/axios";

const cardURL = "api/v1/application/";
//obtaining the paginated data
export const getCardRequest = (postsPerPage) =>
  axiosInstance.get(
    `api/v1/application/entry-pass-list?offset=0&limit=${postsPerPage}&ordering=-id&status=pending&application_type=new`
  );

//obtaining all data
export const getAllCardRequest = () =>
  axiosInstance.get(
    `api/v1/application/entry-pass-list?ordering=-id&status=pending&application_type=new`
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
    }&limit=${postsPerPage}&ordering=-id&status=pending&application_type=new`
  );

//creating function
export const createCard = (body) =>
  axiosInstance.post(`api/v1/application/entry-pass`, body, {
    "Content-Type": "multipart/form-data",
  });
export const editCardRequest = (id) =>
  axiosInstance.get(`api/v1/application/entry-pass/${id}`);

//update function
export const updateCard = (id, body) =>
  axiosInstance.patch(`api/v1/application/entry-pass/${id}`, body, {
    "Content-Type": "multipart/form-data",
  });
export const verifyCard = (id, body) =>
  axiosInstance.patch(`api/v1/application/entry-pass/verify/${id}`, body, {
    "Content-Type": "multipart/form-data",
  });
export const rejectEntryPass = (id, body) =>
  axiosInstance.patch(`api/v1/application/entry-pass/reject/${id}`, body, {
    "Content-Type": "multipart/form-data",
  });

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `api/v1/application/entry-pass-list?offset=0&limit=${postsPerPage}&search=${search}&status=pending&application_type=new`
  );
