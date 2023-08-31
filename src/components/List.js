import React from "react";
import { EditableArea } from "@magnolia/react-editor";

const List = ({ items, metadata }) => {
  return (
    <ul className="List">
      {items && (
        <EditableArea
          content={items}
          parentTemplateId={metadata["mgnl:template"]}
        />
      )}
    </ul>
  );
};

export default List;
