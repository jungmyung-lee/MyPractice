import React from "react";
import "./style.css"

interface Props {
    readonly placeHolder?: string;
    readonly options?: string[];
    readonly value?: string;
    readonly size?: string;
    readonly onChange?:(e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const DropDown: React.FC<Props> = ({ size = "", placeHolder, options, value, onChange }) => {
  return (
    <select value={value} onChange={onChange} className={"custom-select " + size}>
      {placeHolder && (
        <option value="" disabled>
          {placeHolder}
        </option>
      )}
      {options?.map((option, idx) => (
        <option key={idx} id={idx.toString()} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};