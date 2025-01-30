import React from "react";
import Skeleton from "react-loading-skeleton";
const DetailSkeleton = () => {
  return (
    <>
      <div className="mt-1">
        <Skeleton count={5} height={30} />
      </div>
    </>
  );
};

export default DetailSkeleton;
