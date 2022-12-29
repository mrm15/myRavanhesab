import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from "react-router-dom";
import Loader from "../Loader/Loader";
import Input from "../UI/Input";
import {BasketTopHand, BgPlans} from "../../Assets/svg";
import tr from "../translate/translate";
import axios from "axios";
import Button from "../UI/Button";
import {click} from "@testing-library/user-event/dist/click";
import MonthSection from "./MonthSection";
import SingleModule from "./SingleModule";
import f from "../../utils/UtilsFunction";
import numeric from "../utils/NumericFunction";

const SelectedProductType = (props) => {
  const prefixUrl = localStorage.getItem("apiUrl") + "ravanhesabPlans/";

  const reactLocation = useLocation();

  const [dataHolder, setDataHolder] = useState({})

  const [dataShow, setDataShow] = useState([])
  const [modules, setModules] = useState([])

  const [planTime, setPlanTime] = useState("month")
  console.log("planTime: " + planTime)

  // const [data, setData] = useState([])
  // const [planTime, setPlanTime] = useState("month") // || month, month_3, month_6, month_12
  // const [totalPriceState, setTotalPriceState] = useState([])

  const [card, setCard] = useState({
    planTime: "",
    planId: 0,
    planName: "",
    modules: [
      // {moduleId: 0, moduleName: "", modulePrice: 0}
    ],
    planPrice: 0,
    totalPrice: 0,
  })
  const selectTimeRef = useRef();
  const planItemsRef = useRef();

  const calculateTotalPrice = (temp) => {
    let sum = 0;
    // اول از همه بیا قیمت پایه رو بهش اضافه کن
    sum += +temp.planPrice;
    // حالا بیا ماژول ها رو هم حساب کنیم.
    temp.modules.forEach(v => {
      // debugger
      sum += +v.modulePrice;
    })
    // محل محاسبه جمع قیمت ماژول
    return sum;
  }
  useEffect(() => {
    if (reactLocation.state) {
      const id = reactLocation.state.id;
      axios.get(prefixUrl + "?id=" + id).then(r => {
        const backData = r.data.data;
        setDataHolder(backData) // نگه دارنده دیتا برای زمانی که زمان رو عوض کرد دیتا  و جمع کل دوباره ریست بشه
        setDataShow(backData.plans["month"].slice())
        setModules(backData.modules["month"].slice())
      });
    }
  }, [])


  // const changeItemCheck = (event, planId, price, itemId, itemTitle, planTime) => {
  //
  //   // اینجا خیلی مهمه
  //   //باید چک کنم آیا این تیکی که خورده الان جزو اونایی هست که توی سبد خریده؟
  //   // هم پلن تایم و هم پلن آیدی رو چک میکنیم.
  //   //اگه هر دوش برابر بود با همونی که توی سبد خریده
  //   // باید سبد خرید آپدیت بشه
  //   // اگه هم پلن آیدی و پلن تایم یکی نبود نباید سبد خرید آپدیت بشه
  //
  //   const temp_card = {...card}
  //   if (temp_card.planId === planId && temp_card.planTime === planTime) {
  //     if (event.target.checked) {
  //       //  اگه تیک زد ببینم اگه توی اون سبد خرید بخش آپشن مورد نبود قرارش بدم
  //       temp_card.options.filter(v => v.itemId === itemId).length === 0 && temp_card.options.push({
  //         planId: planId, itemId: itemId, value: event.target.value, itemTitle: itemTitle
  //       })
  //     } else {
  //       // اگه تیک برداشت ببین اگه توی آپشن بود حذفش کن
  //       const removeIndex = temp_card.options.map(item => item.itemId).indexOf(itemId);
  //       if (removeIndex !== -1) {
  //         temp_card.options.splice(removeIndex, 1);
  //       }
  //     }
  //
  //     temp_card.totalPrice = calculateTotalPrice(temp_card)
  //
  //
  //     setCard(temp_card)
  //   } else {
  //     //Just Do Nothing!
  //   }
  // };

  const removeBoxShadowFromSingleItem = () => {
    // debugger
    const singlePlanSelected = planItemsRef.current.querySelector(".set_box_shadow_to_singleItem")
    singlePlanSelected !== null && singlePlanSelected.classList.remove("set_box_shadow_to_singleItem")
    singlePlanSelected !== null && singlePlanSelected.querySelector(".bg__orange").classList.remove("bg__orange")
  }

  const addBoxShadowToSingleItem = (event) => {
    // debugger
    // event.target.parentElement.parentElement.parentElement.classList.add("set_box_shadow_to_singleItem");
    event.target.closest(".single__package").classList.add("set_box_shadow_to_singleItem");
    event.target.closest(".single__add__To__basket_button").classList.add("bg__orange");

  }

  function onSelectPlan(event, planId, options, planTime, planPrice) {
    // اول باید دور اونی که از قبل سایه داره رو حذف کنم
    // ضمنا اگه زمان رو عوض کرد باید از حالت انتخاب در بیاد و از استیت پاک بشه
    removeBoxShadowFromSingleItem()
    // بعد باید اونی که کلیک شده رو سایه بزنم
    addBoxShadowToSingleItem(event)
    // Lets Add to cardState
    setCard(prevState => {

      const temp = {...prevState}

      temp.planId = planId
      temp.options = options.filter(v => v.planId === planId)
      temp.planPrice = planPrice

      temp.totalPrice = calculateTotalPrice(temp)

      temp.planTime = planTime

      return temp;
    })
  }

  const selectMonthHandler = (str) => {
    setPlanTime(str);

    setCard(prevState => {
      const temp = {...prevState};
      temp.planTime = str;
      temp.totalPrice = calculateTotalPrice(temp)

      return temp;
    })


    setDataShow([...dataHolder.plans[str].slice()])
    setModules([...dataHolder.modules[str].slice()])
    // debugger
  }

  const selectSingleModule = (moduleId, moduleName, modulePrice) => {
    // const temp = {...card}

    const temp = f.copyObject(card);

    const filterLength = temp.modules.filter(v => v.moduleId === moduleId).length;
    if (filterLength === 0) {
      temp.modules.push({moduleId: moduleId, moduleName: moduleName, modulePrice: modulePrice})
    } else {
      temp.modules = temp.modules.filter(v => v.moduleId !== moduleId);
    }
    temp.totalPrice = calculateTotalPrice(temp);

    setCard(temp)


    // setCard(ps => {
    //   const temp = {...ps.slice()}
    //   const filterLength = temp.modules.filter(v => v.moduleId === moduleId).length;
    //   if (filterLength === 0) {
    //     temp.modules.push({moduleId: moduleId, moduleName: moduleName, modulePrice: modulePrice})
    //   } else {
    //     temp.modules = temp.modules.filter(v => v.moduleId !== moduleId);
    //   }
    //   temp.totalPrice = calculateTotalPrice(temp)
    //
    // })


  };
  return (<div>
    {Object.keys(dataHolder).length === 0 ? <Loader className={"center__Loader"}/> : <>

      <div style={{height: 55,
        width: "100%",
        position: "absolute",
        top: 0,
        background: '#fff',
        zIndex: 12,
        padding:15

      }}>


        <ul className={"d-flex align-content-center justify-content-between"}>
          <li>
            <>
              <>آیدی پلن انتخابی: {card.planId}</>&nbsp;&nbsp;|&nbsp;&nbsp;
              <>زمان پلن انتخابی: {card.planTime}</>&nbsp;&nbsp;|&nbsp;&nbsp;
              <>تیک های پلن انتخابی: {card.modules.map(v => <>{v.moduleName} _ {v.modulePrice}</>)}</>&nbsp;&nbsp;|&nbsp;&nbsp;
              {/*<span>ماژول های پلن انتخابی: {card.modules.map(v => <>{v},</>)}</span>&nbsp;&nbsp;|&nbsp;&nbsp;*/}

            </>
          </li>
          <li>
            جمع کل : {numeric.e2p(card.totalPrice.toLocaleString())} ريال
          </li>
        </ul>
      </div>
      <div>
        <div className={"title__bar"}>{tr.ravanhesab_software}</div>
        <div className={"sub__title__bar mb-2  mt-4"}>{tr.select_your_plan}</div>
        <div className={"w-100 d-block text-center"}>

          {/*<div ref={selectTimeRef} className={"d-flex justify-content-center removeOtherClassJs"}>*/}
          {/*  <div className={"mx-2 rounded p-2 " + "bg-info"}*/}
          {/*       onClick={(event) => changeTimeHandler(event, 'month')}>*/}
          {/*    یک ماهه*/}
          {/*  </div>*/}

          {/*  <div className={"mx-2 rounded p-2 "}*/}
          {/*       onClick={(event) => changeTimeHandler(event, 'month_3')}> سه ماهه*/}
          {/*  </div>*/}
          {/*  <div className={"mx-2 rounded p-2 "}*/}
          {/*       onClick={(event) => changeTimeHandler(event, 'month_6')}> شش ماهه*/}
          {/*  </div>*/}
          {/*  <div className={"mx-2 rounded p-2 "}*/}
          {/*       onClick={(event) => changeTimeHandler(event, 'month_12')}> یک ساله*/}
          {/*  </div>*/}
          {/*</div>*/}

        </div>
        <div ref={planItemsRef} className={"position-relative "}>
          <div className={"position-absolute w-100 bg_plans"}>
            {/*123*/}
            {/*<BgPlans />*/}
          </div>

          <ul className={"nav nav-pills d-flex justify-content-around w_770 mb-5 mx-auto"} id="pills-tab"
              role="tablist">
            <li className="nav-item" role="presentation">

              <button onClick={() => selectMonthHandler("month")} className="nav-link " id="pills-tab_month_1"
                      data-bs-toggle="pill" data-bs-target="#month_1"
                      type="button" role="tab" aria-controls="pills-home" aria-selected="true">یک ماهه
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button onClick={() => selectMonthHandler("month_3")} className="nav-link" id="pills-tab_month_3"
                      data-bs-toggle="pill" data-bs-target="#month_3"
                      type="button" role="tab" aria-controls="pills-profile" aria-selected="false">سه ماهه
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button onClick={() => selectMonthHandler("month_6")} className="nav-link" id="pills-tab_month_6"
                      data-bs-toggle="pill" data-bs-target="#month_6"
                      type="button" role="tab" aria-controls="pills-contact" aria-selected="false">شش ماهه
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button onClick={() => selectMonthHandler("month_12")} className="nav-link active" id="pills-tab_month_12"
                      data-bs-toggle="pill"
                      data-bs-target="#month_12"
                      type="button" role="tab" aria-controls="pills-contact" aria-selected="false">یک ساله
              </button>
            </li>
          </ul>


          <div className="" id="">
            <div className="" id="" role="" aria-labelledby="">
              {dataShow.length > 0 &&
                <MonthSection
                  // changeItemCheck={changeItemCheck}
                  planTime={planTime}
                  onSelectPlan={onSelectPlan}
                  dataHolder={dataShow}
                  modules={modules}
                  selectSingleModule={selectSingleModule}
                />
              }
            </div>
            {/*<div className="tab-pane " id="month_3" role="tabpanel" aria-labelledby="pills-tab_month_3">*/}
            {/*  <MonthSection changeItemCheck={changeItemCheck} planTime={"month_3"} onSelectPlan={onSelectPlan}*/}
            {/*                dataHolder={dataHolder['month_3']}/>*/}
            {/*</div>*/}
            {/*<div className="tab-pane " id="month_6" role="tabpanel" aria-labelledby="pills-tab_month_6">*/}
            {/*  <MonthSection changeItemCheck={changeItemCheck} planTime={"month_6"} onSelectPlan={onSelectPlan}*/}
            {/*                dataHolder={dataHolder['month_6']}/>*/}
            {/*</div>*/}
            {/*<div className="tab-pane show active" id="month_12" role="tabpanel" aria-labelledby="pills-tab_month_12">*/}
            {/*  <MonthSection changeItemCheck={changeItemCheck} planTime={"month_12"} onSelectPlan={onSelectPlan}*/}
            {/*                dataHolder={dataHolder['month_12']}/>*/}
            {/*</div>*/}
          </div>


          {/*{console.log(data)}*/}

          {/*{data.map((v, index) => <React.Fragment key={index + ""}>*/}
          {/*  <>*/}
          {/*    <div className={"single__package"}>*/}

          {/*      <div className={"package__width__header"} style={{*/}
          {/*        // 'background': `url(${v.pictureUrl})`,*/}
          {/*        // 'backgroundSize': '200px 100px',*/}
          {/*      }}>*/}
          {/*        <div className={"top__hand__section"}>*/}
          {/*          <BasketTopHand/>*/}
          {/*        </div>*/}
          {/*        <div className={"p-4"}>*/}
          {/*          _{v.planId}_*/}
          {/*          _{v.planTitle}_ &nbsp;*/}
          {/*          {totalPriceState[index].totalPrice}*/}
          {/*          /!*_{totalPriceState[planTime].filter(x => x.planId === v.planId)[0].totalPrice}_*!/*/}
          {/*          <br/>*/}
          {/*          {v.totalPrice}*/}
          {/*          /!*  <React.Fragment key={indexItem + ""}>*!/*/}
          {/*          /!*    {items.totalPrice}*!/*/}
          {/*          /!*  </React.Fragment>*!/*/}
          {/*          /!*  : <></>)*!/*/}
          {/*          /!*}*!/*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*      /!* آیتم ها *!/*/}
          {/*      <div className={"package__width__body"}>*/}
          {/*        /!*{console.log(v.data)}*!/*/}
          {/*        {v.data.map((item, indexNumber) => <React.Fragment key={indexNumber + ""}>*/}
          {/*          {item.fixed ? <div className={"py-1"}>*/}
          {/*            /!*{console.log(item)}*!/*/}
          {/*            /!*{item.itemId}*!/*/}
          {/*            {item.title}*/}
          {/*            /!*{item.price}*!/*/}
          {/*          </div> : <div className={"form__control__check__box"}>*/}
          {/*            <Input id={v.planId + "" + item.itemId + "" + indexNumber}*/}
          {/*                   onChange={(event) => changeItemCheck(event, v.planId, item.price, item.itemId, item.title)}*/}
          {/*                   type="checkbox"*/}
          {/*                   value={item.price}/>*/}
          {/*            <label htmlFor={v.planId + "" + item.itemId + "" + indexNumber}>*/}
          {/*              <div style={{direction: "rtl"}}>*/}
          {/*                <span>_{item.itemId}_</span><span>_{item.title}_</span><span>_{item.price}_</span>*/}
          {/*              </div>*/}
          {/*            </label>*/}
          {/*          </div>}*/}
          {/*        </React.Fragment>)}*/}
          {/*      </div>*/}
          {/*      <div*/}
          {/*        className={"add__To__card__section"}*/}
          {/*      >*/}
          {/*        <div*/}
          {/*          onClick={(event) => onSelectPlan(event, v.planId)}*/}
          {/*          className={"p-2"}>{tr.add_to_card}</div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </>*/}
          {/*</React.Fragment>)}*/}

        </div>
      </div>


    </>}

  </div>);
};

export default SelectedProductType;
