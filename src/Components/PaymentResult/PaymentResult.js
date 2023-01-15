import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import numeric from "../utils/NumericFunction";
import Button from "../UI/Button";
import {ErrorIconAfterPay, SuccessIconAfterPay} from "../../Assets/svg";
import Header from "../Header/Header";

const PaymentResult = () => {
  const navigateTo = useNavigate()
  const prefixUrl = localStorage.getItem("apiUrl")

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

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
      setIsLoading(false)
      setData(r.data)
    }).catch(err => {
      console.log(err)
    })

  }, [])


  return (

    <div className={""}>
      <Header/>
      {isLoading ?
        <Loader className={"vh__100"}/> :
        <div>

          <div className={"w-100 d-flex justify-content-center align-items-center flex-column nice__bg my-5"}
               style={{height: '50vh',}}>
            <div className={'d-flex justify-content-center align-items-center my-5'}>
              {data.status ?
                <>
                  <SuccessIconAfterPay/>
                  <h5>{numeric.e2p(data.message)}</h5>
                </>
                :
                <>
                  <ErrorIconAfterPay/>
                  <h5>{numeric.e2p(data.message)}</h5>
                </>
              }
            </div>
            <hr className={"hr__style"}/>
            <div>
              {data.status ?
                <>
                  <Button onClick={()=>navigateTo("/")} className={"btn__empty"} > صفحه اصلی</Button>
                  <Button
                  onClick={
                    ()=> navigateTo("/wizard", {state: data})
                  }
                  > تکمیل اطلاعات </Button>
                </> :
                <>
                  <Button onClick={()=>navigateTo("/")} > صفحه اصلی</Button>
                </>
              }
            </div>

          </div>
        </div>
      }

    </div>
  );
};

export default PaymentResult;
