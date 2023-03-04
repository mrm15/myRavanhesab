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
    setData({
      ...data,
      hasTrial:
        location.state !== null ? location.state.data : false
    })
  })

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


    axios.post("newTrialPanelUser/", data).then(res => {

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
    <div>
      <div className={"bg__section___selectedProduct"}>

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
                style={{width: "max(500px,50%)", margin: "0 auto", border: "1px solid", borderRadius: 15}}
                className={"bg-light px-5 py-1"}
              >
                <div className={"alert alert-light"}>
                  شرایط و قوانین استفاده از بازه ی هفت روزه کوتاه مدت:
                  در اینجا یک متن خیلی خوب در حد یک پاراگراف قرار میدیم که کاربر بخونه و بعدش فرم رو پر کنه تا بتونه از
                  صفحه ی تستی ما استفاده کنه. همین و قراره این متن تکرار بشه
                  در اینجا یک متن خیلی خوب در حد یک پاراگراف قرار میدیم که کاربر بخونه و بعدش فرم رو پر کنه تا بتونه از
                  صفحه ی تستی ما استفاده کنه. همین و قراره این متن تکرار بشه
                  در اینجا یک متن خیلی خوب در حد یک پاراگراف قرار میدیم که کاربر بخونه و بعدش فرم رو پر کنه تا بتونه از
                  صفحه ی تستی ما استفاده کنه. همین و قراره این متن تکرار بشه
                  در اینجا یک متن خیلی خوب در حد یک پاراگراف قرار میدیم که کاربر بخونه و بعدش فرم رو پر کنه تا بتونه از
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
                              <EyeShow />
                            </div>
                            :
                            <div
                              onClick={() => setData({...data, typeOfInput: "password"})}
                            >
                              <EyeHide />
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
        {/*<div className={"padding_top_80"}>*/}
        {/*  <div className={"title__bar"}>{tr.ravanhesab_software}</div>*/}
        {/*  <div className={"sub__title__bar mb-2  mt-4"}>{tr.select_your_plan}</div>*/}
        {/*  <div ref={planItemsRef} className={"position-relative "}>*/}
        {/*    <div className={"position-absolute w-100 bg_plans"}>*/}
        {/*      /!*123*!/*/}
        {/*      /!*<BgPlans />*!/*/}
        {/*    </div>*/}

        {/*    <ul className={"nav nav-pills d-flex justify-content-around w_770 mb-2 mx-auto"} id="pills-tab"*/}
        {/*        role="tablist">*/}
        {/*      <li className="nav-item" role="presentation">*/}

        {/*        <button onClick={() => selectMonthHandler("month")}*/}
        {/*                className={"nav-link " + (cart.planTime === '' || cart.planTime === 'month' ? " active " : " ")}*/}
        {/*                id="pills-tab_month_1"*/}
        {/*                data-bs-toggle="pill" data-bs-target="#month_1"*/}
        {/*                type="button" role="tab" aria-controls="pills-home" aria-selected="true">یک ماهه*/}
        {/*        </button>*/}
        {/*      </li>*/}
        {/*      <li className="nav-item" role="presentation">*/}
        {/*        <button onClick={() => selectMonthHandler("month_3")}*/}
        {/*                className={"nav-link " + (cart.planTime === 'month_3' ? " active " : " ")}*/}
        {/*                id="pills-tab_month_3"*/}
        {/*                data-bs-toggle="pill" data-bs-target="#month_3"*/}
        {/*                type="button" role="tab" aria-controls="pills-profile" aria-selected="false">سه ماهه*/}
        {/*        </button>*/}
        {/*      </li>*/}
        {/*      <li className="nav-item" role="presentation">*/}
        {/*        <button onClick={() => selectMonthHandler("month_6")}*/}
        {/*                className={"nav-link " + (cart.planTime === 'month_6' ? " active " : " ")}*/}
        {/*                id="pills-tab_month_6"*/}
        {/*                data-bs-toggle="pill" data-bs-target="#month_6"*/}
        {/*                type="button" role="tab" aria-controls="pills-contact" aria-selected="false">شش ماهه*/}
        {/*        </button>*/}
        {/*      </li>*/}
        {/*      <li className="nav-item" role="presentation">*/}
        {/*        <button onClick={() => selectMonthHandler("month_12")}*/}
        {/*                className={"nav-link " + (cart.planTime === 'month_12' ? " active " : " ")}*/}
        {/*                id="pills-tab_month_12"*/}
        {/*                data-bs-toggle="pill"*/}
        {/*                data-bs-target="#month_12"*/}
        {/*                type="button" role="tab" aria-controls="pills-contact" aria-selected="false">یک ساله*/}
        {/*        </button>*/}
        {/*      </li>*/}
        {/*    </ul>*/}


        {/*    <div className="" id="">*/}
        {/*      <div className="" id="" role="" aria-labelledby="">*/}
        {/*        {dataShow.length > 0 && <MonthSection*/}
        {/*          // changeItemCheck={changeItemCheck}*/}
        {/*          planTime={planTime}*/}
        {/*          onSelectPlan={onSelectPlan}*/}
        {/*          dataHolder={dataShow}*/}
        {/*          modules={modules}*/}
        {/*          selectSingleModule={selectSingleModule}*/}
        {/*          currentPlanId={cart.planId}*/}
        {/*          cart={cart}*/}
        {/*        />}*/}
        {/*      </div>*/}
        {/*      /!*<div className="tab-pane " id="month_3" role="tabpanel" aria-labelledby="pills-tab_month_3">*!/*/}
        {/*      /!*  <MonthSection changeItemCheck={changeItemCheck} planTime={"month_3"} onSelectPlan={onSelectPlan}*!/*/}
        {/*      /!*                dataHolder={dataHolder['month_3']}/>*!/*/}
        {/*      /!*</div>*!/*/}
        {/*      /!*<div className="tab-pane " id="month_6" role="tabpanel" aria-labelledby="pills-tab_month_6">*!/*/}
        {/*      /!*  <MonthSection changeItemCheck={changeItemCheck} planTime={"month_6"} onSelectPlan={onSelectPlan}*!/*/}
        {/*      /!*                dataHolder={dataHolder['month_6']}/>*!/*/}
        {/*      /!*</div>*!/*/}
        {/*      /!*<div className="tab-pane show active" id="month_12" role="tabpanel" aria-labelledby="pills-tab_month_12">*!/*/}
        {/*      /!*  <MonthSection changeItemCheck={changeItemCheck} planTime={"month_12"} onSelectPlan={onSelectPlan}*!/*/}
        {/*      /!*                dataHolder={dataHolder['month_12']}/>*!/*/}
        {/*      /!*</div>*!/*/}
        {/*    </div>*/}


        {/*    /!*{console.log(data)}*!/*/}

        {/*    /!*{data.map((v, index) => <React.Fragment key={index + ""}>*!/*/}
        {/*    /!*  <>*!/*/}
        {/*    /!*    <div className={"single__package"}>*!/*/}

        {/*    /!*      <div className={"package__width__header"} style={{*!/*/}
        {/*    /!*        // 'background': `url(${v.pictureUrl})`,*!/*/}
        {/*    /!*        // 'backgroundSize': '200px 100px',*!/*/}
        {/*    /!*      }}>*!/*/}
        {/*    /!*        <div className={"top__hand__section"}>*!/*/}
        {/*    /!*          <BasketTopHand/>*!/*/}
        {/*    /!*        </div>*!/*/}
        {/*    /!*        <div className={"p-4"}>*!/*/}
        {/*    /!*          _{v.planId}_*!/*/}
        {/*    /!*          _{v.planTitle}_ &nbsp;*!/*/}
        {/*    /!*          {totalPriceState[index].totalPrice}*!/*/}
        {/*    /!*          /!*_{totalPriceState[planTime].filter(x => x.planId === v.planId)[0].totalPrice}_*!/*!/*/}
        {/*    /!*          <br/>*!/*/}
        {/*    /!*          {v.totalPrice}*!/*/}
        {/*    /!*          /!*  <React.Fragment key={indexItem + ""}>*!/*!/*/}
        {/*    /!*          /!*    {items.totalPrice}*!/*!/*/}
        {/*    /!*          /!*  </React.Fragment>*!/*!/*/}
        {/*    /!*          /!*  : <></>)*!/*!/*/}
        {/*    /!*          /!*}*!/*!/*/}
        {/*    /!*        </div>*!/*/}
        {/*    /!*      </div>*!/*/}
        {/*    /!*      /!* آیتم ها *!/*!/*/}
        {/*    /!*      <div className={"package__width__body"}>*!/*/}
        {/*    /!*        /!*{console.log(v.data)}*!/*!/*/}
        {/*    /!*        {v.data.map((item, indexNumber) => <React.Fragment key={indexNumber + ""}>*!/*/}
        {/*    /!*          {item.fixed ? <div className={"py-1"}>*!/*/}
        {/*    /!*            /!*{console.log(item)}*!/*!/*/}
        {/*    /!*            /!*{item.itemId}*!/*!/*/}
        {/*    /!*            {item.title}*!/*/}
        {/*    /!*            /!*{item.price}*!/*!/*/}
        {/*    /!*          </div> : <div className={"form__control__check__box"}>*!/*/}
        {/*    /!*            <Input id={v.planId + "" + item.itemId + "" + indexNumber}*!/*/}
        {/*    /!*                   onChange={(event) => changeItemCheck(event, v.planId, item.price, item.itemId, item.title)}*!/*/}
        {/*    /!*                   type="checkbox"*!/*/}
        {/*    /!*                   value={item.price}/>*!/*/}
        {/*    /!*            <label htmlFor={v.planId + "" + item.itemId + "" + indexNumber}>*!/*/}
        {/*    /!*              <div style={{direction: "rtl"}}>*!/*/}
        {/*    /!*                <span>_{item.itemId}_</span><span>_{item.title}_</span><span>_{item.price}_</span>*!/*/}
        {/*    /!*              </div>*!/*/}
        {/*    /!*            </label>*!/*/}
        {/*    /!*          </div>}*!/*/}
        {/*    /!*        </React.Fragment>)}*!/*/}
        {/*    /!*      </div>*!/*/}
        {/*    /!*      <div*!/*/}
        {/*    /!*        className={"add__To__card__section"}*!/*/}
        {/*    /!*      >*!/*/}
        {/*    /!*        <div*!/*/}
        {/*    /!*          onClick={(event) => onSelectPlan(event, v.planId)}*!/*/}
        {/*    /!*          className={"p-2"}>{tr.add_to_card}</div>*!/*/}
        {/*    /!*      </div>*!/*/}
        {/*    /!*    </div>*!/*/}
        {/*    /!*  </>*!/*/}
        {/*    /!*</React.Fragment>)}*!/*/}

        {/*  </div>*/}
        {/*</div>*/}
      </div>

    </div>
  );
};

export default RequestDemo;
