import React from 'react';
import Styles from "./Inpnut.module.css"

const Input = (props) => {

  return (
    <input
      style={props.style}
      autoComplete={props.autoComplete!==undefined ? props.autoComplete : undefined}
      defaultValue={props.defaultValue!==undefined ? props.defaultValue : undefined}
      value={props.value!==undefined ? props.value : undefined}
      id={props.id !== undefined ? props.id : undefined}
      placeholder={props.placeholder !==undefined ? props.placeholder : undefined}
      onKeyUp={props.onKeyUp !== undefined ? props.onKeyUp : undefined}
      onKeyDown={props.onKeyDown !== undefined ? props.onKeyDown : undefined}
      onChange={props.onChange !== undefined ? props.onChange : undefined}
      onClick={props.onClick !== undefined ? props.onClick : undefined}
      className={props.className !== undefined ?
        props.className + " " + Styles.default_input_style
        :
        Styles.default_input_style
      }
      type={props.type !== undefined ? props.type : undefined}
      disabled={props.disabled}

    />
  )

};

export default Input;
