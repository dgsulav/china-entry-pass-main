import jsPDF from "jspdf";
import QRCode from "qrcode";
import { useRef } from "react";
import { FaTimes } from "react-icons/fa";

const PrintModal = ({ show, setShow, info, setInfo }) => {
  const qrCanvasRef = useRef(null);

  const {
    cardId,
    userPhoto,
    cardNumber,
    submissionNumber,
    fullName,
    fatherName,
    dob,
    gender,
    district,
    palika,
    signaturePhoto,
    approvedBy,
    cardIssueDate,
  } = info;

  const userProfile = userPhoto;

  const cardNo = `Card No:- ${cardNumber}`;
  const sex = `Sex:- ${
    gender === "m" ? "Male" : gender === "f" ? "Female" : "Other"
  }`;
  const name = `Name:- ${fullName}`;
  const fName = `Father's Name:- ${fatherName}`;
  const dateOfBirth = `Date of Birth:- ${dob}`;
  const pAddress = `Address:-`;
  const districtName = `${district?.name}`;
  // , District`;
  const municipality = `Municipality:- ${palika?.name}`;
  // const ward = `Ward No:- ${wardNumber}`;

  // content for back page of card
  const officerName = `Officer's Name: ${
    approvedBy ? (approvedBy?.name ? approvedBy?.name : "") : ""
  }`;
  const designation = `Designation: ${
    approvedBy ? (approvedBy?.designation ? approvedBy?.designation : "") : ""
  }`;
  // const userSignature = ;
  const issuedDate = `Issued Date: ${
    cardIssueDate ? cardIssueDate.slice(0, 10) : ""
  }`;

  const signatureText = "Signature: ";

  function endsWithMedia(str) {
    return str.substring(str.length - 7) === "/media/";
  }

  let xPos = 15;
  let yPos = 60;
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [430, 270],
  });
  // doc.addImage(Front, "PNG", 0, 0, 430, 270);
  // doc.setFont("Cambria_Regular", "bold");
  doc.setFontSize(40);
  yPos = yPos + 45;
  doc.text(cardNo, xPos, yPos);
  yPos = yPos + 18;

  doc.text(name, xPos, yPos);
  yPos = yPos + 18;
  doc.text(fName, xPos, yPos);
  yPos = yPos + 18;
  doc.text(dateOfBirth, xPos, yPos);
  doc.text(sex, xPos + 200, yPos);
  yPos = yPos + 18;
  doc.text(pAddress, xPos, yPos);
  const textWidth = doc.getTextWidth(pAddress);
  doc.text(districtName, xPos + textWidth + 4, yPos);
  doc.setLineWidth(0.01);
  doc.setLineDashPattern([1, 1]);
  doc.setDrawColor(0, 0, 0);
  // doc.line(xPos + textWidth + 2, yPos + 2, yPos, yPos + 2);

  yPos = yPos + 18;
  doc.text(municipality, xPos, yPos);
  yPos = yPos + 18;
  // doc.text(ward, xPos, yPos);
  yPos = yPos + 18;
  // doc.text(expiryDate, xPos, yPos);

  doc.addImage(userProfile, 323, 85, 90, 96.5);
  doc.setLineDash([]);
  doc.addPage();

  // Add content to the second page...

  let pageTwoXPos = 20;
  let pageTwoYPos = 25;
  doc.text("Card Holder's", pageTwoXPos, pageTwoYPos);
  doc.setLineWidth(0.05);
  doc.setDrawColor(0, 0, 0);
  doc.line(pageTwoXPos, 29, 105, 29);
  doc.text("Card Issuing Authority", 215, pageTwoYPos);
  // doc.setFont("Cambria_Regular", "bold");
  doc.setLineWidth(0.07);
  doc.setDrawColor(0, 0, 0);
  doc.line(215, 29, 355, 29);
  pageTwoYPos = pageTwoYPos + 20;

  const signatureTextWidth = doc.getTextWidth(signatureText);

  // doc.addImage(Back, "PNG", 0, 0, 430, 270);
  const qrData = JSON.stringify({
    id: cardId,
    submissionNumber: submissionNumber,
    cardNumber: cardNumber,
  });
  const data = document.createElement("canvas");
  const ctx = data.getContext("2d");
  qrCanvasRef.current = {
    data,
    ctx,
  };
  QRCode.toCanvas(data, qrData, function (error) {
    if (error) {
      console.error(error);
    } else {
      console.log("QR Code generated successfully");
    }
  });

  // Add QR code image to PDF
  doc.addImage(data, "PNG", 14, 107, 70, 70);
  doc.addImage(signaturePhoto, "PNG", signatureTextWidth + 6, 40, 50, 40);
  doc.text(signatureText, pageTwoXPos, pageTwoYPos);
  doc.text(officerName, 200, pageTwoYPos);
  pageTwoYPos = pageTwoYPos + 20;
  doc.text(designation, 200, pageTwoYPos);
  pageTwoYPos = pageTwoYPos + 20;
  doc.addImage(approvedBy?.signaturePhoto, "PNG", 290, 70, 35, 25);
  doc.text("Signature:", 200, pageTwoYPos);

  pageTwoYPos = pageTwoYPos + 20;
  doc.text(issuedDate, 200, pageTwoYPos);
  pageTwoYPos = pageTwoYPos + 20;

  doc.setFontSize(34);
  pageTwoYPos = pageTwoYPos + 40;

  let blob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(blob);
  // Append #toolbar=0 to hide the entire toolbar
  const urlWithParams = `${pdfUrl}#toolbar=0`;
  const modalClass = show ? "modal display-block" : "modal display-none";
  const handleClose = () => {
    setShow(false);
    setInfo("");
  };
  return (
    <div className={modalClass} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Print Preview
            </h5>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              <FaTimes />
            </button>
          </div>
          <div className="modal-body text-center">
            {!cardNumber && (
              <div>
                <p>Card Number is not generated.</p>
                <p>Please request for card number first.</p>
              </div>
            )}
            <iframe
              type="application/pdf"
              width="500px"
              src={urlWithParams}
              height="630px"
              title="Print Preview"
            ></iframe>
          </div>
          <canvas ref={qrCanvasRef} style={{ display: "none" }} />
        </div>
      </div>{" "}
    </div>
  );
};

export default PrintModal;
