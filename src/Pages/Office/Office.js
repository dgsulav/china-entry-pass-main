import React, { useState } from "react";
import { FaEdit, FaFileSignature } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import Status from "../../Component/Status";

import PaginationBlock from "../../Component/PaginationBlock";
import NoData from "../../Component/NoData";
import Tooltip from "../../Component/Tooltip/Tooltip";

import { officeConstants } from "../../Redux/Office/constants";
import {
  getNext,
  getParticularOffice,
  getPrevious,
} from "../../Redux/Office/thunk";

const Office = ({
  currentPage,
  postsPerPage,
  setCurrentPage,
  count,
  setShowModal,
  maxPageNumberLimit,
  setMaxPageNumberLimit,
  minPageNumberLimit,
  setMinPageNumberLimit,
  search,
}) => {
  // props

  const permissions = useSelector((state) => state.auth.permissions);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const { previous, next } = useSelector((state) => state.office);

  const offices = useSelector((state) => state.office.offices);

  const dispatch = useDispatch();

  // for pagination
  const [pageNumberLimit] = useState(5);

  //change page
  const paginate = (number) => {
    dispatch(getParticularOffice({ number, postsPerPage }));
    setCurrentPage(number);
  };

  //handle Click
  const handleClick = (type) => {
    if (type === "previous") {
      dispatch(getPrevious(previous));
      setCurrentPage((prevState) => prevState - 1);
      if ((currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    } else if (type === "next") {
      dispatch(getNext(next));
      setCurrentPage((prevState) => prevState + 1);
      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    }
  };

  //edit function for the province
  const handleEdit = (id) => {
    dispatch({
      type: officeConstants.EDIT_OFFICE,
      payload: id,
    });
    setShowModal(true);
  };

  const addPermission =
    permissions?.includes("can_create_office" || "can_update_office") ||
    isAdmin ||
    isSuperuser;

  return (
    <>
      {offices?.length > 0 ? (
        <div className="mt-2 d-flex flex-column justify-content-between">
          <div className="table-scrollable">
            <table className="table table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "2%" }}>
                    S.N
                  </th>

                  <th scope="col" className="text-left">
                    Name
                  </th>
                  <th scope="col">Active</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {offices?.length > 0 &&
                  offices.map((detail, i) => {
                    const { id, name, isActive } = detail;

                    return (
                      <tr key={id}>
                        <td className="fw-bold" style={{ width: "2%" }}>
                          {postsPerPage * (currentPage - 1) + (i + 1)}{" "}
                        </td>

                        <td className="text-left">{name}</td>
                        <td>
                          <Status active={isActive} />
                        </td>

                        <td>
                          {addPermission && (
                            <Tooltip content="Edit">
                              <button
                                onClick={() => handleEdit(id)}
                                className="btn btn-md btn-edit btn-primary"
                              >
                                <FaEdit size={16} />
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
          {count > 0 && (
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
          )}
        </div>
      ) : (
        <NoData
          search={search}
          onClick={() => setShowModal(true)}
          addPermission={addPermission}
        />
      )}
    </>
  );
};

export default Office;
