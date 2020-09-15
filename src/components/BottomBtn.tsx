import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BottomBtn = ({
  text = "新建",
  colorClass,
  icon,
  onBtnClick,
}: {
  text?: string;
  colorClass?: string;
  icon: any;
  onBtnClick?: Function;
}) => {
  return (
    <button
      type="button"
      className={`btn btn-block no-border ${colorClass}`}
      onClick={() => onBtnClick()}
    >
      <FontAwesomeIcon className="mr-2" size="lg" icon={icon} />
      {text}
    </button>
  );
};

export default BottomBtn;
