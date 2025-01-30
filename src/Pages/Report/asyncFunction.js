import axiosInstance from "../../utils/axios";

export const loadOptionsOffice = async (
  search,
  loadOptions,
  { limit, offset }
) => {
  const { data } = await axiosInstance(
    `/api/v1/core-app/office-setup/list?search=${search}&offset=${offset}&limit=${limit}`
  );

  return {
    options: data.data,
    hasMore: data.count > limit ? true : false,
    additional: {
      offset: limit,
      limit: limit + 10,
    },
  };
};
