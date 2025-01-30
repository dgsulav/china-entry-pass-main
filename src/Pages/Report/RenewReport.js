import React, { lazy, Suspense, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import RenewReportComponent from "./RenewReportComponent";
import { getOrganization } from "../../Redux/OrganizationSetup/thunk";

const ReportModal = lazy(() =>
  import("../../Component/ReportModal/RenewCard/ReportModal")
);
const PDFReportModal = lazy(() =>
  import("../../Component/ReportModal/RenewCard/PDFReportModal")
);
const ExcelReportModal = lazy(() =>
  import("../../Component/ReportModal/RenewCard/ExcelReportModal")
);

const RenewReportListing = () => {
  // props
  const dispatch = useDispatch();

  const { renewReports } = useSelector((state) => state.report);
  const [reportStartDate, setReportStartDate] = useState(new Date());
  const [reportEndDate, setReportEndDate] = useState(new Date());
  const [formData, setFormData] = useState(null);
  // purchase order report component state
  const [showReportModal, setShowReportModal] = useState(false);
  const [showPDFReportModal, setShowPDFReportModal] = useState(false);
  const [showExcelReportModal, setShowExcelReportModal] = useState(false);
  useEffect(() => {
    dispatch(getOrganization());
  }, []);

  return (
    <>
      <RenewReportComponent
        name="report"
        setShowExcelReportModal={setShowExcelReportModal}
        setShowPDFReportModal={setShowPDFReportModal}
        setShowReportModal={setShowReportModal}
        reportStartDate={reportStartDate}
        setReportStartDate={setReportStartDate}
        reportEndDate={reportEndDate}
        setReportEndDate={setReportEndDate}
        setFormData={setFormData}
      />

      {/* purchase order quick summary report */}
      <Suspense fallback={<div>Loading...</div>}>
        {showReportModal && renewReports?.length > 0 && (
          <ReportModal
            showReportModal={showReportModal}
            setShowReportModal={setShowReportModal}
            formData={formData}
            renewReports={renewReports}
          />
        )}
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        {showPDFReportModal && renewReports?.length > 0 && (
          <PDFReportModal
            showPDFReportModal={showPDFReportModal}
            setShowPDFReportModal={setShowPDFReportModal}
            formData={formData}
            renewReports={renewReports}
          />
        )}
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        {showExcelReportModal && renewReports?.length > 0 && (
          <ExcelReportModal
            showExcelReportModal={showExcelReportModal}
            setShowExcelReportModal={setShowExcelReportModal}
            formData={formData}
            renewReports={renewReports}
          />
        )}
      </Suspense>
    </>
  );
};

export default React.memo(RenewReportListing);
