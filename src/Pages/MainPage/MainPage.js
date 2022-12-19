import React, {useRef} from 'react';
import {Outlet} from "react-router-dom";
import {toast} from "react-toastify";

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
    <>
      <h6>😀</h6>
      <Outlet/>
    </>
  );
};

export default MainPage;
