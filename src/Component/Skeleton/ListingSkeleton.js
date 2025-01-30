import React from "react";
import Skeleton from "react-loading-skeleton";
const ListingSkeleton = () => {
  return (
    <div className=" w-100 ">
      <div className="row ">
        <div className="col-6 d-flex ">
          <Skeleton width={200} height={25} />
        </div>
        <div className="col-6 d-flex justify-content-end">
          <Skeleton width={80} height={30} />
        </div>
      </div>

      <div className="mt-2">
        <Skeleton height={40} />
        <Skeleton count={10} height={25} />
      </div>
      <div className="row d-flex mt-2">
        <div className="col-6">
          <Skeleton width={220} height={20} />
        </div>
        <div className="col-6 d-flex justify-content-end">
          <Skeleton width={200} height={30} />
        </div>
      </div>
    </div>
  );
};

export default ListingSkeleton;
