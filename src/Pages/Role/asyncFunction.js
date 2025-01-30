import axiosInstance from "../../utils/axios";

export const loadOptionsPermissionCategory = async (
  search,
  loadOptions,
  { limit, offset }
) => {
  const { data } = await axiosInstance(
    `/api/v1/group-app/permission-category?search=${search}&offset=${offset}&limit=${limit}`
  );

  return {
    options: data.data,
    hasMore: data.data.count > limit ? true : false,
    additional: {
      offset: limit,
      limit: limit + 10,
    },
  };
};
