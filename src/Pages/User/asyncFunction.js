import axiosInstance from "../../utils/axios";

export const loadOptionsOffice = async (
  search,
  loadOptions,
  { limit, offset }
) => {
  const { data } = await axiosInstance(
    `api/v1/core-app/office/list?search=${search}&offset=${offset}&limit=${limit}`
  );
  return {
    options: data.data,
    hasMore: data.data.next ? true : false,
    additional: {
      offset: limit,
      limit: limit + 10,
    },
  };
};
export const loadOptionsRole = async (
  search,
  loadOptions,
  { limit, offset }
) => {
  const { data } = await axiosInstance(
    `auth/groups/list?search=${search}&offset=${offset}&limit=${limit}&is_active=true`
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
