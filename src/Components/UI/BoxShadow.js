import React from 'react';
import Styles from "./Ui.module.css"

const BoxShadow = (props) => {
  return (
    <div
      className={props.className !== undefined ? props.className + " " + Styles.box__shadow : Styles.box__shadow}
      style={props.style}>
      {props.children}
    </div>
  );
};

export default BoxShadow;
