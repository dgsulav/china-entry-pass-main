import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const ProfileSkeleton = () => {
  return (
    <>
      <div className="row m-1 ">
        <div
          className="col-4 p-1 "
          style={{
            border: "5px solid #f2f2f2",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <Skeleton count={1} height={80} />
          {/* <SkeletonTheme color="#484E57" highlightColor="#444"> */}
          <div
            className="text-center"
            style={{ position: "absolute", top: "45px", left: "135px" }}
          >
            <Skeleton circle={true} height={70} width={70} />
          </div>
          {/* </SkeletonTheme> */}

          <div className="text-center mt-5">
            <Skeleton count={1} height={10} width={100} />
          </div>
          <div className="text-center mt-2">
            <Skeleton count={1} height={10} width={150} />
          </div>
          <div className="text-center mt-2">
            <Skeleton count={1} height={10} width={100} />
          </div>
          <div className="text-center mt-2">
            <Skeleton count={1} height={10} width={100} />
          </div>
        </div>
        <div className="col"></div>
        <div
          className="col-7 p-1"
          style={{
            border: "5px solid #f2f2f2",
            borderRadius: "10px",
          }}
        >
          <Skeleton count={1} height={10} width={100} />
          <Skeleton count={1} height={2} />
          <div className="row">
            <div className="col">
              <Skeleton count={1} height={10} width={80} />
              <Skeleton count={1} height={40} />
            </div>
            <div className="col">
              <Skeleton count={1} height={10} width={80} />
              <Skeleton count={1} height={40} />
            </div>
            <div className="col">
              <Skeleton count={1} height={10} width={80} />
              <Skeleton count={1} height={40} />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <Skeleton count={1} height={10} width={80} />
              <Skeleton count={1} height={40} />
            </div>
            <div className="col">
              <Skeleton count={1} height={10} width={80} />
              <Skeleton count={1} height={40} />
            </div>
            <div className="col">
              <Skeleton count={1} height={10} width={80} />
              <Skeleton count={1} height={40} />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <Skeleton count={1} height={10} width={80} />
              <Skeleton count={1} height={40} />
            </div>
            <div className="col">
              <Skeleton count={1} height={10} width={80} />
              <Skeleton count={1} height={40} />
            </div>
            <div className="col">
              <Skeleton count={1} height={10} width={80} />
              <Skeleton count={1} height={40} />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <Skeleton count={1} height={10} width={80} />
              <Skeleton count={1} height={40} />
            </div>
            <div className="col">
              <Skeleton count={1} height={10} width={80} />
              <Skeleton count={1} height={40} />
            </div>
            <div className="col ">
              <Skeleton count={1} height={10} width={80} />
              <Skeleton count={1} height={40} />
            </div>
            <div className="text-center mt-2 mb-1">
              <Skeleton count={1} height={40} width={100} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSkeleton;
