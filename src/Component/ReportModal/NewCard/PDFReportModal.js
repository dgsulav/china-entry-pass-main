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

  const cards = useSelector((state) => state.report.cards);
  const userName = useSelector((state) => state.auth.username);

  useEffect(() => {
    if (cards.length > 0) {
      const { address, phoneNo } = organization;
      const unit = "mm";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait";
      const doc = new jsPDF(orientation, unit, size);
      //
      const currentDate = `Printed Date/Time: ${new Date().toLocaleString(
        "ja-JP"
      )}`;

      const cardTitle = "New Card Report";
      const cardType = `Card Type: ${status ? status : "N/A"}`;
      const printedBy = `Printed By: ${userName}`;

      const title = `Department Of Immigration`;

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
        startY: 60,
        didDrawPage: function (data) {
          //   doc.setLineWidth(0, 160);
          doc.setFont(cambria, "normal");

          doc.setFontSize(11);
          if (data.pageNumber === 1) {
            doc.setFontSize(11);
            const pageWidth = doc.internal.pageSize.getWidth();
            const logoWidth = 26;
            const cardTitleWidth = doc.getTextWidth(cardTitle); // Get the width of your text
            const titleWidth = doc.getTextWidth(title);
            const addressWidth = doc.getTextWidth(address);
            const phoneNoWidth = doc.getTextWidth(
              phoneNo ? phoneNo : "+977-01-4429659, 4429660"
            );
            const formTitleWidth = doc.getTextWidth(
              "Nepal-China Entry/Exit Pass Application Form"
            );

            // Calculate the x-coordinate to center the text
            const cardTitleX = (pageWidth - cardTitleWidth) / 2;
            const logoX = (pageWidth - logoWidth) / 2;
            const titleX = (pageWidth - titleWidth) / 2;
            const addressX = (pageWidth - addressWidth) / 2;
            const phoneNoX = (pageWidth - phoneNoWidth) / 2;
            const formTitleX = (pageWidth - formTitleWidth) / 2;

            let yPos = 22;
            if (logo) {
              doc.addImage(logo, "PNG", logoX, 2, 20, 0);
            }

            doc.setFontSize(10);
            doc.text(title, titleX, yPos);
            yPos = yPos + 5;
            doc.text(address, addressX, yPos);
            yPos = yPos + 5;
            doc.text(
              phoneNo ? phoneNo : "+977-01-4429659, 4429660",
              phoneNoX,
              yPos
            );
            yPos = yPos + 5;
            doc.text(
              "Nepal-China Entry/Exit Pass Application Form",
              formTitleX,
              yPos
            );
            yPos = yPos + 5;
            doc.setFontSize(8);
            doc.setTextColor("#OOOOO");
            doc.text(currentDate, 140, yPos);
            yPos = yPos + 5;
            doc.text(cardType, 140, yPos);
            yPos = yPos + 5;
            doc.text(printedBy, 140, yPos);
            yPos = yPos + 5;
            doc.setFontSize(10);
            doc.text(cardTitle, cardTitleX, yPos);
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
          if (data.section === "body" && data.row.index === cards?.length) {
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
        title: "New Entry/Exit Pass Report",
      });
      window.open(doc.output("bloburl"), "_blank");
    }
  }, [cards]);

  return (
    <div>
      <table id="table" style={{ display: "none" }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Submission Number</th>
            <th scope="col">Name </th>
            <th scope="col">Citizenship Number</th>
            <th scope="col">Contact</th>
            <th scope="col">Card No</th>
            <th scope="col">Father Name</th>
            <th scope="col">Office</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {cards?.length > 0
            ? cards.map((value, i) => {
                const {
                  id,
                  submissionNumber,
                  fullName,
                  cardNumber,
                  citizenshipNumber,
                  mobileNumber,
                  fatherName,
                  office,
                  status,
                } = value;
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{submissionNumber}</td>
                    <td>{fullName}</td>
                    <td>{citizenshipNumber ? citizenshipNumber : "N/A"}</td>
                    <td>{mobileNumber}</td>
                    <td>{cardNumber ? cardNumber : "N/A"}</td>
                    <td>{fatherName}</td>
                    <td>{office ? office?.name : "N/A"}</td>
                    <td>
                      {status === "pending"
                        ? "PENDING"
                        : status === "verified"
                        ? "VERIFIED"
                        : status === "approved"
                        ? "APPROVED"
                        : status === "rejected"
                        ? "REJECTED"
                        : "PRINTED"}
                    </td>
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
