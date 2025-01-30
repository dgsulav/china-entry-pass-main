import * as API from "./api";
import * as action from "./action";
import { errorFunction, successFunction } from "../../Component/Alert";

//get  office
export const getOffice = (postsPerPage) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getOffice(postsPerPage);

    dispatch(action.getOfficeSuccessAction(data));
  } catch (error) {
    dispatch(action.getOfficeFailAction(error));
    errorFunction(error);
  }
};
// get all office
export const getAllOffice = () => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getAllOffice();

    dispatch(action.getOfficeSuccessAction(data));
  } catch (error) {
    dispatch(action.getAllOfficeFailAction(error));
    errorFunction(error);
  }
};
//get previous  page
export const getPrevious = (previous) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getPrevious(previous);

    dispatch(action.getOfficeSuccessAction(data));
  } catch (error) {
    dispatch(action.getOfficeFailAction(error));
    errorFunction(error);
  }
};
//get next  page
export const getNext = (next) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getNext(next);

    dispatch(action.getOfficeSuccessAction(data));
  } catch (error) {
    dispatch(action.getOfficeFailAction(error));
    errorFunction(error);
  }
};
//get particular page
export const getParticularOffice =
  ({ number, postsPerPage }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingAction());
      const { data } = await API.getPagetOffice(number, postsPerPage);

      dispatch(action.getOfficeSuccessAction(data));
    } catch (error) {
      dispatch(action.getOfficeFailAction(error));
      errorFunction(error);
    }
  };

export const createOffice =
  (value, currentPage, postsPerPage) => async (dispatch) => {
    const { officeType, palika, province, district, ward, isActive } = value;
    try {
      dispatch(action.loadingAction());

      const body = JSON.stringify({
        officeType,
        palika,
        province,
        district,
        ward,
        isActive,
      });

      await API.createOffice(body);
      dispatch(
        getParticularOffice({ number: currentPage, postsPerPage: postsPerPage })
      );
      successFunction("Office created successfully ");
      return true;
    } catch (error) {
      dispatch(action.createOfficeFailAction(error));
      errorFunction(error.message);
    }
  };

//update
export const updateOffice = (updateData) => async (dispatch) => {
  const { id, values, currentPage } = updateData;
  const { officeType, palika, province, district, ward, isActive } = values;
  try {
    dispatch(action.loadingUpdatedAction());

    const body = JSON.stringify({
      officeType,
      palika,
      province,
      district,
      ward,
      isActive,
    });

    dispatch(action.loadingAction());

    const { data } = await API.updateOffice(id, body);

    dispatch(getParticularOffice({ number: currentPage, postsPerPage: 10 }));
    successFunction("Office Updated Successfully ");
    return true;
  } catch (error) {
    dispatch(action.updatedOfficeFailAction(error));
    errorFunction(error.message);
  }
};
//handle Search
export const handleSearch = (search, postsPerPage) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.handleSearch(search, postsPerPage);
    dispatch(action.getOfficeSuccessAction(data));
  } catch (error) {
    dispatch(action.getOfficeFailAction(error));
    errorFunction(error);
  }
};
export const officeClearData = () => async (dispatch) => {
  try {
    dispatch(action.officeClearDataAction());
    return true;
  } catch (error) {
    errorFunction(error);
  }
};
