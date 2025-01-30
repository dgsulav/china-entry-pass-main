import axiosInstance from "../../utils/axios";

const officeUrl = "api/v1/core-app/office-setup/list";
//obtaining the paginated data
export const getOffice = (postsPerPage) =>
  axiosInstance.get(`${officeUrl}?offset=0&limit=${postsPerPage}&ordering=-id`);

//obtaining all data
export const getAllOffice = () =>
  axiosInstance.get(`${officeUrl}?ordering=-id`);

//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPagetOffice = (number, postsPerPage) =>
  axiosInstance.get(
    `${officeUrl}?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&ordering=-id`
  );

//creating function
export const createOffice = (body) =>
  axiosInstance.post(`api/v1/core-app/office-setup`, body);

//update function
export const updateOffice = (id, body) =>
  axiosInstance.patch(`api/v1/core-app/office-setup/${id}`, body);

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `${officeUrl}?offset=0&limit=${postsPerPage}&search=${search}`
  );

// checking the redundant data
export const checkRedundantData = (e, cancelToken) =>
  axiosInstance.get(`${officeUrl}?office=${e.target.value.trim()}`, {
    cancelToken: cancelToken.token,
  });
