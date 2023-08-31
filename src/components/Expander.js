import { useState, useEffect } from "react";
import { EditableArea, EditorContextHelper } from "@magnolia/react-editor";

const Expander = ({ expanderItems, metadata }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    EditorContextHelper.refresh();
  }, [isCollapsed]);

  const toggle = (event) => {
    event?.preventDefault();
    setIsCollapsed((preState) => !preState);
  };

  return (
    <div className="expander">
      <div
        onClick={toggle}
        className={
          isCollapsed ? "open expanderHeader" : "closed expanderHeader"
        }
      >
        Expander
        <svg
          className="expanderIcon"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="presentation"
        >
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
        </svg>
      </div>

      {!isCollapsed && (
        <div>
          {expanderItems && (
            <EditableArea
              content={expanderItems}
              parentTemplateId={metadata["mgnl:template"]}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Expander;
