import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import {ArrowLeft, LeftArrow, RemoveDiscount, TicketIcon, TickOfDiscount} from "../../Assets/svg";
import tr from "../translate/translate";
import numeric from "../utils/NumericFunction";
import Loader from "../Loader/Loader";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Input from "../UI/Input";
import {toast} from "react-toastify";
import Button from "../UI/Button";

const Bill = (target, source) => {
  const prefixUrl = localStorage.getItem("apiUrl");
  const [reload, setReload] = useState(true)
  const [payButtonActive, setPayButtonActive] = useState(true)



  const navigateTo = useNavigate()
  const [billData, setBillData] = useState({})
  const [isEmpty, setIsEmpty] = useState(false) // at first,we consider card is not Empty
  const [discountValue, setDiscountValue] = useState(0)

  useEffect(() => {
    axios.get(prefixUrl + "getUnpaidBillData/").then(r => {
      if (r.data.status) {
        setBillData(r.data.billData)
        if (r.data.discountId !== null) {
          setDiscountValue(r.data.discountId)
        }
      } else {
        setIsEmpty(true)
      }
    })
  }, [reload])


  const discountSubmitHandler = () => {
    console.log(discountValue);
    const objectToSend = {
      billId: billData.billId, discountId: discountValue
    }
    axios.post(prefixUrl + "addDiscount/", objectToSend).then(r => {
      if (r.data.status) {
        setBillData({})
        setReload(ps => !ps)
        toast.success(r.data.message)

      } else {
        toast.error(r.data.message)
      }
    })

  }
  const deleteDiscountHandler = () => {
    const objectToSend = {
      billId: billData.billId, discountId: discountValue
    }
    axios.delete(prefixUrl + "addDiscount/?billId=" + billData.billId).then(r => {
      if (r.data.status) {
        toast.success(r.data.message)
        setBillData({})
        setReload(ps => !ps)
      } else {
        toast.success(r.data.message)
      }
    })

  }

  function payButtonHandler() {
    setPayButtonActive(false);
    const ax = axios.get(prefixUrl + "getPaymentGatewayLink/?billId=" + billData.billId).then(r => {
      // debugger
      console.log(r.data)
      // debugger
      if(r.data.status){
        const url =  r.data.link;
        toast.info(r.data.message)
        window.location.assign(url)

        // navigateTo(r.data.link)
      }else {
        debugger
        toast.error(r.data.message + "");
        setPayButtonActive(true);
      }
    })

    toast.promise(ax, {
      pending: 'در حال بررسی سبد خرید...',
      // success: 'Got the data',
      error: 'Error when fetching',
    }).then(r => {
      console.log(r)
    })
  }

  return (<div>
    <Header></Header>
    {isEmpty ? <>
      <div className={" mt-5 px-5 py-5 text-center nice__bg"}>
        <div>شما هیچ صورت حسابی ندارید.</div>
        <div>&nbsp;</div>
        <div className={"my-5 py-5"}>
          <Input type={"button"} value={" صفحه اصلی"} onClick={() => navigateTo("/")}/>
        </div>
      </div>
    </> : <>
      <div className={"d-flex margin_top_5 w-100 justify-content-center nice__bg"}>
        {Object.keys(billData).length > 0 ? <div className={"bill__box font_14_400"}>
          <div className={"d-flex justify-content-between  green_color px-2"}>
            <div><span> شماره سفارش:</span><span>{numeric.e2p(billData.billId + "")}</span>
            </div>
            <div className={"cursor_pointer"} onClick={() => navigateTo("/")}>
              <span> بازگشت به صفحه اصلی</span>
              <span><LeftArrow/></span>
            </div>
          </div>
          {billData.details.map(v => <div
            className={"single_product_in_bill d-flex  ps-5 pe-4 justify-content-between align-items-center my-1"}>
            <div className={""}>
              <span className={"check__box__before"}/>
              <span> {v.itemType}</span>
              <span> {v.itemTitle}</span>
            </div>
            <div>{numeric.e2p(v.mainPrice.toLocaleString())} {tr.currency_unit}</div>
          </div>)}
          <div className={"d-flex justify-content-between my-3 px-4  "}>
            <div></div>
            <div className={"text__bills__prices__section"}>
              <span> {tr.total_price_you}</span>
              <span>{numeric.e2p(billData.paymentPrice.toLocaleString())} {tr.currency_unit}</span>
            </div>
          </div>
          <div className={"d-flex justify-content-between my-3 px-4 "}>
            <div></div>
            <div className={"position-relative text__bills__prices__section"}>
              <span> {tr.discount}</span>
              <span className={"position-relative"}>
                      <Input
                        style={{width: 132,}}
                        onKeyUp={(e) => e.key === 'Enter' && !billData.hasDiscount ? discountSubmitHandler() : deleteDiscountHandler()}
                        className={"discount_input px-2"} type={"text"}
                        placeholder={billData.hasDiscount ? billData.discountId : "کد تخفیف"}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        value={discountValue === 0 ? "" : discountValue}
                        disabled={billData.hasDiscount}
                      />
                        <span
                          style={{
                            top: "8px", left: "2px", width: 20, height: 20,
                          }}
                          className={"position-absolute cursor_pointer"}
                          onClick={() => !billData.hasDiscount ? discountSubmitHandler() : deleteDiscountHandler()}
                        >
                      {!billData.hasDiscount ? <TickOfDiscount/> :
                        <>
                          <RemoveDiscount/>
                        </>
                      }
                    </span>
                    </span>
            </div>
          </div>
          <div className={"d-flex justify-content-between my-3 px-4 pb-2 border__bottom__dash"}>
            <div></div>
            <div className={"position-relative text__bills__prices__section"}>
              <span> مبلغ بستانکار:</span>
              <span>{numeric.e2p(billData.creditorPrice.toLocaleString())} {tr.currency_unit}</span>
            </div>
          </div>
          <div className={"d-flex justify-content-between my-3 px-4 pb-2 border__bottom__dash"}>
            <div></div>
            <div className={"position-relative text__bills__prices__section"}>
              <span> مبلغ قابل پرداخت:</span>
              <span>{numeric.e2p(billData.totalPrice.toLocaleString())} {tr.currency_unit}</span>
            </div>
          </div>
          <div className={"d-flex justify-content-between my-3 px-4 pb-2 "}>
            <div></div>
            <div className={"position-relative text__bills__prices__section"}>
              <Button onClick={payButtonHandler} disabled={!payButtonActive}>پرداخت</Button>
            </div>
          </div>
        </div> : <Loader/>

        }
      </div>
    </>}

  </div>);
};

export default Bill;
