import React, {useRef} from 'react';
import {Outlet} from "react-router-dom";
import {toast} from "react-toastify";
import Footer from "../../Components/Footer/footer";

const MainPage = () => {

  const offlineToastRef = useRef(null);

  function updateOnlineStatus(event) {
    navigator.onLine
      ? toast.dismiss(offlineToastRef.current) ||
      toast.success("اتصال به شبکه اینترنت برقرار است", {
        position: "top-center",
      })
      : (offlineToastRef.current = toast.error(
        "اتصال به شبکه اینترنت را بررسی نمایید",
        {
          position: "top-center",
          autoClose: false,
        }
      ));
  }

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);

  return (
    <div style={{backgroundColor:"#f1f1f1", height:'100vh' , overflowY:"scroll",  }}>
      <h6>من کانتیر اصلی هستم 👻</h6>
      <Outlet/>

      <Footer/>
    </div>
  );
};

export default MainPage;
