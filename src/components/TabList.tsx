import React from "react";
import classNames from "classnames";
import "./TabList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FileType } from "../utils/types";

const TabList = ({
  files,
  activeId,
  unsaveIds = [],
  onTabClick,
  onCloseTab,
}: {
  files?: Array<FileType>;
  activeId?: string;
  unsaveIds?: Array<number>;
  onTabClick?: Function;
  onCloseTab?: Function;
}) => {
  return (
    <ul className="nav nav-pills tablist-component">
      {files.map((file) => {
        const withUnsavedMark = unsaveIds.includes(file.id);
        const fClassName = classNames({
          "nav-link": true,
          active: file.id === Number(activeId),
          withUnsaved: withUnsavedMark,
        });
        return (
          <li className="nav-item" key={file.id}>
            <a
              href="#"
              className={fClassName}
              onClick={(e) => {
                e.preventDefault();
                onTabClick(file.id);
              }}
            >
              {file.title}
              <span
                className="ml-2 close-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(file.id);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
              {withUnsavedMark && (
                <span className="rounded-circle ml-2 unsaved-icon"></span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default TabList;