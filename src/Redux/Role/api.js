import axiosInstance from "../../utils/axios";
const roleURL = "auth/groups";
export const getRole = (postsPerPage) =>
  axiosInstance.get(`${roleURL}?offset=0&limit=${postsPerPage}&ordering=-id`);

export const getAllRole = () => axiosInstance.get(`${roleURL}?ordering=-id`);

export const getParticularPage = (number, postsPerPage) =>
  axiosInstance.get(
    `${roleURL}?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&ordering=-id`
  );

export const getNext = (next) => axiosInstance.get(next);

export const getPrevious = (previous) => axiosInstance.get(previous);

export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `${roleURL}?offset=0&limit=${postsPerPage}&search=${search}`
  );

export const createRole = (body) =>
  axiosInstance.post(`auth/group/create`, body);

export const editRole = (id) => axiosInstance.get(`auth/groups/${id}`);

//update function
export const updateRole = (id, body) =>
  axiosInstance.patch(`${roleURL}/${id}`, body);

export const getAllPermission = () => {
  return axiosInstance.get(`auth/permissions?limit=0&search=`);
};
