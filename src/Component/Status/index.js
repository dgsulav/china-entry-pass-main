import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillXCircleFill } from "react-icons/bs";
const index = ({ active }) => {
  return (
    <div>
      {active ? (
        <FaCheckCircle style={{ color: "green", fontSize: "15px" }} />
      ) : (
        <BsFillXCircleFill
          style={{
            color: "rgba(230, 16, 16, 0.979)",
            fontSize: "15px",
          }}
        />
      )}
    </div>
  );
};

export default index;
