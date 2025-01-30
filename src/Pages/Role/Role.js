import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getParticularPage,
  editRole,
  getPrevious,
  getNext,
} from "../../Redux/Role/thunk";
import Status from "../../Component/Status";
import Tooltip from "../../Component/Tooltip/Tooltip";

import PaginationBlock from "../../Component/PaginationBlock";
import NoData from "../../Component/NoData/";

const Role = ({
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

  const { permissions, isAdmin } = useSelector((state) => state.auth);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);

  const { roles, next, previous } = useSelector((state) => state.role);

  const dispatch = useDispatch();

  // for pagination
  const [pageNumberLimit] = useState(5);

  //change page
  const paginate = (number) => {
    dispatch(getParticularPage({ number, postsPerPage }));
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

  //pagination end

  //sorting end

  //edit function for the province
  const handleEdit = (id) => {
    dispatch(editRole(id));
    setShowModal(true);
  };
  const addPermission = isAdmin || isSuperuser;
  return (
    <>
      {roles?.length > 0 ? (
        <div className="mt-2">
          <div className="table-scrollable">
            <table className="table table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "8%" }}>
                    S.N
                  </th>
                  <th scope="col">Name</th>

                  <th scope="col">Status</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {roles?.length > 0 &&
                  roles.map((user, i) => {
                    const { id, name, email, isActive } = user;
                    return (
                      <tr key={id}>
                        <th scope="row" style={{ width: "8%" }}>
                          {postsPerPage * (currentPage - 1) + (i + 1)}
                        </th>
                        <td>{name}</td>

                        <td>
                          <Status active={isActive} />
                        </td>

                        <td>
                          {(isAdmin || isSuperuser) && (
                            <Tooltip content="Edit">
                              <button
                                className="btn btn-sm btn-edit btn-primary mx-1"
                                onClick={() => handleEdit(id)}
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

export default React.memo(Role);
