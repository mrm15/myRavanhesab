import { useState } from "react";
import "./TitleBox.scss";

const TitleBox = (props) => {
  // const [click, setClick] = useState(false);

  // const clickHandler = () => {
  //   setClick(!click);
  // };

  return (
    <div
      className={"sofware_box "}
      id={props.id}
      onClick={props.onClick}
    >
      <div className="circle_pic">
        <img src={props.url} alt="" />
      </div>
      <span>{props.title}</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.0697 14.4299L11.9997 20.4999L5.92969 14.4299"
          stroke="#F58634"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 12V20.33"
          stroke="#F58634"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 3.5V8.03"
          stroke="#F58634"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default TitleBox;
