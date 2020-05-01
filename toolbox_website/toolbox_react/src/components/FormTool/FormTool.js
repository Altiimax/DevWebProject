import React, { useState } from "react";
import "./FormTool.css";

function FormTool(props) {
  const [inputType] = useState(props.type);
  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    setInputValue(event.target.value);
    if (props.onChange) {
      props.onChange(inputValue);
    }
  }
  return (
    <>
      <input type={inputType} value={inputValue} />
    </>
  );
}

export default FormTool;
