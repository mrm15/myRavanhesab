import './App.css';
import "./Assets/FontAwesomePro/css/all.css"
import Pages from "./Pages/Pages";
import axios from 'axios';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import {useEffect, useState} from "react";
import tr from "./Components/translate/translate";


function App() {
  useEffect(() => {
    if (window.location.hostname === "localhost") {
      localStorage.setItem(
        "apiUrl",
        // "http://localhost/Git/myRavanhesab/"
        "https://my.ravanhesab.com/myRavanhesab/"
      );
    } else {
      localStorage.setItem(
        "apiUrl",
        "myRavanhesab/"
      );
    }
  }, [])


  return <>
    <div style={{
      direction: 'rtl'
    }}>
      <Pages/>
    </div>
  </>;
}


function NavigateTo(url) {
  const NavigateTo = useNavigate();
  NavigateTo(url);

}

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    // OR config.headers.common['Authorization'] = `Bearer ${your_token}`;
    config.baseURL = `${localStorage.getItem("apiUrl")}/`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    response.data.token !== undefined && localStorage.setItem('token', response.data.token)
    // console.log('token: ' + response.data.token);
    return response;
  },
  (error) => {

    // debugger
    if (error.response) {
      // debugger
      if (error.response.status === 401
        // && (window.location.pathname !== '/Login' || window.location.pathname)
      ) {

        sessionStorage.clear()
        localStorage.clear()
        NavigateTo("login")
        toast.error("لطفا مجددا وارد سامانه شوید");
        window.location.reload()

        // setTimeout(() => {
        //   window.location.reload()
        // }, 2000);
      }
      // if (error.response.status === 401 && window.location.pathname === '/Login') {
      //   return error;
      // }
      if (error.response.status === 403) {
        toast.error("شما مجوز دسترسی به این بخش را ندارید.");
        return error;
      }
      // if (error.response.status === 401) {
      //   sessionStorage.clear();
      //   NavigateTo("/Login")
      //   toast.error("لطفا مجددا وارد سامانه شوید");
      // }
      // error.response.status === 401 &&
      // sessionStorage.clear() &&
      // localStorage.clear() &&
      // NavigateTo("/Login") &&
      // toast.error("لطفا مجددا وارد سامانه شوید");

      return error;
    } else if (error.message) {
      alert(error.message)
    }


  }
);

// export default {
//   get: axios.get,
//   post: axios.post,
//   put: axios.put,
//   delete: axios.delete,
//   patch: axios.patch
// };

export default App;
