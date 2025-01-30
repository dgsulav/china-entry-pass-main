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
export const createCard =
  (updatedValues, currentPage, postsPerPage) => async (dispatch) => {
    const {
      userPhoto,
      firstName,
      middleName,
      lastName,
      dob,
      dobBs,
      birthDistrict,
      birthPlace,
      email,
      gender,
      province,
      district,
      palika,
      wardNumber,
      tole,
      migrated,
      married,
      marriedDistrict,
      migratedDistrict,
      marriageDocuments,
      migrationDocument,
      citizenshipNumber,
      hasCitizenship,
      citizenshipIssuedFrom,
      citizenshipIssuedDate,
      citizenshipFrontImg,
      citizenshipBackImg,
      birthCertificateImg,
      fatherName,
      spouseName,
      mobileNumber,
      isRecommended,
      recommendationLetterImg,
      isConfirmed,
    } = updatedValues;

    try {
      const body = new FormData();
      body.append("firstName", firstName);
      body.append("middleName", middleName);
      body.append("lastName", lastName);
      body.append("dob", dob);
      body.append("dobBs", dobBs);

      body.append("email", email);
      body.append("gender", gender);
      body.append("birthDistrict", birthDistrict);
      body.append("birthPlace", birthPlace);
      body.append("migrated", migrated);
      body.append("married", married);
      body.append("province", province);
      body.append("district", district);
      body.append("palika", palika);
      body.append("wardNumber", wardNumber);
      body.append("tole", tole);
      body.append("citizenshipNumber", citizenshipNumber);
      body.append("hasCitizenship", hasCitizenship);
      body.append("citizenshipIssuedFrom", citizenshipIssuedFrom);
      body.append("citizenshipIssuedDate", citizenshipIssuedDate);
      body.append("fatherName", fatherName);
      body.append("spouseName", spouseName);
      body.append("mobileNumber", mobileNumber);
      body.append("isRecommended", isRecommended);
      body.append("isConfirmed", isConfirmed);

      if (married) {
        body.append("marriedDistrict", marriedDistrict);
      }
      if (migrated) {
        body.append("migratedDistrict", migratedDistrict);
      }

      if (userPhoto) {
        body.append("userPhoto", userPhoto);
      }

      if (citizenshipBackImg !== null) {
        body.append("citizenshipBack", citizenshipBackImg);
      }
      if (citizenshipFrontImg !== null) {
        body.append("citizenshipFront", citizenshipFrontImg);
      }
      if (birthCertificateImg !== null) {
        body.append("birthCertificate", birthCertificateImg);
      }
      if (migrationDocument !== null) {
        body.append("migrationDocument", migrationDocument);
      }
      if (marriageDocuments !== null) {
        body.append("marriageDocuments", marriageDocuments);
      }
      if (recommendationLetterImg !== null) {
        body.append("recommendationLetter", recommendationLetterImg);
      }

      dispatch(actions.loadingCreate());
      const { data } = await API.createCard(body);
      dispatch(getParticularPage({ number: currentPage, postsPerPage }));
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
export const updateCard =
  (id, values, type, currentPage, postsPerPage) => async (dispatch) => {
    try {
      dispatch(actions.loadingUpdatedAction());
      const {
        userPhoto,
        firstName,
        middleName,
        lastName,
        dob,
        birthDistrict,
        birthPlace,
        dobBs,
        email,
        gender,
        province,
        district,
        palika,
        married,
        migrated,
        marriedDistrict,
        migratedDistrict,
        wardNumber,
        tole,
        citizenshipNumber,
        hasCitizenship,
        citizenshipIssuedFrom,
        citizenshipIssuedDate,
        fatherName,
        spouseName,
        mobileNumber,
        isRecommended,
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
      body.append("email", email);
      body.append("gender", gender);
      body.append("birthDistrict", birthDistrict);
      body.append("birthPlace", birthPlace);
      body.append("province", province);
      body.append("district", district);
      body.append("palika", palika);
      body.append("wardNumber", wardNumber);
      body.append("tole", tole);
      body.append("citizenshipNumber", citizenshipNumber);
      body.append("hasCitizenship", hasCitizenship);
      body.append("citizenshipIssuedFrom", citizenshipIssuedFrom);
      body.append("citizenshipIssuedDate", citizenshipIssuedDate);
      body.append("fatherName", fatherName);
      body.append("spouseName", spouseName);
      body.append("mobileNumber", mobileNumber);
      body.append("isRecommended", isRecommended);
      body.append("isConfirmed", isConfirmed);
      if (married) {
        body.append("marriedDistrict", marriedDistrict);
      }
      if (migrated) {
        body.append("migratedDistrict", migratedDistrict);
      }
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

      const response = await API.updateCard(id, body);
      if (type === "card") {
        dispatch(getParticularPage({ number: currentPage, postsPerPage }));
      } else {
        dispatch(
          getParticularPageVerify({ number: currentPage, postsPerPage })
        );
      }
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
  (id, remarks, currentPage, postsPerPage, types) => async (dispatch) => {
    try {
      const body = JSON.stringify({ remarks });

      const { data } = await API.rejectEntryPass(id, body);
      dispatch(actions.updatedCardSuccessAction(data));
      if (types === "verifyCard") {
        dispatch(
          getParticularPageVerify({
            number: currentPage,
            postsPerPage,
          })
        );
      } else {
        dispatch(getParticularPage({ number: currentPage, postsPerPage }));
      }
      successFunction("Pass Rejected ");
      return true;
    } catch (error) {
      dispatch(actions.updatedCardFailAction(error));
      errorFunction(error);
      return false;
    }
  };
export const verifyCardThunk =
  (id, values, currentPage, postsPerPage) => async (dispatch) => {
    try {
      dispatch(actions.loadingUpdatedAction());
      const { signature, userPhoto } = values;
      const body = new FormData();

      body.append("signature", signature);
      if (userPhoto !== "") {
        body.append("userPhoto", userPhoto);
      }
      body.append("signatureUpdating", true);
      const response = await API.verifyCard(id, body);
      dispatch(getParticularPage({ number: currentPage, postsPerPage }));

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
