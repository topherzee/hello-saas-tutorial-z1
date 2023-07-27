import React from "react";

const Image = (props) => {
  let link = props.image && props.image["@link"];
  return <>{link && <img className="Image" src={link} alt="Etiam Purus" />}</>;
};

export default Image;
