import axios from "axios";
import {
  checkRedundantData,
  checkRedundantEmployeeID,
} from "../../Redux/User/api";
let cancelToken;
export const checkRedundantDataUser = async (e) => {
  //Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }
  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  try {
    const { data } = await checkRedundantData(e, cancelToken);
    if (data.data.length > 0) {
      return true;
    }
    if (data.data.length <= 0) {
      return false;
    }
  } catch (error) {}
};

export const checkRedundantDataID = async (e) => {
  //Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }
  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  try {
    const { data } = await checkRedundantEmployeeID(e, cancelToken);
    if (data.data.length > 0) {
      return true;
    }
    if (data.data.length <= 0) {
      return false;
    }
  } catch (error) {}
};
