import * as API from "./api";
import * as actions from "./actions";
import { errorFunction, successFunction } from "../../Component/Alert";
//get  Bank
export const getApprovedCard = (postsPerPage) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getApprovedCard(postsPerPage);
    dispatch(actions.getApprovedCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getApprovedCardFailAction(error));
    errorFunction(error);
  }
};
// get all bank
export const getAllApprovedCard = () => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getAllApprovedCard();
    dispatch(actions.getApprovedCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getApprovedCardFailAction(error));
    errorFunction(error);
  }
};
//get previous  page
export const getPrevious = (previous) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getPrevious(previous);
    dispatch(actions.getApprovedCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getApprovedCardFailAction(error));
    errorFunction(error);
  }
};
//get next  page
export const getNext = (next) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getNext(next);
    dispatch(actions.getApprovedCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getApprovedCardFailAction(error));
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
      dispatch(actions.getApprovedCardSuccessAction(data));
    } catch (error) {
      dispatch(actions.getApprovedCardFailAction(error));
      errorFunction(error);
    }
  };

//handle Search
export const handleSearch = (search, postsPerPage) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.handleSearch(search, postsPerPage);
    dispatch(actions.getApprovedCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getApprovedCardFailAction(error));
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
      dispatch(actions.getApprovedCardSuccessAction(data));
      successFunction("Card Number Generated now you can print.");
    } catch (error) {
      dispatch(actions.getApprovedCardFailAction(error));
      errorFunction(error);
    }
  };

export const printCard = (body) => async (dispatch) => {
  const {
    id,
    fullName,
    dobBs,
    cardExpiryDate,
    fatherName,
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
    slug: uniqueSlug,
    designation: approvedBy?.designation,
    issueDate: cardIssueDate,
    issuerSignature: approvedBy && approvedBy?.signature.split(",")[1],
    cardNo: cardNumber,
    cardId: cardId,
    submissionNumber: submissionNumber,
    cardHolderPhoto: base64UserPhoto,
    accessToken,
    refreshToken,
  };

  try {
    dispatch(actions.loadingPrint());
    const { data } = await API.printCard(printBody);
    dispatch(actions.getCardPrintSuccessAction(data));
    return data;
  } catch (error) {
    dispatch(actions.getCardPrintFailAction(error));
    errorFunction(error);
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
