import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import {Link, useLocation} from "react-router-dom";
import {BasketRounded, BasketRoundedFill, EyeHide, EyeShow} from "../../Assets/svg";
import numeric from "../utils/NumericFunction";
import tr from "../translate/translate";
import MonthSection from "../SelectedProductType/MonthSection";
import Input from "../UI/Input";
import Button from "../UI/Button";
import axios from "axios";
import {toast} from "react-toastify";
import f from "../../utils/UtilsFunction";

const RequestDemo = () => {
  const location = useLocation();

  const [hasTrial, setHasTrial] = useState(false)
  const [data, setData] = useState({
    username: "",
    password: "",
    typeOfInput: "password",
    productId: "",
    hasTrial: false,
  })
  useEffect(() => {
    console.log(location)
    setData({
      ...data,
      hasTrial:
        location.state !== null ? location.state.data : false,
      productId: location.state.productId,
    })
  }, [])

  const submit = () => {


    const dataToSend = {...data};
    delete dataToSend.hasTrial;
    delete dataToSend.typeOfInput;
    if (dataToSend.password.length < 8) {
      toast.info("رمز عبور باید حداقل 8 کاراکتر باشد.")
      return
    }
    if (dataToSend.username.length < 5 || f.hasBadCharacter(dataToSend.username)) {
      toast.info("نام کاربری معتبر نیست.")
      return
    }


    axios.post("newTrialPanelUser/", dataToSend).then(res => {

      const data = res.data
      if (data.status) {
        toast.success(data.message)
        toast.error("کارهای بعد از ثبت درخواست دمو در اینجا")

      } else {
        toast.error(data.message)
      }


    })

  }
  return (
    <div className={''}>
      <div className={"bg__section___selectedProduct"}>
        <div className={'nice__bg'}>


          <Header>
            <div>
              <div>
                <>
                  {/*<>آیدی پلن انتخابی: {cart.planId}</>*/}
                  {/*&nbsp;&nbsp;|&nbsp;&nbsp;*/}
                  {/*<>زمان پلن انتخابی: {cart.planTime}</>*/}
                  {/*&nbsp;&nbsp;|&nbsp;&nbsp;*/}
                  {/*<>تیک های پلن انتخابی: {cart.modules.map(v => <>{v.moduleName} _ {v.modulePrice}</>)}</>*/}
                  {/*&nbsp;&nbsp;|&nbsp;&nbsp;*/}

                </>
              </div>
              {/*<div className={"d-flex  align-items-center"}>*/}

              {/*  {(cart.modules.length > 0 || cart.planId !== 0) ?*/}
              {/*    <div onClick={cardClickHandler} className={"position-relative cursor_pointer"}>*/}
              {/*      <BasketRoundedFill/>*/}
              {/*      <div className={"number__basket"}>*/}
              {/*        <div className={"number__basket_number"}> {numeric.e2p(counter + "")}</div>*/}
              {/*      </div>*/}
              {/*    </div> :*/}
              {/*    <div title={"سبد خرید خالی..."} className={"position-relative cursor_pointer"}><BasketRounded/></div>}*/}
              {/*  /!**!/*/}
              {/*</div>*/}
              {/*<div className={"d-none"}>*/}
              {/*  جمع کل : {numeric.e2p(cart.totalPrice.toLocaleString())} {tr.currency_unit}*/}
              {/*</div>*/}
            </div>
          </Header>

          <div className={"padding_top_80"}>
            {data.hasTrial ?
              <>
                <div
                  style={{width: "max(500px,50%)", margin: "0 auto",


                    borderRadius: 15}}
                  className={"bg-light px-5 py-1"}
                >
                  <div className={" px-1 py-5 alert-light"}>
                    شرایط و قوانین استفاده از بازه ی هفت روزه کوتاه مدت:
                    در اینجا یک متن خیلی خوب در حد یک پاراگراف قرار میدیم که کاربر بخونه و بعدش فرم رو پر کنه تا بتونه
                    از
                    صفحه ی تستی ما استفاده کنه. همین و قراره این متن تکرار بشه
                    در اینجا یک متن خیلی خوب در حد یک پاراگراف قرار میدیم که کاربر بخونه و بعدش فرم رو پر کنه تا بتونه
                    از
                    صفحه ی تستی ما استفاده کنه. همین و قراره این متن تکرار بشه
                    در اینجا یک متن خیلی خوب در حد یک پاراگراف قرار میدیم که کاربر بخونه و بعدش فرم رو پر کنه تا بتونه
                    از
                    صفحه ی تستی ما استفاده کنه. همین و قراره این متن تکرار بشه
                    در اینجا یک متن خیلی خوب در حد یک پاراگراف قرار میدیم که کاربر بخونه و بعدش فرم رو پر کنه تا بتونه
                    از
                    صفحه ی تستی ما استفاده کنه. همین و قراره این متن تکرار بشه
                  </div>
                  <div>

                    <div className={"mt-4"}>
                      <label htmlFor={"phoneNumber"} className={"d-block  text-end  my-1"}>{"نام کاربری"}</label>
                      <Input
                        className={"ltr width__345 my-2  w-100 bg__white text-center"}
                        id={"phoneNumber"}
                        type="text"
                        placeholder={"نام کاربری دلخواه"}
                        value={data.username}
                        onChange={(e) => {
                          setData({...data, username: e.target.value})
                        }}
                        name={"no-Name"}
                        autoComplete={"off"}
                      />
                    </div>


                    <div className={" mt-4"}>
                      <label htmlFor={"phoneNumber"}
                             className={"d-block  text-end  my-1"}>{"یک رمز عبور انتخاب کنید."}</label>
                      <div className={"position-relative"}>
                        <div className={"position-relative"}>
                          <div className={"position-absolute"}
                               style={{left: "2%", top: "35%", zIndex: 2}}
                          >
                            {data.typeOfInput === "password" ?
                              <div
                                onClick={() => setData({...data, typeOfInput: "text"})}
                              >
                                <EyeShow/>
                              </div>
                              :
                              <div
                                onClick={() => setData({...data, typeOfInput: "password"})}
                              >
                                <EyeHide/>
                              </div>
                            }
                          </div>

                          <Input
                            className={"ltr width__345 my-2  w-100 bg__white text-center"}
                            id={"phoneNumber"}
                            type={data.typeOfInput}
                            placeholder={"رمز عبور دلخواه"}
                            value={data.password}
                            onChange={(e) => {
                              setData({...data, password: e.target.value})
                            }}
                            autoComplete={"off"}
                          />
                        </div>
                      </div>

                    </div>


                    <div className={"mt-4 text-center"}>

                      <Button
                        onClick={submit}
                        className={"my-4 greenBtn cursor_pointer"}>
                        ثبت درخواست

                      </Button>

                    </div>

                  </div>


                </div>

              </>
              :
              <div style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <div className={"alert alert-danger"}>
                  مقادیر ورودی صحیح نیستند و شما نمیتوانید مجددا از دمو استفاده کنید.

                  <Link to={"/"}> صفحه اصلی</Link>
                </div>
              </div>

            }

          </div>
        </div>
      </div>

    </div>
  );
};

export default RequestDemo;
