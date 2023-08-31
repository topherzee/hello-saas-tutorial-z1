import React from "react";
import { EditableArea } from "@magnolia/react-editor";

const Contact = ({ main, title }) => {
  const boxStyle = {
    background: "#eee",
    padding: "20px",
  };

  return (
    <div className="Contact">
      <div className="box" style={boxStyle}>
        <h1>{title || "Nulla vitae elit libero, a pharetra augue."}</h1>
      </div>
      {main && <EditableArea content={main} />}
    </div>
  );
};

export default Contact;
