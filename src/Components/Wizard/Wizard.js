import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import {useLocation} from "react-router-dom";
import numeric from "../utils/NumericFunction";
import tr from "../translate/translate";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {toast} from "react-toastify";
import {upload} from "@testing-library/user-event/dist/upload";

const Wizard = () => {


  const [data, setData] = useState({
    shopName: "",
    logo: {},
    phoneNumber: "",
    province: "",
    city: "",
    subDomain: "",

  })
  const [fillStatus, setFillStatus] = useState("1");
  const [backEndData, setBackendData] = useState({})
  const location = useLocation();
  useEffect(() => {
    if (location) {
      setBackendData(location.state)
    }


  })


  const submitSection1From = () => {
    let shopName = data.shopName;
    shopName = shopName.trim()

    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(shopName)) {
      toast.error("Erro")
      return
    }
        if ( shopName.length<3) {
      toast.error("لطفا نام فروشگاه را وارد کنید.")
      return
    }

    if(data.logo.name===undefined){
      toast.error("لوگو فروشگاه بارگزاری نشده است.");
      return;
    }
    debugger
    setFillStatus("2")
  };

  const uploadFileInState = (file) => {

    console.log(file);
    setData(ps => {
      const temp = {...ps}
      temp.logo = file;
      return temp;
    })

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
              <div style={{direction:"ltr"}}>{data.logo.name.length>45 ? data.logo.name.substring(0,15)+" .. " +  data.logo.name.substring(data.logo.name.length-10,data.logo.name.length):  data.logo.name}</div> :
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


      <Button
        // onClick={submitRegisterForm}
        className={"my-4 btn__empty cursor_pointer"}>{"انصراف"}</Button>
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
              <div style={{direction:"ltr"}}>{data.logo.name.length>45 ? data.logo.name.substring(0,15)+" .. " +  data.logo.name.substring(data.logo.name.length-10,data.logo.name.length):  data.logo.name}</div> :
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


      <Button
        // onClick={submitRegisterForm}
        className={"my-4 btn__empty cursor_pointer"}>{"انصراف"}</Button>
      <Button
        onClick={submitSection1From}
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
