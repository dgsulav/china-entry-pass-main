import axiosInstance from "../../utils/axios";

export const loadOptionsProvince = async (
  search,
  loadOptions,
  { limit, offset }
) => {
  const { data } = await axiosInstance(
    `api/v1/core-app/province/list?search=${search}&offset=${offset}&limit=${limit}`
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
export const loadOptionsDistrict = async (
  search,
  loadOptions,
  { limit, offset, province }
) => {
  const { data } = await axiosInstance(
    `api/v1/core-app/district/list?search=${search}&offset=${offset}&limit=${limit}&province__id=${
      province !== null ? province?.id : ""
    }`
  );

  return {
    options: data.data,
    hasMore: data.count > limit ? true : false,
    additional: {
      offset: limit,
      limit: limit + 10,
      province: province,
    },
  };
};
export const loadOptionsPalika = async (
  search,
  loadOptions,
  { limit, offset, district }
) => {
  const { data } = await axiosInstance(
    `api/v1/core-app/palika/list?search=${search}&offset=${offset}&limit=${limit}&district__id=${
      district !== null ? district?.id : ""
    }`
  );

  return {
    options: data.data,
    hasMore: data.count > limit ? true : false,
    additional: {
      offset: limit,
      limit: limit + 10,
      district: district,
    },
  };
};

export const loadOptionsIssuedCitizenship = async (
  search,
  loadOptions,
  { limit, offset }
) => {
  const { data } = await axiosInstance(
    `api/v1/core-app/district/list?search=${search}&offset=${offset}&limit=${limit}`
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
