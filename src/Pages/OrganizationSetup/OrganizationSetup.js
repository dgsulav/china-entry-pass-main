import React, { useState } from "react";
import { FaEdit, FaFileSignature } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { editCardRequest } from "../../Redux/Card/thunk";

import PaginationBlock from "../../Component/PaginationBlock";
import NoData from "../../Component/NoData";
import Tooltip from "../../Component/Tooltip/Tooltip";
import { useHistory } from "react-router-dom";
import { updateOrganizationSetup } from "../../Redux/OrganizationSetup/thunk";
import { organizationSetupConstants } from "../../Redux/OrganizationSetup/constants";

const OrganizationSetup = ({
  currentPage,
  postsPerPage,

  search,
  showModal,
  setShowModal,
}) => {
  // props
  const group = useSelector((state) => state.auth.group);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const { organizationSetups } = useSelector(
    (state) => state.organizationSetup
  );

  const dispatch = useDispatch();

  //pagination end

  //edit function for the province
  const handleEdit = (id) => {
    dispatch({
      type: organizationSetupConstants.ORGANIZATION_SETUP_EDIT,
      payload: id,
    });
    setShowModal(true);
  };

  // "recommendationRequired": false,
  //         "canMinorApply": true,
  //         "otherLettersRequired": false,
  //         "newCardValidityYear": 1,
  //         "renewCardValidityYear": 1

  return (
    <>
      {organizationSetups?.length > 0 ? (
        <div className="mt-2">
          <div className="table-scrollable">
            <table className="table table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "8%" }}>
                    S.N
                  </th>

                  <th scope="col">Recommendation Required</th>
                  <th scope="col">Can Minor Apply</th>
                  <th scope="col">Other Letters Required</th>
                  <th scope="col">New Card Validity Year</th>
                  <th scope="col">Renew Card Validity Year</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {organizationSetups?.length > 0 &&
                  organizationSetups.map((detail, i) => {
                    const {
                      id,
                      recommendationRequired,
                      canMinorApply,
                      otherLettersRequired,
                      newCardValidityYear,
                      renewCardValidityYear,
                    } = detail;

                    return (
                      <tr key={id}>
                        <td className="fw-bold" style={{ width: "8%" }}>
                          {postsPerPage * (currentPage - 1) + (i + 1)}{" "}
                        </td>

                        <td>{recommendationRequired ? "Yes" : "No"}</td>
                        <td>{canMinorApply ? "Yes" : "No"}</td>
                        <td>{otherLettersRequired ? "Yes" : "No"}</td>
                        <td>{newCardValidityYear}</td>
                        <td>{renewCardValidityYear}</td>

                        <td>
                          {(isAdmin || isSuperuser) && (
                            <Tooltip content="Edit">
                              <button
                                onClick={() => handleEdit(id)}
                                className="btn btn-sm btn-edit btn-primary mx-2"
                              >
                                <FaEdit />
                              </button>
                            </Tooltip>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/* {count > 0 && (
            <PaginationBlock
              currentPage={currentPage}
              postsPerPage={postsPerPage}
              count={count}
              paginate={paginate}
              handleClick={handleClick}
              setCurrentPage={setCurrentPage}
              minPageNumberLimit={minPageNumberLimit}
              maxPageNumberLimit={maxPageNumberLimit}
            />
          )} */}
        </div>
      ) : (
        <NoData
          search={search}
          onClick={() => setShowModal(true)}
          addPermission={isAdmin || isSuperuser}
        />
      )}
    </>
  );
};

export default OrganizationSetup;
