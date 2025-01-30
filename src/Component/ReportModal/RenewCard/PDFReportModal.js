import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../assets/nepal-government.png";

const cambria =
  require("../../../assets/Fonts/Cambria-Font-For-Windows.ttf").default;

const PDFReportModal = ({ formData }) => {
  const { status } = formData;

  const organization = useSelector(
    (state) => state.organizationSetup.organization
  );
  const renewReports = useSelector((state) => state.report.renewReports);
  const userName = useSelector((state) => state.auth.username);

  useEffect(() => {
    if (renewReports.length > 0) {
      const { name, address, logo } = organization;

      const unit = "mm";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait";
      const doc = new jsPDF(orientation, unit, size);
      //
      const currentDate = `Printed Date/Time: ${new Date().toLocaleString(
        "ja-JP"
      )}`;
      const cardTitle = "Renew Card Report";
      const cardType = `Card Type: ${status}`;
      const printedBy = `Printed By: ${userName}`;
      const title1 = `Government of Nepal`;
      const title2 = `Ministry of Home Affairs`;
      const title3 = `Immigration Office, Kalikasthan`;
      const title4 = `China Entry/Exit Pass Report`;

      const footer =
        "This is computer genereated report no need of seal and verification";

      const table = document.getElementById("table");
      const totalPagesExp = "{total_pages_count_string}";
      autoTable(doc, {
        theme: "grid",
        html: table,
        styles: { textColor: [0, 0, 0], lineWidth: 0.1, fontSize: 7 },
        columnStyles: {
          0: { halign: "center" },
        },
        headStyles: {
          fillColor: [255, 255, 255],
        },
        startY: 45,
        didDrawPage: function (data) {
          //   doc.setLineWidth(0, 160);
          doc.setFont(cambria, "normal");

          doc.setFontSize(11);
          if (data.pageNumber === 1) {
            doc.setFontSize(11);
            doc.setTextColor("#DF2118");
            const pageWidth = doc.internal.pageSize.getWidth();
            const title0Width = doc.getTextWidth(cardTitle); // Get the width of your text
            const title1Width = doc.getTextWidth(title1); // Get the width of your text
            const title2Width = doc.getTextWidth(title2); // Get the width of your text
            const title3Width = doc.getTextWidth(title3); // Get the width of your text
            const title4Width = doc.getTextWidth(title4); // Get the width of your text

            // Calculate the x-coordinate to center the text
            const textTitle0 = (pageWidth - title0Width) / 2;
            const textTitle1 = (pageWidth - title1Width) / 2;

            const textTitle2 = (pageWidth - title2Width) / 2;
            const textTitle3 = (pageWidth - title3Width) / 2;
            const textTitle4 = (pageWidth - title4Width) / 2;
            let yPos = 12;
            doc.addImage(logo, "PNG", 18, 11, 20, 0);
            doc.text(cardTitle, textTitle0, yPos);
            yPos = yPos + 5;
            doc.text(title1, textTitle1, yPos);
            yPos = yPos + 5;
            doc.text(title2, textTitle2, yPos);
            yPos = yPos + 5;
            doc.text(title3, textTitle3, yPos);
            yPos = yPos + 5;
            doc.text(title4, textTitle4, yPos);
            yPos = yPos + 5;
            doc.setFontSize(8);
            doc.setTextColor("#OOOOO");
            doc.text(currentDate, 140, yPos);
            yPos = yPos + 5;
            doc.text(cardType, 140, yPos);
            yPos = yPos + 5;
            doc.text(printedBy, 140, yPos);
            doc.setFontSize(10);
            doc.text(cardTitle, textTitle0, yPos);
          }

          if (typeof doc.putTotalPages === "function") {
            doc.putTotalPages(totalPagesExp);
          }

          if (data.pageNumber === 1) {
            // doc.setFontSize(15);
            doc.setFont(cambria, "normal");
            doc.text("title", 320, 42);
          }
          // footer
          let str = "Page " + doc.internal.getNumberOfPages();
          // Total page number plugin only available in jspdf v1.0+
          if (typeof doc.putTotalPages === "function") {
            str = str + " of " + totalPagesExp;
          }

          const pageSize = doc.internal.pageSize;
          const pageHeight = pageSize.height
            ? pageSize.height
            : pageSize.getHeight();
          doc.setFont(cambria, "normal");
          doc.setFontSize(9);
          doc.setTextColor("#000000");
          // data.settings.margin.left
          doc.text(str, 18, pageHeight - 10);
        },

        didParseCell: function (data) {
          // let rows = data.table.body;
          if (
            data.section === "body" &&
            data.row.index === renewReports?.length
          ) {
            data.cell.styles.fontStyle = "bold";
          }
        },
        // margin: { top: 10 },
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageSize = doc.internal.pageSize;
      const pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();

      if (typeof doc.putTotalPages === "function") {
        doc.putTotalPages(totalPagesExp);
      }
      doc.setFontSize(8);
      doc.setFont(cambria, "normal");
      const footerWidth = doc.getTextWidth(footer);
      const textFooter = (pageWidth - footerWidth) / 2;

      doc.text(footer, textFooter, pageHeight - 6);

      doc.setProperties({
        title: "Renew Entry/Exit Pass Report",
      });
      window.open(doc.output("bloburl"), "_blank");
    }
  }, [renewReports]);

  return (
    <div>
      <table id="table" style={{ display: "none" }}>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Name</th>
            <th>Mobile No.</th>
            <th>Citizenship No.</th>
            <th>Gender</th>
            <th>Card No.</th>
            <th>Application Type</th>
            <th>Office Type</th>
            <th>Applied From</th>
          </tr>
        </thead>
        <tbody>
          {renewReports?.length > 0
            ? renewReports.map((value, i) => {
                const {
                  fullName,
                  citizenshipNumber,
                  gender,
                  mobileNumber,
                  cardNumber,
                  applicationType,
                  office,
                } = value;
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{fullName}</td>
                    <td>{mobileNumber}</td>
                    <td>{citizenshipNumber ? citizenshipNumber : "N/A"}</td>
                    <td>
                      {gender === "M"
                        ? "MALE"
                        : gender === "F"
                        ? "FEMALE"
                        : "OTHER"}
                    </td>
                    <td>{cardNumber ? cardNumber : "-"}</td>
                    <td>{applicationType}</td>
                    <td>{office ? office?.officeType : "-"}</td>
                    <td>{office ? office?.palika?.name : "-"}</td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default PDFReportModal;
