import React, {useEffect, useRef, useState} from 'react';
import Styles from "./Login.module.css"
import computer__icon from "./computer__icon.png"
import Button from "../UI/Button";
import BoxShadow from "../UI/BoxShadow";
import Input from "../UI/Input";
import tr from "../translate/translate";
import {useLocation, useNavigate} from "react-router-dom";
import Loader from "../Loader/Loader";
import {toast} from "react-toastify";
import axios from "axios";
import {BackInLoginCode} from "../../Assets/svg/index"
import f from "../../utils/UtilsFunction";

const Login = (props) => {
  // const prefixUrl = localStorage.getItem("apiUrl");
  const [registerFormData, setRegisterFormData] = useState({
    name: "", family_name: '', phone_number: '',
  })

  const [isLoading, setIsLoading] = useState(false);
  const [showRegisterFormSection, setShowRegisterFormSection] = useState(true);
  const [showLoginFromSection, setShowLoginFromSection] = useState(false);
  const [status, setStatus] = useState(""); // loginForm or RegisterForm
  const [showEnterCodeSection, setShowEnterCodeSection] = useState(false);
  const [code, setCode] = useState({
    firstDigit: '', secondDigit: '', thirdDigit: '', fourthDigit: '', fifthDigit: '',
  });

  const myLocation = useLocation()

  useEffect(() => {
    debugger
    const state = myLocation.pathname;
    debugger
    if (state === "/register") {

      setIsLoading(false)
      setShowLoginFromSection(false)
      setShowRegisterFormSection(true)

    } else  {
      setIsLoading(false)
      setShowLoginFromSection(true)
      setShowRegisterFormSection(false)
    }
  }, [])

  // میخواد ثبت نام کنه
  const submitRegisterForm = () => {

    // ریجکس تست کن ببین کاراکتر های عجیب داره یا نه؟
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(registerFormData.name)) {
      toast.error("Erro")
      return
    }

    if (registerFormData.name === '') {
      toast.error(tr.enter_name)
      return
    }
    if (f.stringContainsNumber(registerFormData.name)) {
      toast.error(tr.number_in_name_not_allowed)
      return
    }
    if (registerFormData.family_name === '') {
      toast.error(tr.enter_family)
      return
    }
    if (f.stringContainsNumber(registerFormData.family_name)) {
      toast.error(tr.number_in_family_name_not_allowed)
      return
    }

    if (registerFormData.phone_number === '') {
      toast.error(tr.enter_mobile)
      return
    }
    // debugger
    if (registerFormData.phone_number.length !== 11 || registerFormData.phone_number[0] !== "0") {
      toast.error(tr.enter_a_valid_phone_number)
      return
    }
    // const data = new FormData();
    // data.append('id', `tea is So hot`);
    // data.append('type', 'clodth');

    // axios.post(prefixUrl + "sendRegisterCode/", registerFormData).then((r) => {
    axios.post("sendRegisterCode/", registerFormData)

      .then((r) => {
        if (r.data.status) {
          toast.success(r.data.message);
          setShowLoginFromSection(false);
          setShowRegisterFormSection(false);
          setShowEnterCodeSection(true);
          setStatus("registerForm");
        } else {
          toast.warning(r.data.message);
        }
      }).catch((error) => {
      debugger;
      console.log(error)
    })

  }

  // شماره وارد کرده میخواد وارد بشه
  const submitLoginForm = () => {
    if (registerFormData.phone_number === '') {
      toast.error(tr.enter_mobile)
      return
    }
    if (registerFormData.phone_number.length !== 11 || registerFormData.phone_number[0] !== "0") {
      toast.error(tr.enter_a_valid_phone_number)
      return
    }

    const phone_number = registerFormData.phone_number
    axios.post("sendLoginCode/", {phone_number}).then((r) => {
      if (r.data.status) {
        setStatus("loginForm")
        setShowRegisterFormSection(false)
        setShowLoginFromSection(false)
        setShowEnterCodeSection(true)
        toast.success(r.data.message)
        // temp code 
        //😅 اگه آقای مهندس طاعری نبود این خط کد داره کد رو توی ریسپانس به من بر میگردونه 😅
        if (r.data.code) {
          alert(r.data.code)
        }
      } else {
        toast.error(r.data.message)
      }
    }).catch(error => {

    })


  };

  //   تایید کد (ورود یا ثبت نام)
  const submitLoginCode = () => {
    // check If Enter Codes
    if (code.fifthDigit === '' || code.secondDigit === '' || code.thirdDigit === '' || code.fourthDigit === '' || code.fifthDigit === '') {
      toast.error("در وارد کردن کد دقت کنید")
      return;
    }
    let data = {
      'verify_code': +(code.firstDigit + "" + code.secondDigit + "" + code.thirdDigit + "" + code.fourthDigit + "" + code.fifthDigit)
    }

    let requestUrl = ""
    if (status === "registerForm") {
      // اگه  قرار بود ثبت نام کنه مقادیر اطلاعات فرم رو میچسبونم به دیتا
      data = {...data, ...registerFormData}
      requestUrl = "registerConfirm/"
    } else {
      // login check
      data = {...data, ...registerFormData}
      requestUrl = "loginConfirm/"
    }
    axios.post( requestUrl, data).then((r) => {
      // console.log(r.data)
      if (r.data.status) {
        toast.success(r.data.message)
        // debugger
        localStorage.setItem("token", r.data.token)
        // props.setToken(r.data.token)
        props.setIsLogin(true) // will navigate to dashboard
        // navigateTo("/Dashboard")
      } else {
        toast.error(r.data.message)
      }
    })


    // setShowRegisterFormSection(false)
    // setShowLoginFromSection(false)
    // setShowLoginCodeSection(true)
    // setCurrentStatus("loginForm")
    // debugger

  };

  const putCodeInPlace = (t,idT,valueT)=>{
    idT === "1" ?
      t.firstDigit = valueT :
      idT === "2" ?
        t.secondDigit = valueT :
        idT === "3" ?
          t.thirdDigit = valueT :
          idT === "4" ?
            t.fourthDigit = valueT :
            idT === "5" ?
              t.fifthDigit = valueT :
              t.none = "";
    return t

  }
  const OnKeyUpCode = (event) => {
    // debugger
    if (event.target.value.length > 1) {
      event.target.value = event.target.value[0]
    }
    const acceptedKeys = '1234567890';
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      const t = {...code}
      setCode(putCodeInPlace(t,event.target.id,event.target.value))
      if (event.target.previousElementSibling === null) {
        event.target.value = ''
      } else {
        event.target.value = ''
        event.target.previousElementSibling.focus()
        event.target.previousElementSibling.select()
      }
    } else if (event.key === 'Tab') {
      if (event.target.nextElementSibling !== null) {
        event.target.nextElementSibling.select()
      } else {
        document.getElementById("buttonToFocusAfterLastDigit").focus();
      }
    } else if (acceptedKeys.includes(event.key)) {
      const t = {...code}
      setCode(putCodeInPlace(t,event.target.id,event.target.value))
      if (event.target.nextElementSibling === null) {
        document.getElementById("buttonToFocusAfterLastDigit").focus();
      } else {
        // event.target.nextElementSibling.value = ''
        event.target.nextElementSibling.focus()
        event.target.nextElementSibling.select()
      }
    } else {
      event.target.value = ''
    }
  }
  const onClickInputCodes = (event) => event.target.select()


  function clickOnRegisterText() {
    setShowLoginFromSection(false)
    setShowEnterCodeSection(false)
    setShowRegisterFormSection(true)
  }

  function backBtnInCodeEnter() {
    if (status === "loginForm") {
      setShowRegisterFormSection(false)
      setShowEnterCodeSection(false)
      setShowLoginFromSection(true)
    } else if (status === "registerForm") {
      setShowEnterCodeSection(false)
      setShowLoginFromSection(false)
      setShowRegisterFormSection(true)
    } else {
      toast("بازگشتی نیست")
    }
  }

  return (<div className={Styles.container}>
      {isLoading ? <Loader/> : <>
        {showLoginFromSection && <>
          <div className={"d-flex justify-content-around align-content-center margin_top_5"}>
            <div className={"margin_top_4 d-none d-md-block"}>
              <div className="">
                <img src={computer__icon} alt={tr.welcome_to_my_ravanhesab}/>
              </div>
            </div>
            <div className={"my-3"}>
              <div className={"my-1 text-center"}>
                {tr.welcome_to_my_ravanhesab}
              </div>
              <BoxShadow>
                <div>&nbsp;</div>
                <div className={"mx-5 mt-4"}>
                  <label htmlFor={tr.mobile} className={"d-block  text-end  my-1"}>{tr.mobile}</label>
                  <Input className={"input__bg__login width__345 my-2"} id={tr.mobile} placeholder={tr.enter_mobile} type="number"
                         value={registerFormData.phone_number}
                         onChange={event => {
                           setRegisterFormData(ps => {
                             const temp = {...ps}
                             temp.phone_number = event.target.value
                             return temp
                           })
                         }}
                         onKeyUp={(event) => event.key === 'Enter' && submitLoginForm()}

                  />

                </div>
                <div className={" text-center"}>
                  <Button onClick={submitLoginForm} className={"my-4 greenBtn"}>{tr.send_login_code}</Button>
                </div>
                <div className={"mx-5 my-2"}>
                  <div className={"d-block  text-end  py-4"}>
                    {tr.u_dont_have_Account + " "}
                    <span
                      className={"cursor_pointer text-danger"}
                      onClick={clickOnRegisterText}>
                       {tr.register_in_web}
                    </span>
                  </div>
                </div>
              </BoxShadow>
            </div>
          </div>
        </>}
        {showEnterCodeSection && <>
          <div className={"d-flex justify-content-around align-content-center margin_top_5"}>
            <div className={"margin_top_4 d-none d-md-block"}>
              <div className="">
                <img src={computer__icon} alt={tr.welcome_to_my_ravanhesab}/>
              </div>
            </div>
            <div className={"my-3"}>
              <div className={"my-1 text-center"}>
                {tr.welcome_to_my_ravanhesab}
              </div>
              <BoxShadow className={"position-relative"} style={{width: "435px"}}>
                <div
                  title={tr.back}
                  className={"position-absolute"}
                  onClick={backBtnInCodeEnter}
                  style={{top: 10, left: 10}}
                ><BackInLoginCode/></div>
                <div>&nbsp;</div>
                <div className={"mx-5 mt-4"}>
                  <label className={"d-block  text-end  my-1"}>{tr.code_sended_to_numer} <span
                    className={"green__color fd-font"}>{registerFormData.phone_number}</span> {tr.ra}{tr.enter}</label>
                  {/*<Input className={"input__bg__login width__345 my-2"} id={tr.mobile} placeholder={tr.enter_mobile} type="number"/>*/}
                  {/*<Input className={"input__bg__login width__345 my-2"} id={tr.mobile} placeholder={tr.enter_mobile} type="number"/>*/}
                  {/*<Input className={"input__bg__login width__345 my-2"} id={tr.mobile} placeholder={tr.enter_mobile} type="number"/>*/}
                  {/*<Input className={"input__bg__login width__345 my-2"} id={tr.mobile} placeholder={tr.enter_mobile} type="number"/>*/}
                  {/*<Input className={"input__bg__login width__345 my-2"} id={tr.mobile} placeholder={tr.enter_mobile} type="number"/>*/}
                  <div className={"d-flex justify-content-center text-center "}>
                    <div className={"d-flex justify-content-around mt-4 width__195 ltr"}>
                      <input id={"1"} onClick={onClickInputCodes} autoFocus={true} onKeyUp={OnKeyUpCode}
                             className={"custom__input__login__code "} type={"number"} defaultValue={""} minLength={1}
                             maxLength={1}/>
                      <input id={"2"} onClick={onClickInputCodes} onKeyUp={OnKeyUpCode}
                             className={"custom__input__login__code "}
                             type={"number"} defaultValue={""} minLength={1} maxLength={1}/>
                      <input id={"3"} onClick={onClickInputCodes} onKeyUp={OnKeyUpCode}
                             className={"custom__input__login__code "}
                             type={"number"} defaultValue={""} minLength={1} maxLength={1}/>
                      <input id={"4"} onClick={onClickInputCodes} onKeyUp={OnKeyUpCode}
                             className={"custom__input__login__code "}
                             type={"number"} defaultValue={""} minLength={1} maxLength={1}/>
                      <input id={"5"} onClick={onClickInputCodes} onKeyUp={OnKeyUpCode}
                             className={"custom__input__login__code "}
                             type={"number"} defaultValue={""} minLength={1} maxLength={1}/>
                    </div>
                  </div>
                </div>
                <div className={" text-center"}>
                  <Button id={"buttonToFocusAfterLastDigit"} onClick={submitLoginCode}
                          className={"my-4 greenBtn"}>{tr.verify_number}
                  </Button>
                </div>
                <div className={"mx-5 my-2"}>
                  <div className={"d-block  text-end  py-4"}>
                    {tr.u_dont_have_Account + " "}
                    <span
                      className={"cursor_pointer text-danger"}
                      onClick={clickOnRegisterText}>
                       {tr.register_in_web}
                    </span>
                  </div>
                </div>
              </BoxShadow>
            </div>
          </div>
        </>}
        {showRegisterFormSection && <>
          <div className={"d-flex justify-content-around align-content-center margin_top_5"}>
            <div className={"margin_top_4 d-none d-md-block"}>
              <div className="">
                <img src={computer__icon} alt={tr.welcome_to_my_ravanhesab}/>
              </div>
            </div>
            <div className={"my-3"}>
              <div className={"my-1 text-center"}>
                {tr.welcome_to_my_ravanhesab}
              </div>
              <BoxShadow>
                <div>&nbsp;</div>
                <div className={"mx-5 mt-4"}>
                  <label htmlFor={tr.name} className={"d-block  text-end  my-1"}>{tr.name}</label>
                  <Input className={"input__bg__login width__345 my-2"} id={tr.name} placeholder={tr.enter_name} type="text"

                         onChange={event => setRegisterFormData(ps => {
                           const temp = {...ps}
                           temp.name = event.target.value
                           return temp
                         })}
                         value={registerFormData.name}
                  />
                </div>
                <div className={"mx-5 mt-4"}>
                  <label htmlFor={tr.family} className={"d-block  text-end  my-1"}>{tr.family}</label>
                  <Input className={"input__bg__login width__345 my-2"} id={tr.family} placeholder={tr.enter_family} type="text"
                         value={registerFormData.family_name}
                         onChange={event => setRegisterFormData(ps => {
                           const temp = {...ps}
                           temp.family_name = event.target.value
                           return temp
                         })}
                  />
                </div>
                <div className={"mx-5 mt-4"}>
                  <label htmlFor={tr.mobile} className={"d-block  text-end  my-1"}>{tr.mobile}</label>
                  <Input className={"input__bg__login width__345 my-2"} id={tr.mobile} placeholder={tr.enter_mobile} type="number"
                         value={registerFormData.phone_number}
                         onChange={event => setRegisterFormData(ps => {
                           const temp = {...ps}
                           temp.phone_number = event.target.value
                           return temp
                         })}
                  />
                </div>
                <div className={" text-center"}>

                  <Button onClick={submitRegisterForm} className={"my-4 greenBtn"}>{tr.register}</Button>
                </div>
                <div className={"mx-5 my-2"}>
                  <div className={"d-block  text-end  py-4"}>
                    {tr.do_u_have_Account + " "}

                    <span
                      className={"cursor_pointer text-danger"}
                      onClick={() => {
                        setShowLoginFromSection(true)
                        setShowRegisterFormSection(false)
                      }}>
                       {tr.login}
                    </span>
                  </div>
                </div>
              </BoxShadow>
            </div>
          </div>
        </>}


      </>}

    </div>

  );
};

export default Login;
