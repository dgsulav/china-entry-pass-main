import Skeleton from "react-loading-skeleton";

export default function DashboardSkeleton() {
  return (
    <>
      {/* Row 1 */}
      <div className="row mt-4">
        <div className="col-3 px-3 mb-3">
          <Skeleton height={150} style={{ borderRadius: "10px" }} />
        </div>
        <div className="col-3 px-3 mb-3 ">
          <Skeleton height={150} style={{ borderRadius: "10px" }} />
        </div>
        <div className="col-3 px-3 mb-3 ">
          <Skeleton height={150} style={{ borderRadius: "10px" }} />
        </div>
        <div className="col-3 px-3 mb-3 ">
          <Skeleton height={150} style={{ borderRadius: "10px" }} />
        </div>
      </div>

      {/* Row 2 */}
      <div className="row mt-4">
        <div className="col-3 px-3 mb-3">
          <Skeleton height={150} style={{ borderRadius: "10px" }} />
        </div>
        <div className="col-3 px-3 mb-3 ">
          <Skeleton height={150} style={{ borderRadius: "10px" }} />
        </div>
        <div className="col-3 px-3 mb-3 ">
          <Skeleton height={150} style={{ borderRadius: "10px" }} />
        </div>
        <div className="col-3 px-3 mb-3 ">
          <Skeleton height={150} style={{ borderRadius: "10px" }} />
        </div>
      </div>

      {/* Row 3 */}
      <div className="row mt-4 px-3 d-flex" style={{ gap: "20px" }}>
        <div className=" mb-3" style={{ width: "65%" }}>
          <Skeleton height={350} style={{ borderRadius: "10px" }} />
        </div>
        <div className="mb-3 " style={{ width: "33%" }}>
          <Skeleton height={350} style={{ borderRadius: "10px" }} />
        </div>
      </div>

      {/* Row 4 */}
      <div className="row mt-4 px-3 d-flex" style={{ gap: "20px" }}>
        <div className=" mb-3" style={{ width: "65%" }}>
          <Skeleton height={350} style={{ borderRadius: "10px" }} />
        </div>
        <div className="mb-3 " style={{ width: "33%" }}>
          <Skeleton height={350} style={{ borderRadius: "10px" }} />
        </div>
      </div>
    </>
  );
}
