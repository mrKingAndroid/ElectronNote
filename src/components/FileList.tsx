import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import useKeyPress from "../hooks/useKeyPress";
import { FileType } from "../utils/types";
const FileList = ({
  files,
  onFileClick,
  onSaveEdit,
  onFileDelete,
}: {
  files?: Array<FileType>;
  onFileClick?: Function;
  onSaveEdit?: Function;
  onFileDelete?: Function;
}) => {
  const [editStatus, setEditStatus] = useState(-1); // 正在编辑的是哪个文件
  const [value, setValue] = useState(""); // 输入框值
  let node = useRef(null);
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);
  const closeSearch = (editItem: FileType) => {
    setEditStatus(-1);
    setValue("");
  };

  useEffect(() => {
    const editItem = files.find((file) => file.id === editStatus);
    if (enterPressed && editStatus && value.trim() != "") {
      onSaveEdit(editItem.id, value);
      setEditStatus(-1);
      setValue("");
    }
    if (escPressed && editStatus) {
      closeSearch(editItem);
    }
  });

  return (
    <ul className="list-group list-group-flush file-list">
      {files.map((file) => {
        return (
          <li
            className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
            key={file.id}
            data-id={file.id}
            data-title={file.title}
          >
            {file.id !== editStatus && (
              <>
                <span className="col-2">
                  <FontAwesomeIcon size="lg" icon={faMarkdown} />
                </span>
                <span
                  className="col-10 c-link"
                  onClick={() => {
                    onFileClick(file.id);
                  }}
                >
                  {file.title}
                </span>
              </>
            )}
            {file.id !== editStatus && (
              <>
                <input
                  className="form-control col-10"
                  ref={node}
                  value={value}
                  placeholder="请输入文件名称"
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="icon-button col-2"
                  onClick={() => {
                    closeSearch(file);
                  }}
                >
                  <FontAwesomeIcon title="关闭" size="lg" icon={faTimes} />
                </button>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};
export default FileList;
