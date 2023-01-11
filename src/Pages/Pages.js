import React, {useEffect, useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {
  Navigate,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Page_404 from "./404";
import Dashboard from "../Components/Dashboard/Dashboard";
import Login from "../Components/Login/login";
import MainPage from "./MainPage/MainPage";
import Loader from "../Components/Loader/Loader";
import axios from "axios";
import SelectedProductType from "../Components/SelectedProductType/SelectedProductType";
import Bill from "../Components/Bill/Bill";
import PaymentResult from "../Components/PaymentResult/PaymentResult";
import Wizard from "../Components/Wizard/Wizard";


const Pages = () => {

  const [loading, setLoading] = useState(true);
  // const [token, setToken] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    // debugger
    const token = localStorage.getItem("token");
    // اینجا ریکوئست میزنم بک ببینم کاربرم لاگین هست یا نه تا چک کنم آیا توکن اعتبار داره یا خیر
    if (token === null) {
      setLoading(false)
      setIsLogin(false)
    } else {
      axios.get("tokenValidate/").then((r) => {
        if (r.data.status) {
          toast.success(r.data.message)
          setLoading(false)
          setIsLogin(true)
        } else {
          setLoading(false)
          setIsLogin(false)
        }
      }).catch(error => {
        // toast.error(r.data.message)
        setLoading(false)
        setIsLogin(false)
      })

      // toast("در حال اعتبار سنجی...")
      // request to back End  to check if  token is valid
      // if yes  setIsLogin(true)
      // setTimeout(() => {
      //   setLoading(false)
      //   setIsLogin(true)
      // }, 3000)
    }
  }, [])

  return <BrowserRouter>
    <ToastContainer
      position="bottom-left"
      autoClose={2500}
      hideProgressBar={true}
      newestOnTop={false}
      theme="colored"
      closeOnClick
      rtl
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
    />
    {loading ? <Loader text={"در حال اعتبار سنجی...."} className={"center__Loader"}/>
      :
      <Routes>
        <Route
          path="/login" element={isLogin ? <Navigate to={"Dashboard"}/> : <Login setIsLogin={setIsLogin}
            // setToken={setToken}
          />}/>
        <Route
          exact
          path="/"
          element={isLogin ? <MainPage/> : <Login setIsLogin={setIsLogin}
            // setToken={setToken}
          />}
        >
          <Route path="/" element={<Dashboard/>}/>
          <Route path="Dashboard" element={<Dashboard/>}/>
          <Route path="selectedProductType" element={<SelectedProductType/>}/>
          <Route path="bill" element={<Bill /> }/>
          <Route path="paymentResult" element={<PaymentResult /> }/>
          <Route path="wizard" element={<Wizard /> }/>


          {/*<Route*/}
          {/*  exact*/}
          {/*  path="/"*/}
          {/*  element={*/}
          {/*    isAuth ? (*/}
          {/*      <MainPage setIsAuth={setIsAuth} sidebarMode={"normal"} />*/}
          {/*    ) : (*/}
          {/*      <Navigate to={"/Login"} />*/}
          {/*    )*/}
          {/*  }*/}
          {/*>*/}
          {/*<Route path="Report" element={<Report />}>*/}
          {/*  <Route path=":id" element={<Chart />} />*/}
          {/*</Route>*/}
          {/*</Route>*/}

        </Route>
        <Route path="*" element={<Page_404/>}/>
      </Routes>
    }
  </BrowserRouter>

};

export default Pages;
