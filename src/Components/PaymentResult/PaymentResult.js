import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";

const PaymentResult = () => {
  const prefixUrl = localStorage.getItem("apiUrl")

  const [isLoading, setIsLoading] = useState(true)

  const location = useLocation();
  const urlParams = location.search.slice(1).split('&').reduce((acc, s) => {
    const [k, v] = s.split('=')
    return Object.assign(acc, {[k]: v})
  }, {})


  useEffect(() => {
    const urlParams = location.search.slice(1).split('&').reduce((acc, s) => {
      const [k, v] = s.split('=')
      return Object.assign(acc, {[k]: v})
    }, {});

    axios.post(prefixUrl + "verifyPayment/", urlParams).then(r => {

      debugger

      console.log(r.data)
    }).catch(err => {
      console.log(err)
    })

  })


  return (

    <div className={"bg__section___selectedProduct"}>

      <div>
        به کال بک یو آر ال خودش آمدید

      </div>
    </div>
  );
};

export default PaymentResult;
