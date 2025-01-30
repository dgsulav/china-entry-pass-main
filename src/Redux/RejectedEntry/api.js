import axiosInstance from "../../utils/axios";

const rejectedReportURL = "/api/v1/application/entry-pass-list";
//obtaining all data
export const getRejectedCard = ({ postsPerPage }) => {
  return axiosInstance.get(
    `${rejectedReportURL}?limit=0&ordering=card_no&status=rejected&application_type=new`
  );
};

export const getPrevious = (previous) => axiosInstance.get(previous);

export const getNext = (next) => axiosInstance.get(next);

export const getParticularPage = (number, postsPerPage) =>
  axiosInstance.get(
    `${rejectedReportURL}?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&status=rejected&application_type=new`
  );
// all data
export const getAllRejectedCard = () => {
  return axiosInstance.get(
    `${rejectedReportURL}?&limit=0&ordering=card_no&status=rejected&application_type=new`
  );
};

export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `${rejectedReportURL}?offset=0&limit=${postsPerPage}&search=${search}&status=rejected&application_type=new`
  );
