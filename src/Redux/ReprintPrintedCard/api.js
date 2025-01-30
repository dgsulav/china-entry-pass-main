import axiosInstance from "../../utils/axios";

//obtaining the paginated data
export const getReprintPrintedCard = (postsPerPage) =>
  axiosInstance.get(
    `api/v1/application/entry-pass-list?offset=0&limit=${postsPerPage}&ordering=-id&status=printed&application_type=reprint`
  );

//obtaining all data
export const getAllReprintPrintedCard = () =>
  axiosInstance.get(
    `api/v1/application/entry-pass-list?ordering=-id&status=printed&application_type=reprint`
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
    }&limit=${postsPerPage}&ordering=-id&status=printed&applicationType=reprint&application_type=reprint`
  );

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `api/v1/application/entry-pass-list?offset=0&limit=${postsPerPage}&search=${search}&status=printed&applicationType=reprint&application_type=reprint`
  );
