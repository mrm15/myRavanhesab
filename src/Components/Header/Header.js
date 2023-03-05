import React from 'react';
import ravanhesabLogo from "../../Assets/img/ravanhesabLogo.png";
import {BasketRounded, BasketRoundedFill, LogOutIcon, TicketIcon} from "../../Assets/svg";
import Swal from 'sweetalert2';
import {Link, useNavigate} from "react-router-dom";


const Header = (props) => {

  const navigateTo = useNavigate()

  const userData = JSON.parse(localStorage.getItem("userData"));


  function logOutHandler() {

    Swal.fire({
      title: "خروج از سامانه",
      text: `آیا مطمئنید؟`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بله',
      cancelButtonText: 'خیر'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        // navigateTo("/Login");
        navigateTo("/login");
        window.location.reload()


      }
    })


  }

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
            <Link to={"/"}><img className={""} src={ravanhesabLogo} alt={"روانحساب"}/></Link>
          </span>
        </li>
      </ul>

      <div className={"d-flex align-items-center justify-content-between"}>
        {props.dataBeforeName}
        <div
          className={"px-2"}
        >

          {userData && userData.name !== null && userData.name} {userData && userData.familyName !== null && userData.familyName}
        </div>
        <div
          // style={{width: 90, overflow: "hidden"}}
          className={"px-2"}
        >{props.children}</div>
        <div><span onClick={logOutHandler} className={"mx-3 cursor_pointer"} alt={"خروج"}><LogOutIcon/></span></div>

      </div>
    </div>
  );
};

export default Header;
