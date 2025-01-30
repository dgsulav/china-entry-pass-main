import axiosInstance from "../../utils/axios";

const reportURL = "api/v1/application/entry-pass-list-reports";
//new card request
export const getNewCardReportData = ({
  formatedStartDate,
  formatedEndDate,
  office,
  status,
  postsPerPage,
}) => {
  return axiosInstance.get(
    `${reportURL}?limit=0&office=${office}&status=${status}&date_after=${formatedStartDate}&date_before=${formatedEndDate}&ordering=card_no&application_type=new`
  );
};

export const getNewCardReportPrevious = (previous) =>
  axiosInstance.get(previous);

export const getNewCardReportNext = (next) => axiosInstance.get(next);

export const getNewCardReportParticularPage = (
  number,
  postsPerPage,
  office,
  status,
  formatedStartDate,
  formatedEndDate
) =>
  axiosInstance.get(
    `${reportURL}?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&office=${office}&status=${status}&date_after=${formatedStartDate}&date_before=${formatedEndDate}&application_type=new`
  );
// all data
export const getAllNewCardReportData = ({
  formatedStartDate,
  formatedEndDate,
  office,
  status,
}) => {
  return axiosInstance.get(
    `${reportURL}?office=${office}&status=${status}&date_after=${formatedStartDate}&date_before=${formatedEndDate}&limit=0&ordering=card_no&application_type=new`
  );
};

// renew card

export const getRenewCardReportData = ({
  formatedStartDate,
  formatedEndDate,
  office,
  status,
  postsPerPage,
}) => {
  return axiosInstance.get(
    `${reportURL}?limit=0&office=${office}&status=${status}&date_after=${formatedStartDate}&date_before=${formatedEndDate}&ordering=card_no&application_type=renew`
  );
};

export const getRenewCardReportPrevious = (previous) =>
  axiosInstance.get(previous);

export const getRenewCardReportNext = (next) => axiosInstance.get(next);

export const getRenewCardReportParticularPage = (
  number,
  postsPerPage,
  office,
  status,
  formatedStartDate,
  formatedEndDate
) =>
  axiosInstance.get(
    `${reportURL}?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&office=${office}&status=${status}&date_after=${formatedStartDate}&date_before=${formatedEndDate}&application_type=renew`
  );
// all data
export const getAllRenewCardReportData = ({
  formatedStartDate,
  formatedEndDate,
  office,
  status,
}) => {
  return axiosInstance.get(
    `${reportURL}?office=${office}&status=${status}&date_after=${formatedStartDate}&date_before=${formatedEndDate}&limit=0&ordering=card_no&application_type=renew`
  );
};

// reprint report

export const getReprintCardReportData = ({
  formatedStartDate,
  formatedEndDate,
  office,
  status,
  postsPerPage,
}) => {
  return axiosInstance.get(
    `${reportURL}?limit=0&office=${office}&status=${status}&date_after=${formatedStartDate}&date_before=${formatedEndDate}&ordering=card_no&application_type=reprint`
  );
};

export const getReprintCardReportPrevious = (previous) =>
  axiosInstance.get(previous);

export const getReprintCardReportNext = (next) => axiosInstance.get(next);

export const getReprintCardReportParticularPage = (
  number,
  postsPerPage,
  office,
  status,
  formatedStartDate,
  formatedEndDate
) =>
  axiosInstance.get(
    `${reportURL}?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&office=${office}&status=${status}&date_after=${formatedStartDate}&date_before=${formatedEndDate}&application_type=reprint`
  );
// all data
export const getAllReprintCardReportData = ({
  formatedStartDate,
  formatedEndDate,
  office,
  status,
}) => {
  return axiosInstance.get(
    `${reportURL}?office=${office}&status=${status}&date_after=${formatedStartDate}&date_before=${formatedEndDate}&limit=0&ordering=card_no&application_type=reprint`
  );
};
