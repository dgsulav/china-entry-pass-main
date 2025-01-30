import axiosInstance from "../../utils/axios";

//obtaining the paginated data
export const getOrganizationSetup = () =>
  axiosInstance.get(`api/v1/core-app/org-rule?offset=0&limit=0&ordering=-id`);

export const getOrganization = () =>
  axiosInstance.get(`api/v1/core-app/organization-setup/list?limit=0`);
//creating function
export const createOrganizationSetup = (body) =>
  axiosInstance.post(`api/v1/core-app/org-rule`, body);

//update function
export const updateOrganizationSetup = (id, body) =>
  axiosInstance.patch(`api/v1/core-app/org-rule/${id}`, body);

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/org-rule?offset=0&limit=${postsPerPage}&search=${search}`
  );
