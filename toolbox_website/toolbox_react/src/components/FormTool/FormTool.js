import React, { useState } from "react";
import "./FormTool.css";

function FormTool(props) {
  const [inputType] = useState(props.type);
  const [labelName] = useState(props.label);
  const [labelFor] = useState(props.for);
  const [classLabel] = useState(props.classLabel);
  const [classInput] = useState(props.classInput);
  const [placeHolder] = useState(props.placeholder);
  const [isRequired] = useState(props.required);
  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    setInputValue(event.target.value);
    if (props.onChange) {
      props.onChange(inputValue);
    }
  }
  if (inputType === "select") {
    return (
      <>
        <select>
          <option>1</option>
          <option>2</option>
        </select>
      </>
    );
  }
  if (inputType === "file") {
    return (
      <>
        <label className={classLabel} htmlFor={labelFor}>
          {labelName}
        </label>
        <input
          className={classInput}
          type={inputType}
          value={inputValue}
          id={labelFor}
          name={labelFor}
          placeholder={placeHolder}
          onChange={handleChange}
        />
      </>
    );
  }
  return (
    <>
      <label className={classLabel} htmlFor={labelFor}>
        {labelName}
      </label>
      <input
        required={isRequired}
        className={classInput}
        type={inputType}
        value={inputValue}
        id={labelFor}
        name={labelFor}
        placeholder={placeHolder}
        onChange={handleChange}
      />
    </>
  );
}

export default FormTool;
