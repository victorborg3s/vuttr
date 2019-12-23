import React from "react";
import * as _ from "lodash/core";

const HighlightedSpan = ({text, highlight}) => {
  const splited = text.split(RegExp(highlight, "i"));
  const occurr = text.match(RegExp(highlight, "gi"));
  let count = -1;
  return splited.map((span, index) => {
    if (index === 0)
      return (
        <span key={_.uniqueId("span_")}>{span}</span>
      );
    count++;
    return (
      <span key={_.uniqueId("span_")}>
        <b>{occurr[count]}</b>
        {span}{index === splited.length -1 ? " " : ""}
      </span>
    );
  }); 
}

export default HighlightedSpan;