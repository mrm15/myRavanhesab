import React from 'react';
import Styles from "./Button.module.css"

const Button = (props) => {

  return (
    <button
      id={props.id !== undefined ? props.id : undefined}
      onChange={props.onChange !== undefined ? props.onChange : undefined}
      onClick={props.onClick !== undefined ? props.onClick : undefined}
      className={props.className === undefined ? "greenBtn" + " " + Styles.default_btn_style : props.className + " " + Styles.default_btn_style
        // props.className !== undefined ?
        //   props.color !== undefined ?
        //     props.className + " " + props.color + " " + Styles.default_btn_style
        //     :
        //     props.className + "greenBtn " + Styles.default_btn_style // green is default style
        //   :
        //   props.color !== undefined ?
        //     props.color + " " + Styles.default_btn_style
        //     :
        //     " greenBtn " + Styles.default_btn_style // green is default style
      }
      type={props.type !== undefined ? props.type : undefined}

    >
      {props.children}
    </button>
  )

};

export default Button;
