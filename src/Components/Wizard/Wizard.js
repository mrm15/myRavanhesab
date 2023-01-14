import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import {useLocation, useNavigate} from "react-router-dom";
import numeric from "../utils/NumericFunction";
import tr from "../translate/translate";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {toast} from "react-toastify";
import f from "../../utils/UtilsFunction";
import {TicketIcon} from "../../Assets/svg";
import axios from "axios";

const Wizard = () => {


  const [domainAvailability, setDomainAvailability] = useState("off");
  {/*
        domainAvailability:
        off
        loading
        ok
        nok
        minLength
        */
  }
  const navigateTo = useNavigate();
  const [data, setData] = useState({
    shopName: "",
    logo: {},
    phoneNumber: "",
    province: "",
    city: "",
    subDomain: "",
    billId: "",
    productId: 0,

  })
  const [fillStatus, setFillStatus] = useState("1");
  const [backEndData, setBackendData] = useState({})
  const location = useLocation();
  useEffect(() => {
    if (location) {
      setBackendData(location.state)
      data.billId = location.state.billId;
      data.productId = location.state.productId;
      debugger
    }
  })


  const submitSection1From = () => {
    let shopName = data.shopName;
    shopName = shopName.trim()

    if (f.hasBadCharacter(shopName)) {
      toast.error("کاراکتر های غیر مجاز در نام  را حذف کنید.")
      return
    }
    if (shopName.length < 3) {
      toast.error("لطفا نام فروشگاه را وارد کنید.")
      return
    }

    if (data.logo.name === undefined) {
      toast.error("لوگو فروشگاه بارگزاری نشده است.");
      return;
    }
    // debugger
    setFillStatus("2")
  };
  const submitSection2From = () => {
    // debugger
    const phoneNumber = data.phoneNumber;
    const province = data.province.trim();
    const city = data.city.trim();

    if (phoneNumber.length < 3) {
      toast.error("شماره تلفن فروشگاه را وارد کنید.")
      return
    }
    if (province.length < 3) {
      toast.error("نام استان را وارد کنید.")
      return
    }
    if (city.length < 3) {
      toast.error("نام شهر را وارد کنید.")
      return
    }
    debugger
    setFillStatus("3")

  }

  const submitSection3From = () => {
    // debugger
    const mydata = f.copyObject(data)

    debugger

    const temp = axios.post("insertPanelInfo/", mydata).then(r => {
      if (r.data.status) {
        setFillStatus("4")
        toast.success(r.data.message)
      } else {
        // toast.error(r.data.message);
      }
    });

    toast.promise(temp, {
      pending: "در حال ارسال اطلاعات...",
      success: "اطلاعات ثبت شد.",
      error: "در خوالست با اشکال مواجه شد",
    }).then(r => {});


  }


  const uploadFileInState = (file) => {

    debugger
    if (file.type.split("/")[0] !== 'image') {
      toast.error("فقط بارگزاری عکس مجاز است.")
      return;

    }
    // console.log(file);
    setData(ps => {
      const temp = {...ps}
      temp.logo = file;
      return temp;
    })

  }

  function updateDataState(key, value) {
    const temp = {...data};
    temp[key] = value;
    setData(temp)
  }

  function onChangeDomainHandler(e) {


    const subDomain = e.target.value.replaceAll(" ", "");

    // میگه شروعش نباید با عدد باشه
    if (subDomain.length > 0) {
      if (f.onlyNumbers(subDomain[0])) {
        toast.error("کاراکتری عددی در ابتدا مجاز نیست.")
        return;
      }

    }

    debugger
    if (!f.onlyLettersAndNumbers(subDomain)) {
      return;
    }
    if (subDomain.length > +tr.maxDomainLength) {
      return
    }
    updateDataState('subDomain', subDomain)
    checkDomainAvailability(subDomain)
  }

  function checkDomainAvailability(subDomain) {

    if (subDomain.length === 0) {
      setDomainAvailability("off")
      return
    }
    if (subDomain.length >= +tr.minDomainLength) {
      setDomainAvailability("loading");
      axios.get("/?subDomain=" + subDomain).then(r => {
        if (r.data.status) {
          setDomainAvailability("ok")
        } else {
          setDomainAvailability("nok")
          r.data.message && toast.error(r.data.message)
        }
      }).catch(error => {
        // toast.error(""+ error)
        toast.error("جوابی از سمت سرور دریافت نشد.")
      })


    } else {
      setDomainAvailability("minLength")
    }
  }

  const step1 = <>
    <div className={"d-flex justify-content-center "}>
      <div className={"circle font_16_400 bg__white__color__green__border_green"}>{numeric.e2p(1 + "")}</div>
      <div className={"wizard__line"}></div>
      <div className={"circle font_16_400 bg__transparent__color__gray__border_gray"}>{numeric.e2p(2 + "")}</div>
      <div className={"wizard__line"}></div>
      <div className={"circle font_16_400 bg__transparent__color__gray__border_gray"}>{numeric.e2p(3 + "")}</div>
    </div>
    {/*  */}
    <div>&nbsp;</div>
    <div className={" mt-4"}>
      <label htmlFor={tr.name} className={"d-block  text-end  my-1"}>{"نام فروشگاه"}</label>
      <Input className={"width__345 my-2  w-100 bg__white text-center"} id={tr.name} type="text"
             placeholder={"نام فروشگاه خود را وارد کنید"}
             onChange={(e) => setData(ps => {
               const temp = {...ps}
               temp.shopName = e.target.value
               return temp
             })
             }
      />
    </div>
    <div className={"mt-4"}>
      <label htmlFor={"upload"} className={"d-block  text-end  my-1"}>لوگو</label>
      <label htmlFor={"upload"} style={{
        background: "#fff",
        width: "100%",
        height: "45px",
        borderRadius: 10,
        position: "relative",
        cursor: "pointer"
      }}
             onDragOver={e => {
               e.preventDefault();
               e.target.style.cursor = 'cell';
             }}
             onDrop={e => {
               e.preventDefault()
               let file = e.dataTransfer.files[0]
               uploadFileInState(file)
             }}
      >
        <div style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#a0a0a0'
        }} className={"position-absolute"}>
          {
            data.logo.name !== undefined ?
              <div
                style={{direction: "ltr"}}>{data.logo.name.length > 35 ? data.logo.name.substring(0, 15) + " .. " + data.logo.name.substring(data.logo.name.length - 10, data.logo.name.length) : data.logo.name}</div> :
              "لوگو خود را اینجا رها کنید."
          }
        </div>
        <div style={{
          left: '0',
          position: 'absolute',
          transform: 'translate(20%, 50%)',

        }} className={"position-absolute text-danger"}>
          +افزودن فایل
        </div>

        <Input type={"file"} className={"d-none width__345 my-2 w-100  w-100 bg__white"} id={"upload"}
               onChange={(e) => {
                 uploadFileInState(e.target.files[0])
               }}
        />
      </label>

    </div>

    {/*<div className={"mt-4"}>*/}
    {/*  <label htmlFor={tr.mobile} className={"d-block  text-end  my-1"}>{tr.mobile}</label>*/}
    {/*  <Input className={"width__345 my-2  w-100 bg__white"} id={tr.mobile} placeholder={tr.enter_mobile} type="number"*/}
    {/*         // value={"registerFormData.phone_number"}*/}
    {/*         // onChange={event => setRegisterFormData(ps => {*/}
    {/*         //   const temp = {...ps}*/}
    {/*         //   temp.phone_number = event.target.value*/}
    {/*         //   return temp*/}
    {/*         // }*/}
    {/*         // )}*/}

    {/*  />*/}
    {/*</div>*/}

    <div className={" text-center"}>


      <CancelButton/>
      <Button
        onClick={submitSection1From}
        className={"my-4 greenBtn cursor_pointer"}>{"ادامه"}</Button>
    </div>
    {/*  */}
  </>
  const step2 = <>
    <div className={"d-flex justify-content-center "}>
      <div className={"circle font_16_400 bg__green__color__white"}>{numeric.e2p(1 + "")}</div>
      <div className={"wizard__line bg__green__color__white"}></div>
      <div className={"circle font_16_400 bg__white__color__green__border_green"}>{numeric.e2p(2 + "")}</div>
      <div className={"wizard__line"}></div>
      <div className={"circle font_16_400 bg__transparent__color__gray__border_gray"}>{numeric.e2p(3 + "")}</div>
    </div>
    {/*  */}
    <div>&nbsp;</div>
    <div className={" mt-4"}>
      <label htmlFor={"phoneNumber"} className={"d-block  text-end  my-1"}>{"شماره تلفن فروشگاه"}</label>
      <Input
        className={"ltr width__345 my-2  w-100 bg__white text-center"}
        id={"phoneNumber"}
        type="number"
        placeholder={"02133229911"}
        value={data.phoneNumber}
        onChange={(e) => {
          updateDataState('phoneNumber', e.target.value)
        }}
      />
    </div>


    <div className={"mt-4 d-flex justify-content-between"}>
      <div className={"w__50"}>
        <label htmlFor={"province"} className={"d-block  text-end  my-1"}>{tr.province}</label>
        <Input className={"w-100 my-2   bg__white"} id={"province"} placeholder={"نام استان را وارد کنید"} type="text"
               value={data.province}
               onChange={event => updateDataState('province', event.target.value)}
        />
      </div>
      <div className={"city"}>
        <label htmlFor={"city"} className={"d-block  text-end  my-1"}>{"شهر"}</label>
        <Input className={"w-100 my-2   bg__white"} id={tr.mobile} placeholder={"نام شهر را وارد کنید"} type="text"
               value={data.city}
               onChange={event => updateDataState('city', event.target.value)}
        />
      </div>
    </div>

    <div className={" text-center"}>
      <CancelButton/>
      <Button
        onClick={submitSection2From}
        className={"my-4 greenBtn cursor_pointer"}>{"ادامه"}</Button>
    </div>
    {/*  */}

  </>


  const step3 = <>
    <div className={"d-flex justify-content-center "}>
      <div className={"circle font_16_400 bg__green__color__white"}>{numeric.e2p(1 + "")}</div>
      <div className={"wizard__line bg__green__color__white"}></div>
      <div
        className={"circle font_16_400 bg__transparent__color__gray bg__green__color__white"}>{numeric.e2p(2 + "")}</div>
      <div className={"wizard__line bg__green__color__white"}></div>
      <div
        className={"circle font_16_400 bg__transparent__color__gray bg__white__color__green__border_green"}>{numeric.e2p(3 + "")}</div>
    </div>

    {/*  */}
    <div>&nbsp;</div>
    <div className={" mt-4"}>
      <label htmlFor={"subDomain"} className={"d-block  text-end  my-1"}>{"زیر دامنه"}</label>
      <Input
        className={"ltr width__345 my-2  w-100 bg__white text-center"}
        id={"subDomain"}
        type="text"
        placeholder={"subDomain"}
        value={data.subDomain}
        onChange={(e) => onChangeDomainHandler(e)}
      />
      <div>
        {domainAvailability === "minLength" ?
          <> <span
            className={"text-warning"}>طول دامنه بایدحداقل {numeric.e2p(tr.minDomainLength) + ""} کاراکتر باشد.</span></> :
          domainAvailability === "off" ?
            <><span>لطفا یک زیر دامنه وارد کنید</span></> :
            domainAvailability === "loading" ?
              <><span className={"text-info"}> <span className={""}/>&#9673;<span className={""}>در حال بررسی...</span></span></> :
              domainAvailability === "ok" ?
                <>
              <span>
          <span className={"check__box__before"}/><span className={"text-success"}>زیر دامنه مورد تایید</span>
        </span>
                </> :
                domainAvailability === "nok" ?
                  <>
              <span className={"text-danger"}>
              <span className={""}/>&#215; &#xD7; &times;<span className={""}>زیر دامنه قابل قبول نیست</span>
              </span>
                  </> : <>someThing Went Wrong!</>
        }
      </div>
    </div>


    <div className={" text-center mt-5"}>
      <CancelButton/>
      <Button
        onClick={submitSection3From}
        className={"my-4 greenBtn cursor_pointer"}
        // disabled={domainAvailability !== "ok"}
      >{"تایید"}</Button>
    </div>
    {/*  */}

  </>
  const step4 = <>
    <div className={"d-flex justify-content-center "}>
      <div className={"circle font_16_400 bg__green__color__white"}>{numeric.e2p(1 + "")}</div>
      <div className={"wizard__line bg__green__color__white"}></div>
      <div
        className={"circle font_16_400 bg__transparent__color__gray bg__green__color__white"}>{numeric.e2p(2 + "")}</div>
      <div className={"wizard__line bg__green__color__white"}></div>
      <div
        className={"circle font_16_400 bg__transparent__color__gray bg__green__color__white"}>{numeric.e2p(3 + "")}</div>
    </div>
    {/*  */}
    <div>&nbsp;</div>
    <div className={"mt-4  "}>

      <div className={"result__wizard"}>

        <div className={"mt-4"}> اطلاعات با موفقیت ثبت شد.
          پس از 9 دقیقه سامانه آماده میشود....
        </div>
        <div className={"mt-4"} style={{zoom: '500%'}}>
          👨‍💻
        </div>
      </div>

    </div>


    {/*  */}


  </>


  return (
    <>
      <Header/>
      <div className={"my-5 py-5"}>
        <div className={"d-flex justify-content-center align-items-center"}>
          <div className={" "} style={{width: 510}}>
            <div className={"wizard__title mb-5"}> ثبت اطلاعات</div>

            {fillStatus === "1" ?
              step1 : fillStatus === "2" ?
                step2 : fillStatus === "3" ?
                  step3 : step4}
          </div>

        </div>

      </div>
    </>
  );
};

export default Wizard;

const CancelButton = () => {
  const navigateTo = useNavigate()
  return <Button
    onClick={() => navigateTo('/')}
    className={"my-4 btn__empty cursor_pointer"}>{"انصراف"}</Button>
}
