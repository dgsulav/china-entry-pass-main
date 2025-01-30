import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FileSaver from "file-saver";
import XLSX from "xlsx";
const ExcelReportModal = ({ formData }) => {
  const renewReports = useSelector((state) => state.report.renewReports);
  useEffect(() => {
    const updatedData = renewReports.map((record) => {
      const { card_no, name, validity, citizenship_number, branch } = record;
      return {
        card_no,
        name,
        validity,
        citizenship_number,
        branch: branch?.name,
      };
    });
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const Heading = [
      {
        card_no: "Card Number",
        name: "Name",
        validity: "Validity",
        citizenship_number: "Citizenship Number",
        branch: "Branch",
      },
    ];

    const ws = XLSX.utils.json_to_sheet(Heading, {
      header: ["card_no", "name", "validity", "citizenship_number", "branch"],
      skipHeader: true,
      origin: 0, //ok
    });
    // ws["!cols"] = wscols;
    XLSX.utils.sheet_add_json(ws, updatedData, {
      header: ["card_no", "name", "validity", "citizenship_number", "branch"],
      skipHeader: true,
      origin: -1, //ok
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "debit card " + fileExtension);
  }, [renewReports]);

  return <></>;
};

export default ExcelReportModal;
