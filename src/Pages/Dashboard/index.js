import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { FaPrint, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import pending from "../../../src/assets/icons/ic_round-pending-actions.png";
import approve from "../../../src/assets/icons/iconamoon_discount-light.png";
import renew from "../../../src/assets/icons/material-symbols_autorenew-rounded.png";
import verify from "../../../src/assets/icons/material-symbols_order-approve-outline-rounded.png";
import DashboardSkeleton from "../../Component/Skeleton/DashboardSkeleton";
import { getDashboardUrl } from "../../Redux/Dashboard/thunk";
import "./index.css";
const DashboardListing = () => {
  const history = useHistory();

  const totalData = useSelector((state) => state.dashboard.totalData);
  const todayData = useSelector((state) => state.dashboard.todayData);
  const monthlyData = useSelector((state) => state.dashboard.monthlyData);
  const monthData = useSelector((state) => state.dashboard.monthData);
  const loading = useSelector((state) => state.dashboard.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardUrl());
  }, []);

  const colors = ["#d7a5a5", "#ff8c4e", "#6ba8ff", "#d14e4e", "#008000"];

  const [graphSeries, setGraphSeries] = useState([]);
  const [graphSeriesReprint, setGraphSeriesReprint] = useState([]);
  const [graphOptions, setGraphOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    legend: { position: "top" },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
    },
    yaxis: {},
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    colors: colors,
  });

  const [pieSeries, setPieSeries] = useState([0, 0, 0, 0]);
  const [pieSeriesReprint, setPieSeriesReprint] = useState([0, 0, 0, 0]);
  const [pieOptions, setPieOptions] = useState({
    chart: {
      type: "donut",
      class: "my-custom-chart",
    },
    legend: {
      position: "top",
      formatter: function (seriesName, opts) {
        return seriesName + ": " + opts.w.globals.series[opts.seriesIndex];
      },
      offsetY: 0,
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        radius: 12,
      },
    },
    stroke: {
      width: 0, // This line removes the gap between the ring items
    },
    dataLabels: {
      enabled: false,
    },
    colors: colors,
    labels: ["Pending", "Verified", "Approved", "Rejected", "Printed"],
  });

  useEffect(() => {
    if (monthData !== null) {
      setPieSeries([
        monthData?.new?.pending,
        monthData?.new?.verified,
        monthData?.new?.approved,
        monthData?.new?.rejected,
        monthData?.new?.printed,
      ]);
      setPieSeriesReprint([
        monthData?.reprint?.pending,
        monthData?.reprint?.verified,
        monthData?.reprint?.approved,
        monthData?.reprint?.rejected,
        monthData?.reprint?.printed,
      ]);
    }
    if (monthlyData !== null) {
      setGraphSeries([
        { name: "Pending", data: monthlyData?.new?.pending },
        { name: "Approved", data: monthlyData?.new?.approved },
        { name: "Verified", data: monthlyData?.new?.verified },
        { name: "Rejected", data: monthlyData?.new?.rejected },
        { name: "Printed", data: monthlyData?.new?.printed },
      ]);
      setGraphSeriesReprint([
        { name: "Pending", data: monthlyData?.reprint?.pending },
        { name: "Approved", data: monthlyData?.reprint?.approved },
        { name: "Verified", data: monthlyData?.reprint?.verified },
        { name: "Rejected", data: monthlyData?.reprint?.rejected },
        { name: "Printed", data: monthlyData?.reprint?.printed },
      ]);
    }
  }, [monthlyData, monthData]);

  return (
    <>
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <div className="banner row">
            <div className="px-3 mb-3 col-12 col-sm-12 col-md-4 col-lg-3">
              <div className="dashboard-card w-100">
                <Link to="/entry-pass-request">
                  <div className="dashboard-card-main w-100">
                    <div className="card-header justify-content-center">
                      <h4>New Application</h4>
                    </div>
                    <div className="total-pending">
                      Total Card Request:{" "}
                      {totalData ? totalData?.new?.pending : 0}
                    </div>
                    <div className="today-pending">
                      Today's Card Request:{" "}
                      <span>{todayData ? todayData?.new?.pending : 0}</span>
                    </div>
                    <div className="icon">
                      <img src={pending} alt="pending" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="px-3 mb-3 col-12 col-sm-12 col-md-4 col-lg-3">
              <div className="dashboard-card w-100">
                <Link to="/entry-pass-verify">
                  <div className="dashboard-card-main w-100">
                    <div className="card-header justify-content-center">
                      <h4>New Application Verified</h4>
                    </div>
                    <div className="total-pending">
                      Total Card Verified:{" "}
                      {totalData ? totalData?.new?.verified : 0}
                    </div>
                    <div className="today-pending">
                      Today's Card Verified:{" "}
                      <span>{todayData ? todayData?.new?.verified : 0}</span>
                    </div>
                    <div className="icon">
                      <img src={verify} alt="verify" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="px-3 mb-3 col-12 col-sm-12 col-md-4 col-lg-3">
              <div className="dashboard-card w-100">
                <Link to="/entry-pass-approve">
                  <div className="dashboard-card-main w-100">
                    <div className="card-header justify-content-center">
                      <h4>New Application Approved</h4>
                    </div>
                    <div className="total-pending">
                      Total Card Approved:{" "}
                      {totalData ? totalData?.new?.approved : 0}
                    </div>
                    <div className="today-pending">
                      Today's Card Approved:{" "}
                      <span>{todayData ? todayData?.new?.approved : 0}</span>
                    </div>
                    <div className="icon">
                      <img src={approve} alt="approve" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="px-3 mb-3 col-12 col-sm-12 col-md-4 col-lg-3">
              <div className="dashboard-card w-100">
                <Link to="/rejected-card">
                  <div className="dashboard-card-main w-100">
                    <div className="card-header justify-content-center">
                      <h4>New Application Rejected</h4>
                    </div>
                    <div className="total-pending">
                      Total Card Rejected:{" "}
                      {totalData ? totalData?.new?.rejected : 0}
                    </div>
                    <div className="today-pending">
                      Today's Card Rejected:{" "}
                      <span>{todayData ? todayData?.new?.rejected : 0}</span>
                    </div>
                    <div className="icon">
                      <FaTimes size={22} style={{ color: "#2c51a4" }} />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="banner row">
            <div className=" col-12 col-sm-12 col-md-4 col-lg-3 px-3 mb-3">
              <div className="dashboard-card w-100">
                <Link to="/entry-pass-printed">
                  <div className="dashboard-card-main w-100">
                    <div className="card-header justify-content-center">
                      <h4>New Application Printed</h4>
                    </div>
                    <div className="total-pending">
                      Total Card Printed:{" "}
                      {totalData ? totalData.new?.pending : 0}
                    </div>
                    <div className="today-pending">
                      Today's Card Printed:{" "}
                      <span>{todayData ? todayData?.new?.printed : 0}</span>
                    </div>
                    <div className="icon">
                      <FaPrint size={22} style={{ color: "#2c51a4" }} />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="px-3 mb-3 col-12 col-sm-12 col-md-4 col-lg-3">
              <div className="dashboard-card w-100">
                <Link to="/reprint">
                  <div className="dashboard-card-main w-100">
                    <div className="card-header justify-content-center">
                      <h4>Reprint Card Request</h4>
                    </div>
                    <div className="total-pending">
                      Total Reprint Request:{" "}
                      {totalData ? totalData.reprint?.verified : 0}
                    </div>
                    <div className="today-pending">
                      Today's Reprint Request:{" "}
                      <span>
                        {todayData ? todayData?.reprint?.verified : 0}
                      </span>
                    </div>
                    <div className="icon">
                      <img src={verify} alt="verify" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="px-3 mb-3 col-12 col-sm-12 col-md-4 col-lg-3">
              <div className="dashboard-card w-100">
                <Link to="/approved-reprint">
                  <div className="dashboard-card-main w-100">
                    <div className="card-header justify-content-center">
                      <h4>Reprint Card Approved</h4>
                    </div>
                    <div className="total-pending">
                      Total Reprint Approved:{" "}
                      {totalData ? totalData.reprint?.approved : 0}
                    </div>
                    <div className="today-pending">
                      Today's Reprint Approved:{" "}
                      <span>
                        {todayData ? todayData?.reprint?.approved : 0}
                      </span>
                    </div>
                    <div className="icon">
                      <img src={approve} alt="approve" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="px-3 mb-3 col-12 col-sm-12 col-md-4 col-lg-3">
              <div className="dashboard-card w-100">
                <Link to="/reprint-printed">
                  <div className="dashboard-card-main w-100">
                    <div className="card-header justify-content-center">
                      <h4>Reprint Card Printed</h4>
                    </div>
                    <div className="total-pending">
                      Total Reprint Printed:{" "}
                      {totalData ? totalData.reprint.printed : 0}
                    </div>
                    <div className="today-pending">
                      Today's Reprint Printed:{" "}
                      <span>{todayData ? todayData?.reprint.printed : 0}</span>
                    </div>
                    <div className="icon">
                      <FaPrint size={22} style={{ color: "#2c51a4" }} />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="row m-0 p-0">
            {/*bar graph*/}
            <div className="mb-2 col-12 col-md-6 col-xl-7">
              <div className="card p-4">
                <div id="chart">
                  <h5 className="font-weight-bold">New Application</h5>
                  <ReactApexChart
                    options={graphOptions}
                    series={graphSeries}
                    type="bar"
                    height={300}
                    width={"100%"}
                  />
                </div>
                <div id="html-dist"></div>
              </div>
            </div>

            {/* pie chart */}
            <div className="mb-2 col-12 col-md-6 col-xl-5">
              <div className="card p-4">
                <div className="d-flex justify-content-between">
                  <h5 className="m-0 font-weight-bold">
                    New Application (This Month)
                  </h5>
                </div>
                <div className="d-flex mt-4 flex-row-reverse">
                  <div id="chart" className="flex-grow-1">
                    <ReactApexChart
                      options={pieOptions}
                      series={pieSeries}
                      type="donut"
                      width={"100%"}
                      height={290}
                    />
                  </div>
                  <div id="html-dist"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="row m-0 p-0">
            <div className="mb-3 col-12 col-md-6 col-xl-7">
              <div className="card p-4">
                <div id="chart">
                  <h5 className="font-weight-bold">Reprint</h5>
                  <ReactApexChart
                    options={graphOptions}
                    series={graphSeriesReprint}
                    type="bar"
                    height={300}
                    width={"100%"}
                  />
                </div>
                <div id="html-dist"></div>
              </div>
            </div>
            <div className="mb-3 col-12 col-md-6 col-xl-5">
              <div className="card p-4">
                <div className="d-flex justify-content-between">
                  <h5 className="m-0 font-weight-bold">Reprint (This Month)</h5>
                </div>
                <div className="d-flex mt-4 flex-row-reverse">
                  <div id="chart" className="flex-grow-1">
                    <ReactApexChart
                      options={pieOptions}
                      series={pieSeriesReprint}
                      type="donut"
                      width={"100%"}
                      height={290}
                    />
                  </div>
                </div>
                <div id="html-dist"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default DashboardListing;
