import React from 'react';
import ravanhesabLogo from "../../Assets/img/ravanhesabLogo.png";
import {BasketRounded, BasketRoundedFill , TicketIcon} from "../../Assets/svg";
import numeric from "../utils/NumericFunction";
import {Link} from "react-router-dom";


const Header = (props) => {

  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div style={{
      height: 55,
      width: "100%",
      position: "absolute",
      top: 0,
      background: '#f1f1f1',
      zIndex: 12,
      padding: 15,
      border: "3px solid #E5E5E5",
      display: "flex",
      justifyContent: "space-between"


    }}>

      <ul>
        <li><span className={"px-4"}>
            <img className={""} src={ravanhesabLogo} alt={"روانحساب"}/>
          </span>
        </li>
      </ul>

      <div className={"d-flex align-items-center justify-content-between"}>
        <div>
          {userData.name} {userData.familyName}
        </div>
        <Link className={"mx-3"} alt={"تیکت ها"} to={"/tickets"}><TicketIcon/></Link>
        <div style={{width: 90,overflow:"hidden"}}>{props.children}</div>
      </div>
    </div>
  );
};

export default Header;
