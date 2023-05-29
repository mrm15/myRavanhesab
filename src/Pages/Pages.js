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
import RequestDemo from "../Components/RequestDemo/RequestDemo";
import {AuthProvider} from "../Components/Auth/auth";
import Profile from "../Components/Profile";
import RequireAuth from "../Components/Auth/RequireAuth";
import MainDashboard from '../Components/MainDashboard/MainDashboard';
import SuccessPayment from '../Components/PaymentResult/SuccessPayment';


const Pages = () => {

  const [loading, setLoading] = useState(true);
  // const [token, setToken] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  // useEffect(() => {
  //   // debugger
  //   // const token = localStorage.getItem("token");
  //   // اینجا ریکوئست میزنم بک ببینم کاربرم لاگین هست یا نه تا چک کنم آیا توکن اعتبار داره یا خیر
  //   if (token === null) {
  //     setLoading(false)
  //     setIsLogin(false)
  //   } else {
  //     axios.get("tokenValidate/").then((r) => {
  //       if (r.data.status) {
  //         toast.success(r.data.message)
  //         setLoading(false)
  //         setIsLogin(true)
  //       } else {
  //         setLoading(false)
  //         setIsLogin(false)
  //       }
  //     }).catch(error => {
  //       // toast.error(r.data.message)
  //       setLoading(false)
  //       setIsLogin(false)
  //     })
  //   }
  // }, [])

  return (<BrowserRouter>
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

    <AuthProvider>
      <Routes>


        {/*<Route path="/login" element={isLogin ? <Navigate to={"/"}/> : <Login setIsLogin={setIsLogin}/>}/>*/}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Login/>}/>
        <Route path={"/profile"} element={<RequireAuth><Profile/></RequireAuth>}/>
        <Route
          exact
          path="/"
          // element={isLogin ? <MainPage/> :
          //   // loading ?
          //   //   <Navigate to={"/loader"}/>
          //   //   :
          //   <Login setIsLogin={setIsLogin}/>
          // }
          element={<RequireAuth><MainPage/></RequireAuth>}
        >

          <Route path="/" element={<MainDashboard/>}/>
         <Route path="Dashboard" element={<MainDashboard/>}/>
          <Route path="/" element={<RequireAuth><Dashboard/></RequireAuth>}/>
          <Route path="Dashboard" element={<Dashboard/>}/>
          <Route path="selectedProductType" element={<RequireAuth><SelectedProductType/></RequireAuth>}/>
          <Route path="bill" element={<Bill/>}/>
          <Route path="paymentResult" element={<RequireAuth><PaymentResult/></RequireAuth>}/>
          <Route path="success" element={<SuccessPayment/>}/>
          <Route path="wizard" element={<RequireAuth><Wizard/></RequireAuth>}/>
          <Route path="requestDemo" element={<RequireAuth><RequestDemo/></RequireAuth>}/>


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
        {/* <Route path="*" element={<Page_404/>}/> */}
      </Routes>

    </AuthProvider>
  </BrowserRouter>)

};

export default Pages;