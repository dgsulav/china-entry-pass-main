import axiosInstance from "../../utils/axios";

const dashboardUrl = "api/v1/application/entry-pass-reports";
//obtaining the paginated data
export const getDashboardUrl = () => axiosInstance.get(`${dashboardUrl}`);
