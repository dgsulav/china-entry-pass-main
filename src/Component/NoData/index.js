import React from "react";
import { FaPlus } from "react-icons/fa";
import Tooltip from "../Tooltip/Tooltip";

const index = ({ search, onClick, addPermission }) => {
  
  return (
    <div className="card w-50 p-5 text-center justify-content-center no-data">
      <h4 className="fw-normal mb-3">No data to Display</h4>
      {!search && addPermission && (
        <h6>
          Please Add Data <br />
          <Tooltip content="Add">
            <button
              onClick={onClick}
              className="btn btn-primary btn-md mx-2 px-3 py-1 mt-3"
            >
              <FaPlus className="nodata-icon" size={20} /> Add
            </button>
          </Tooltip>{" "}
        </h6>
      )}
    </div>
  );
};

export default index;
