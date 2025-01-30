import React from "react";

const DisplayEntries = ({ offset, limit, count }) => {
  return(
    <React.Fragment>
      <p>
        Showing {offset} to{" "}
        {limit > count ? count : limit === 0 ? count : limit} of {count} entries
      </p>  
    </React.Fragment> 
  );
};

export default React.memo(DisplayEntries);