import { searchConstants } from "./constants";

export const updateSearchString = (data) => ({
  type: searchConstants.UPDATE_SEARCH_STRING,
  payload: data,
});

export const clearSearchString = () => ({
  type: searchConstants.CLEAR_SEARCH_STRING,
});
