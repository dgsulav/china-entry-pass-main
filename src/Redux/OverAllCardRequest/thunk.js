import * as API from "./api";
import * as actions from "./actions";
import { errorFunction, successFunction } from "../../Component/Alert";
import { getParticularPage as getParticularPageVerify } from "../VerifyCard/thunk";
//get  Bank
export const getCardRequest = (postsPerPage) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getCardRequest(postsPerPage);
    dispatch(actions.getCardRequestSuccessAction(data));
  } catch (error) {
    dispatch(actions.getCardRequestFailAction(error));
    errorFunction(error);
  }
};

// get all bank
export const getAllCardRequest = () => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getAllCardRequest();
    dispatch(actions.getCardRequestSuccessAction(data));
  } catch (error) {
    dispatch(actions.getCardRequestFailAction(error));
    errorFunction(error);
  }
};
//get previous  page
export const getPrevious = (previous) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getPrevious(previous);
    dispatch(actions.getCardRequestSuccessAction(data));
  } catch (error) {
    dispatch(actions.getCardRequestFailAction(error));
    errorFunction(error);
  }
};
//get next  page
export const getNext = (next) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getNext(next);
    dispatch(actions.getCardRequestSuccessAction(data));
  } catch (error) {
    dispatch(actions.getCardRequestFailAction(error));
    errorFunction(error);
  }
};
//get particular page
export const getParticularPage =
  ({ number, postsPerPage }) =>
  async (dispatch) => {
    try {
      dispatch(actions.loadingAction());
      const { data } = await API.getParticularPage(number, postsPerPage);
      dispatch(actions.getCardRequestSuccessAction(data));
    } catch (error) {
      dispatch(actions.getCardRequestFailAction(error));
      errorFunction(error);
    }
  };

// create
export const createCard = (updatedValues, currentPage) => async (dispatch) => {
  const {
    userPhoto,
    firstName,
    middleName,
    lastName,
    dob,
    dobBs,
    permanentAddress,
    email,
    gender,
    province,
    district,
    palika,
    wardNumber,
    citizenshipNumber,
    hasCitizenship,
    citizenshipIssuedFrom,
    citizenshipIssuedDate,
    citizenshipFront,
    citizenshipBack,
    birthCertificate,
    fatherName,
    spouseName,
    mobileNumber,
    isRecommended,
    recommendationLetter,
    isConfirmed,
  } = updatedValues;
  try {
    const body = new FormData();
    body.append("firstName", firstName);
    body.append("middleName", middleName);
    body.append("lastName", lastName);
    body.append("dob", dob);
    body.append("dobBs", dobBs);
    body.append("permanentAddress", permanentAddress);
    body.append("email", email);
    body.append("gender", gender);

    body.append("province", province);
    body.append("district", district);
    body.append("palika", palika);
    body.append("wardNumber", wardNumber);
    body.append("citizenshipNumber", citizenshipNumber);
    body.append("hasCitizenship", hasCitizenship);
    body.append("citizenshipIssuedFrom", citizenshipIssuedFrom);
    body.append("citizenshipIssuedDate", citizenshipIssuedDate);
    body.append("fatherName", fatherName);
    body.append("spouseName", spouseName);
    body.append("mobileNumber", mobileNumber);
    body.append("isRecommended", isRecommended === "yes" ? true : false);
    body.append("isConfirmed", isConfirmed);

    if (userPhoto) {
      body.append("userPhoto", userPhoto);
    }
    if (citizenshipFront) {
      body.append("citizenshipFront", citizenshipFront);
    }
    if (citizenshipBack) {
      body.append("citizenshipBack", citizenshipBack);
    }
    if (citizenshipFront) {
      body.append("citizenshipFront", citizenshipFront);
    }
    if (birthCertificate) {
      body.append("birthCertificate", birthCertificate);
    }
    if (recommendationLetter) {
      body.append("recommendationLetter", recommendationLetter);
    }

    dispatch(actions.loadingAction());
    const { data } = await API.createCard(body);
    dispatch(getParticularPage({ number: currentPage, postsPerPage: 10 }));
    dispatch(actions.createCardSuccessAction(data));
    successFunction("Record Added Successfully.");
    return true;
  } catch (error) {
    dispatch(actions.createCardFailAction(error));
    errorFunction(error);
  }
};

export const editCardRequest = (id) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.editCardRequest(id);
    dispatch(actions.editCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.editCardFailAction(error));
    errorFunction(error);
  }
};

//update
export const updateCard = (id, values, currentPage) => async (dispatch) => {
  try {
    dispatch(actions.loadingUpdatedAction());
    const {
      userPhoto,
      firstName,
      middleName,
      lastName,
      dob,
      dobBs,
      permanentAddress,
      email,
      gender,
      province,
      district,
      palika,
      wardNumber,
      citizenshipNumber,
      hasCitizenship,
      citizenshipIssuedFrom,
      citizenshipIssuedDate,
      citizenshipFront,
      citizenshipBack,
      birthCertificate,
      fatherName,
      spouseName,
      mobileNumber,
      isRecommended,
      recommendationLetter,
      isConfirmed,
      voucherReferenceNumber,
      status,
      signature,
    } = values;
    const body = new FormData();
    body.append("firstName", firstName);
    body.append("middleName", middleName);
    body.append("lastName", lastName);
    body.append("dob", dob);
    body.append("dobBs", dobBs);
    body.append("permanentAddress", permanentAddress);
    body.append("email", email);
    body.append("gender", gender);

    body.append("province", province);
    body.append("district", district);
    body.append("palika", palika);
    body.append("wardNumber", wardNumber);
    body.append("citizenshipNumber", citizenshipNumber);
    body.append("hasCitizenship", hasCitizenship);
    body.append("citizenshipIssuedFrom", citizenshipIssuedFrom);
    body.append("citizenshipIssuedDate", citizenshipIssuedDate);
    body.append("fatherName", fatherName);
    body.append("spouseName", spouseName);
    body.append("mobileNumber", mobileNumber);
    body.append("isRecommended", isRecommended === "yes" ? true : false);
    body.append("isConfirmed", isConfirmed);
    if (status) {
      body.append("status", status);
    }
    if (voucherReferenceNumber) {
      body.append("voucherReferenceNumber", voucherReferenceNumber);
    }
    if (signature) {
      body.append("signature", signature);
    }

    if (userPhoto) {
      body.append("userPhoto", userPhoto);
    }
    if (citizenshipFront) {
      body.append("citizenshipFront", citizenshipFront);
    }
    if (citizenshipBack) {
      body.append("citizenshipBack", citizenshipBack);
    }
    if (citizenshipFront) {
      body.append("citizenshipFront", citizenshipFront);
    }
    if (birthCertificate) {
      body.append("birthCertificate", birthCertificate);
    }
    if (recommendationLetter) {
      body.append("recommendationLetter", recommendationLetter);
    }

    const response = await API.updateCard(id, body);
    dispatch(getParticularPage({ number: currentPage, postsPerPage: 10 }));
    dispatch(actions.updatedCardSuccessAction(response?.data));
    successFunction("Record Updated Successfully ");
    return true;
  } catch (error) {
    dispatch(actions.updatedCardFailAction(error));
    errorFunction(error);
    return false;
  }
};
export const rejectEntryPass =
  (id, values, currentPage, postsPerPage, types) => async (dispatch) => {
    try {
      const { remarks } = values;

      const body = JSON.stringify({ remarks });

      await API.rejectEntryPass(id, body);

      if (types === "verifyCard") {
        dispatch(
          getParticularPageVerify({
            number: currentPage,
            postsPerPage: postsPerPage,
          })
        );
      } else {
        dispatch(
          getParticularPage({ number: currentPage, postsPerPage: postsPerPage })
        );
      }
      successFunction("Pass Rejected ");
      return true;
    } catch (error) {
      dispatch(actions.updatedCardFailAction(error));
      errorFunction(error);
      return false;
    }
  };
export const verifyCardThunk = (id, values) => async (dispatch) => {
  try {
    dispatch(actions.loadingUpdatedAction());
    const { signature } = values;
    const body = new FormData();

    body.append("signature", signature);

    const response = await API.verifyCard(id, body);

    dispatch(actions.updatedCardSuccessAction(response?.data));
    successFunction("Record Updated Successfully ");
    return true;
  } catch (error) {
    dispatch(actions.updatedCardFailAction(error));
    errorFunction(error);
    return false;
  }
};
//handle Search
export const handleSearch = (search, postsPerPage) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.handleSearch(search, postsPerPage);
    dispatch(actions.getCardRequestSuccessAction(data));
  } catch (error) {
    dispatch(actions.getCardRequestFailAction(error));
    errorFunction(error);
  }
};
export const cardClearData = () => async (dispatch) => {
  try {
    dispatch(actions.cardClearDataAction());
    return true;
  } catch (error) {
    errorFunction(error);
  }
};
