import React, { useEffect, useState } from "react";

const ViewModal = ({ viewData }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (typeof viewData === "string") {
      setContent(viewData);
    } else if (viewData instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent(reader.result);
      };
      reader.readAsDataURL(viewData);
    }
  }, [viewData]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe
        src={content}
        title="document-viewer"
        style={{ height: "60vh", width: "100%" }}
      />
    </div>
  );
};

export default ViewModal;
