import React, { lazy, Suspense, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import NewCardReportComponent from "./NewCardReportComponent";
import { getOrganization } from "../../Redux/OrganizationSetup/thunk";

const ReportModal = lazy(() =>
  import("../../Component/ReportModal/NewCard/ReportModal")
);
const PDFReportModal = lazy(() =>
  import("../../Component/ReportModal/NewCard/PDFReportModal")
);
const ExcelReportModal = lazy(() =>
  import("../../Component/ReportModal/NewCard/ExcelReportModal")
);

const NewCardReportListing = () => {
  const dispatch = useDispatch();
  // props

  const cards = useSelector((state) => state.report.cards);
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
      <NewCardReportComponent
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
        {showReportModal && cards?.length > 0 && (
          <ReportModal
            showReportModal={showReportModal}
            setShowReportModal={setShowReportModal}
            formData={formData}
            cards={cards}
          />
        )}
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        {showPDFReportModal && cards?.length > 0 && (
          <PDFReportModal
            showPDFReportModal={showPDFReportModal}
            setShowPDFReportModal={setShowPDFReportModal}
            formData={formData}
            cards={cards}
          />
        )}
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        {showExcelReportModal && cards?.length > 0 && (
          <ExcelReportModal
            showExcelReportModal={showExcelReportModal}
            setShowExcelReportModal={setShowExcelReportModal}
            formData={formData}
            cards={cards}
          />
        )}
      </Suspense>
    </>
  );
};

export default React.memo(NewCardReportListing);
