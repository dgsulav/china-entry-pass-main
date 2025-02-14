import * as API from "./api";
import * as actions from "./actions";
import { errorFunction, successFunction } from "../../Component/Alert";
//get  Bank
export const getReprintCardApproved = (postsPerPage) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getReprintCardApproved(postsPerPage);
    dispatch(actions.getReprintCardApprovedSuccessAction(data));
  } catch (error) {
    dispatch(actions.getReprintCardApprovedFailAction(error));
    errorFunction(error);
  }
};
// get all bank
export const getAllReprintCardApproved = () => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getAllReprintCardApproved();
    dispatch(actions.getReprintCardApprovedSuccessAction(data));
  } catch (error) {
    dispatch(actions.getReprintCardApprovedFailAction(error));
    errorFunction(error);
  }
};
//get previous  page
export const getPrevious = (previous) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getPrevious(previous);
    dispatch(actions.getReprintCardApprovedSuccessAction(data));
  } catch (error) {
    dispatch(actions.getReprintCardApprovedFailAction(error));
    errorFunction(error);
  }
};
//get next  page
export const getNext = (next) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getNext(next);
    dispatch(actions.getReprintCardApprovedSuccessAction(data));
  } catch (error) {
    dispatch(actions.getReprintCardApprovedFailAction(error));
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
      dispatch(actions.getReprintCardApprovedSuccessAction(data));
    } catch (error) {
      dispatch(actions.getReprintCardApprovedFailAction(error));
      errorFunction(error);
    }
  };

//handle Search
export const handleSearch = (search, postsPerPage) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.handleSearch(search, postsPerPage);
    dispatch(actions.getReprintCardApprovedSuccessAction(data));
  } catch (error) {
    dispatch(actions.getReprintCardApprovedFailAction(error));
    errorFunction(error);
  }
};
//get particular page
export const generateCardNumber =
  (id, number, postsPerPage) => async (dispatch) => {
    try {
      dispatch(actions.loadingAction());
      const body = JSON.stringify({ status: "printed" });
      const { data } = await API.generateCardNumber(id, body);
      dispatch(getParticularPage({ number, postsPerPage }));
      dispatch(actions.getReprintCardApprovedSuccessAction(data));
      successFunction("Card Number Generated now you can print.");
    } catch (error) {
      dispatch(actions.getReprintCardApprovedFailAction(error));
      errorFunction(error);
    }
  };

export const printCard = (body) => async (dispatch) => {
  console.log(body);
  const {
    id,
    fullName,
    fatherName,
    dobBs,
    cardExpiryDate,
    district,
    palika,
    wardNumber,
    gender,
    office,
    signature,
    approvedBy,
    cardIssueDate,
    birthPlace,
    cardNumber,
    cardId,
    submissionNumber,
    base64UserPhoto,
    uniqueSlug,
  } = body;

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const printBody = {
    masterId: id,
    name: fullName,
    fatherName,
    dateOfBirth: dobBs,
    cardExpiryDate,
    birthPlace: birthPlace?.name,
    district: district.name,
    localLevel: palika.name,
    wardNo: wardNumber,
    issueOffice: office.name,
    cardHolderSignature: signature.split(",")[1],
    officerName: approvedBy.name,
    gender: gender,
    designation: approvedBy?.designation,
    issueDate: cardIssueDate,
    issuerSignature: approvedBy && approvedBy?.signature.split(",")[1],
    cardNo: cardNumber,
    slug: uniqueSlug,
    cardId: cardId,
    submissionNumber: submissionNumber,
    cardHolderPhoto: base64UserPhoto,
    accessToken,
    refreshToken,
  };

  try {
    dispatch(actions.loadingPrintAction());
    const { data } = await API.printCard(printBody);
    dispatch(actions.getCardPrintApprovedSuccessAction(data));
    return data;
  } catch (error) {
    dispatch(actions.getCardPrintApprovedFailAction(error));
    errorFunction(error.message);
    return error;
  }
};
export const confirmPrint = (id) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.confirmPrint(id);
    dispatch(actions.getCardPrintedSuccessAction(data));
    return true;
  } catch (error) {
    dispatch(actions.getCardPrintedFailAction(error));
    errorFunction(error);
    return false;
  }
};
