import React from "react";
import Skeleton from "react-loading-skeleton";
const ChartSkeleton = () => {
  return (
    <>
      <div className="m-1">
        <Skeleton count={2} height={285} />
      </div>
    </>
  );
};

export default ChartSkeleton;
