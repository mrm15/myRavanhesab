import { useState } from "react";
import "./PriceSection.scss";

const PriceSection = (props) => {
  const [open, setOpen] = useState(false);

  const clickHandler = () => {
    setOpen(!open);
  };

  return (
    <div
      className={
        open
          ? "Price_wrapper_ Price_wrapper_active"
          : `Price_wrapper_ ${props.className}`
      }
    >
      <div className="Price_wrapper_top">
        <div className="item_checkbox">
          <input
            className="item__"
            type="checkbox"
            value={props.price}
            id={props.id}
            onChange={props.changeHandler}
            defaultChecked={props.checked}
            disabled={props.disabled}
          />
          <label htmlFor={props.id}>{props.title}</label>
        </div>
        <div className="item_price_" onClick={clickHandler}>
          <span>{props.price} تومان</span>
          <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.99963 -9.05991e-05C7.41629 -9.05991e-05 6.83296 0.22491 6.39129 0.666577L0.957983 6.09988C0.716317 6.34154 0.716317 6.74154 0.957983 6.98321C1.19965 7.22488 1.59965 7.22488 1.84132 6.98321L7.27463 1.54991C7.67463 1.14991 8.32463 1.14991 8.72463 1.54991L14.158 6.98321C14.3996 7.22488 14.7996 7.22488 15.0413 6.98321C15.283 6.74154 15.283 6.34154 15.0413 6.09988L9.60796 0.666577C9.16629 0.22491 8.58296 -9.05991e-05 7.99963 -9.05991e-05Z"
              fill="#B9B9B9"
            />
          </svg>
        </div>
      </div>
      <div className="Price_wrapper_bottom">
        {props.discription !== "" && (
          <span className="text_discription">{props.discription}</span>
        )}
        {props.picSrc !== "" && (
          <div className="picture_of_items">
            <img src={props.picSrc} alt="" />
          </div>
        )}
        {props.videoSrc !== "" && (
          <div className="video__">
            <video className="video__tag" controls>
              <source src={props.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceSection;
