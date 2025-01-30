import React from "react";

const Thumb = ({ thumb, height, width, onClick }) => {
  return (
    <img
      src={thumb}
      alt={thumb}
      className="img-thumbnail mt-1"
      height={height ? height : 70}
      width={width ? width : 70}
      onClick={onClick}
    />
  );
};

export default Thumb;
