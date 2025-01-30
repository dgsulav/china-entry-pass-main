import React, { lazy, Suspense, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import ReprintReportComponent from "./ReprintReportComponent";
import { getOrganization } from "../../Redux/OrganizationSetup/thunk";

const ReportModal = lazy(() =>
  import("../../Component/ReportModal/ReprintCard/ReportModal")
);
const PDFReportModal = lazy(() =>
  import("../../Component/ReportModal/ReprintCard/PDFReportModal")
);
const ExcelReportModal = lazy(() =>
  import("../../Component/ReportModal/ReprintCard/ExcelReportModal")
);

const ReprintReportListing = () => {
  // props
  const dispatch = useDispatch();

  const { reprintReports } = useSelector((state) => state.report);
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
      <ReprintReportComponent
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
        {showReportModal && reprintReports?.length > 0 && (
          <ReportModal
            showReportModal={showReportModal}
            setShowReportModal={setShowReportModal}
            formData={formData}
            reprintReports={reprintReports}
          />
        )}
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        {showPDFReportModal && reprintReports?.length > 0 && (
          <PDFReportModal
            showPDFReportModal={showPDFReportModal}
            setShowPDFReportModal={setShowPDFReportModal}
            formData={formData}
            reprintReports={reprintReports}
          />
        )}
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        {showExcelReportModal && reprintReports?.length > 0 && (
          <ExcelReportModal
            showExcelReportModal={showExcelReportModal}
            setShowExcelReportModal={setShowExcelReportModal}
            formData={formData}
            reprintReports={reprintReports}
          />
        )}
      </Suspense>
    </>
  );
};

export default React.memo(ReprintReportListing);
