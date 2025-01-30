import React from "react";
import Skeleton from "react-loading-skeleton";
const CreditSkeleton = () => {
  return (
    <>
      <div className="row mt-4">
        <div className="col-4">
          <Skeleton width={300} height={150} />
        </div>
        <div className="col-4 ">
          <Skeleton width={300} height={150} />
        </div>
        <div className="col-4 ">
          <Skeleton width={300} height={150} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-4">
          <Skeleton width={300} height={150} />
        </div>
        <div className="col-4 ">
          <Skeleton width={300} height={150} />
        </div>
        <div className="col-4 ">
          <Skeleton width={300} height={150} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-4">
          <Skeleton width={300} height={150} />
        </div>
        <div className="col-4 ">
          <Skeleton width={300} height={150} />
        </div>
        <div className="col-4 ">
          <Skeleton width={300} height={150} />
        </div>
      </div>
    </>
  );
};

export default CreditSkeleton;
