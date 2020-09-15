import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import useKeyPress from "../hooks/useKeyPress";
const FileSearch = ({
  title = "我的云文档",
  onFileSearch,
}: {
  title?: string;
  onFileSearch: Function;
}) => {
  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState("");
  let node = useRef(null);
  const enterPressed = useKeyPress(13); // 回车按钮被按下弹起
  const escPressed = useKeyPress(27); // esc 按钮被按下弹起

  const startSearch = () => {
    setInputActive(true);
  };

  const closeSearch = () => {
    setInputActive(false);
    setValue("");
    onFileSearch(false);
  };

  useEffect(() => {
    if (enterPressed && inputActive) {
      onFileSearch(value);
    }
    if (escPressed && inputActive) {
      closeSearch();
    }
  });

  useEffect(() => {
    if (inputActive) {
      node.current.focus();
    }
  }, [inputActive]);

  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center mb-0">
      {!inputActive && (
        <>
          <span>{title}</span>
          <button type="button" className="icon-button" onClick={startSearch}>
            <FontAwesomeIcon title="搜索" size="lg" icon={faSearch} />
          </button>
        </>
      )}
      {inputActive && (
        <>
          <input
            className="form-control"
            value={value}
            ref={node}
            onChange={(e) => setValue(e.target.value)}
          ></input>
          <button type="button" className="icon-button" onClick={closeSearch}>
            <FontAwesomeIcon title="关闭" size="lg" icon={faTimes} />
          </button>
        </>
      )}
    </div>
  );
};
export default FileSearch;
