import * as API from "./api";
import * as action from "./actions";
import { errorFunction, infoFunction } from "../../Component/Alert";

// new card request report
export const getNewCardReport = (postsPerPage, body) => async (dispatch) => {
  const { formatedStartDate, formatedEndDate, office, status } = body;
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getNewCardReportData({
      formatedStartDate,
      formatedEndDate,
      office,
      status,
      postsPerPage,
    });

    if (!data?.data?.length > 0) {
      infoFunction("Data Not found");
    }
    dispatch(action.getNewCardReportSuccess(data));
  } catch (error) {
    dispatch(action.getNewCardReportFailAction(error));
    errorFunction(error);
  }
};

// /get previous
export const getNewCardReportPrevious = (previous) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getNewCardReportPrevious(previous);
    dispatch(action.getNewCardReportSuccess(data));
  } catch (error) {
    dispatch(action.getNewCardReportFailAction(error));
  }
};
//get next
export const getNewCardReportNext = (next) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getNewCardReportNext(next);
    dispatch(action.getNewCardReportSuccess(data));
  } catch (error) {
    dispatch(action.getNewCardReportFailAction(error));
  }
};
//get particular page
export const getNewCardReportParticularPage =
  ({
    number,
    postsPerPage,
    formatedStartDate,
    formatedEndDate,
    office,
    status,
  }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingAction());
      const { data } = await API.getNewCardReportParticularPage(
        number,
        postsPerPage,
        formatedStartDate,
        formatedEndDate,
        office,
        status
      );
      dispatch(action.getNewCardReportSuccess(data));
    } catch (error) {
      dispatch(action.getNewCardReportFailAction(error));
    }
  };
// all data
export const getAllNewCardReport = (body) => async (dispatch) => {
  const { formatedStartDate, formatedEndDate, office, status } = body;

  try {
    dispatch(action.loadingAction());
    const { data } = await API.getAllNewCardReportData({
      formatedStartDate,
      formatedEndDate,
      office,
      status,
    });
    if (!data?.data?.length > 0) {
      infoFunction("Data Not found");
    }
    dispatch(action.getNewCardReportSuccess(data));
  } catch (error) {
    dispatch(action.getNewCardReportFailAction(error));
  }
};

// renew Report

export const getRenewCardReport = (postsPerPage, body) => async (dispatch) => {
  const { formatedStartDate, formatedEndDate, office, status } = body;
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getRenewCardReportData({
      formatedStartDate,
      formatedEndDate,
      office,
      status,
      postsPerPage,
    });

    if (!data?.data?.length > 0) {
      infoFunction("Data Not found");
    }
    dispatch(action.getRenewCardReportSuccess(data));
  } catch (error) {
    dispatch(action.getRenewCardReportFailAction(error));
    errorFunction(error);
  }
};

// /get previous
export const getRenewCardReportPrevious = (previous) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getRenewCardReportPrevious(previous);
    dispatch(action.getRenewCardReportSuccess(data));
  } catch (error) {
    dispatch(action.getRenewCardReportFailAction(error));
  }
};
//get next
export const getRenewCardReportNext = (next) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getRenewCardReportNext(next);
    dispatch(action.getRenewCardReportSuccess(data));
  } catch (error) {
    dispatch(action.getRenewCardReportFailAction(error));
  }
};
//get particular page
export const getRenewCardReportParticularPage =
  ({
    number,
    postsPerPage,
    formatedStartDate,
    formatedEndDate,
    office,
    status,
  }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingAction());
      const { data } = await API.getRenewCardReportParticularPage(
        number,
        postsPerPage,
        formatedStartDate,
        formatedEndDate,
        office,
        status
      );
      dispatch(action.getRenewCardReportSuccess(data));
    } catch (error) {
      dispatch(action.getRenewCardReportFailAction(error));
    }
  };
// all data
export const getAllRenewCardReport = (body) => async (dispatch) => {
  const { formatedStartDate, formatedEndDate, office, status } = body;

  try {
    dispatch(action.loadingAction());
    const { data } = await API.getAllRenewCardReportData({
      formatedStartDate,
      formatedEndDate,
      office,
      status,
    });
    if (!data?.data?.length > 0) {
      infoFunction("Data Not found");
    }
    dispatch(action.getRenewCardReportSuccess(data));
  } catch (error) {
    dispatch(action.getRenewCardReportFailAction(error));
  }
};

// reprint Report

export const getReprintCardReport =
  (postsPerPage, body) => async (dispatch) => {
    const { formatedStartDate, formatedEndDate, office, status } = body;
    try {
      dispatch(action.loadingAction());
      const { data } = await API.getReprintCardReportData({
        formatedStartDate,
        formatedEndDate,
        office,
        status,
        postsPerPage,
      });

      if (!data?.data?.length > 0) {
        infoFunction("Data Not found");
      }
      dispatch(action.getReprintCardReportSuccess(data));
    } catch (error) {
      dispatch(action.getReprintCardReportFailAction(error));
      errorFunction(error);
    }
  };

// /get previous
export const getReprintCardReportPrevious = (previous) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getReprintCardReportPrevious(previous);
    dispatch(action.getReprintCardReportSuccess(data));
  } catch (error) {
    dispatch(action.getReprintCardReportFailAction(error));
  }
};
//get next
export const getReprintCardReportNext = (next) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getReprintCardReportNext(next);
    dispatch(action.getReprintCardReportSuccess(data));
  } catch (error) {
    dispatch(action.getReprintCardReportFailAction(error));
  }
};
//get particular page
export const getReprintCardReportParticularPage =
  ({
    number,
    postsPerPage,
    formatedStartDate,
    formatedEndDate,
    office,
    status,
  }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingAction());
      const { data } = await API.getReprintCardReportParticularPage(
        number,
        postsPerPage,
        formatedStartDate,
        formatedEndDate,
        office,
        status
      );
      dispatch(action.getReprintCardReportSuccess(data));
    } catch (error) {
      dispatch(action.getReprintCardReportFailAction(error));
    }
  };
// all data
export const getAllReprintCardReport = (body) => async (dispatch) => {
  const { formatedStartDate, formatedEndDate, office, status } = body;

  try {
    dispatch(action.loadingAction());
    const { data } = await API.getAllReprintCardReportData({
      formatedStartDate,
      formatedEndDate,
      office,
      status,
    });
    if (!data?.data?.length > 0) {
      infoFunction("Data Not found");
    }
    dispatch(action.getReprintCardReportSuccess(data));
  } catch (error) {
    dispatch(action.getReprintCardReportFailAction(error));
  }
};
