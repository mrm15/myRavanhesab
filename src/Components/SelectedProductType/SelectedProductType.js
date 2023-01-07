import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Loader from "../Loader/Loader";
import Input from "../UI/Input";
import {BasketLittle, BasketRounded, BasketRoundedFill, BasketTopHand, BgPlans, BgSvg} from "../../Assets/svg";
import tr from "../translate/translate";
import axios from "axios";
import Button from "../UI/Button";
import {click} from "@testing-library/user-event/dist/click";
import MonthSection from "./MonthSection";
import SingleModule from "./SingleModule";
import f from "../../utils/UtilsFunction";
import numeric from "../utils/NumericFunction";
import {toast} from "react-toastify";
import ravanhesabLogo from "../../Assets/img/ravanhesabLogo.png"
import Header from "../Header/Header";

const SelectedProductType = (props) => {
  const prefixUrl = localStorage.getItem("apiUrl") + "";

  const reactLocation = useLocation()

  const navigateTo = useNavigate()
  const [dataHolder, setDataHolder] = useState({})
  const [counter, setCounter] = useState(0)

  const [dataShow, setDataShow] = useState([])
  const [modules, setModules] = useState([])

  const [planTime, setPlanTime] = useState("month")
  console.log("planTime: " + planTime)

  // const [data, setData] = useState([])
  // const [planTime, setPlanTime] = useState("month") // || month, month_3, month_6, month_12
  // const [totalPriceState, setTotalPriceState] = useState([])

  const [cart, setCart] = useState({
    planTime: "",
    planId: 0,
    planTitle: "",
    modules: [// {moduleId: 0, moduleName: "", modulePrice: 0}
    ],
    planPrice: 0,
    totalPrice: 0,
    productId: 0,

  })
  const selectTimeRef = useRef();
  const planItemsRef = useRef();

  const calculateTotalPrice = (temp) => {
    console.log(dataHolder)
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
      setCart(prevState => {
        const temp = prevState;
        temp.productId = id;
        return temp
      })

      axios.get(prefixUrl + "ravanhesabPlans/?id=" + id).then(r => {
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
  //   const temp_card = {...cart}
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

  function countBasket(temp) {
    let counter = 0;
    if (temp.planId !== 0)
      counter++;

    let moduleCounter = 0;
    temp.modules.forEach(v => moduleCounter++)
    counter += moduleCounter;


    return counter

  }

  function replacePrices(temp) {
    const tempDataHolder = {...dataHolder}
    const planTime = temp.planTime;
    const planId = temp.planId;
    // debugger
    if (temp.planTitle !== "")
      temp.planTitle = tempDataHolder['plans'][planTime].filter(v => v.planId === planId)[0].planTitle;
    if (temp.planPrice !== 0)
      temp.planPrice = tempDataHolder['plans'][planTime].filter(v => v.planId === planId)[0].totalPrice;
    console.table(temp)
    if (temp.modules.length > 0) {
      const newModules = [];
      // دور ماژول های انتخابیش حلقه میزنم
      // اگه  اون ها توی دیتا هولدر من بودن میرم قیمت رو از توی دیتا هولدر برمیدارم و جایگزین میکنم
      temp.modules.forEach(v => {
        const singleObject = tempDataHolder['modules'][planTime].filter(modulesObject => modulesObject.moduleId === v.moduleId)[0];
        newModules.push(singleObject)
      })
      temp.modules = newModules;
    }
    return temp;
  }

  function onSelectPlan(event, planId, options, planTime, planPrice, planTitle) {
    // اول باید دور اونی که از قبل سایه داره رو حذف کنم
    // ضمنا اگه زمان رو عوض کرد باید از حالت انتخاب در بیاد و از استیت پاک بشه
    removeBoxShadowFromSingleItem()

    // حالا چک کنم آیا اصلا این همونیه که از قبل انتخاب شده
    // اگه این همونیه که از قبل توی سبد خرید هست باید از توی سبد خرید در بیاد و تمام
    const temp = f.copyObject(cart);
    if (temp.planId === planId) {
      temp.planId = 0
      temp.planPrice = 0
      temp.planTitle = ''
      toast.info(tr.plan + " " + planTitle + " " + tr.removed_from_basket)
      setCart(temp)
      setCounter(countBasket(temp))
      return
    }
    // در غیر اینصورت باید سایه حذف بشه و این جدیه بره توی سبد خرید
    // بعد باید اونی که کلیک شده رو سایه بزنم
    addBoxShadowToSingleItem(event)


    // Lets Add to cardState
    temp.planId = planId
    temp.planTitle = planTitle
    // temp.options = options.filter(v => v.planId === planId)
    temp.planPrice = planPrice;

    temp.totalPrice = calculateTotalPrice(temp)

    temp.planTime = planTime

    setCart(temp)
    addBoxShadowToSingleItem(event);
    toast.info(tr.plan + " " + planTitle + " " + tr.added_to_basket)
    setCounter(countBasket(temp))
  }


  const selectMonthHandler = (inputPlanTime) => {
    setPlanTime(inputPlanTime);
    console.log(dataHolder)
    // اینجا باید بر اساس پلنی که انتخاب کرده باید
    // باید ببینیم آیا چیزی توی کارتش داره یا نه
    // اگه چیزی توی کارتش بود باید  بر اساس ماهی که روش کلیک شده قیمت ها آپدیت بش تا بعد جمعش اون بالا نمایش داده بشه
    let temp = f.copyObject(cart);
    // پس باید

    temp.planTime = inputPlanTime;

    // debugger
    if (cart.planId !== 0 || cart.modules.length > 0) {
      temp = replacePrices(temp)
    }

    // debugger
    temp.totalPrice = calculateTotalPrice(temp);
    setCart(temp)

    setDataShow([...dataHolder.plans[inputPlanTime].slice()])
    setModules([...dataHolder.modules[inputPlanTime].slice()])
    // debugger
  }

  const selectSingleModule = (moduleId, moduleName, modulePrice) => {
    // const temp = {...cart}

    const temp = f.copyObject(cart);

    const filterLength = temp.modules.filter(v => v.moduleId === moduleId).length;
    if (filterLength === 0) {
      temp.modules.push({moduleId: moduleId, moduleName: moduleName, modulePrice: modulePrice})
      toast.info(tr.module + " " + moduleName + " " + tr.added_to_basket)
    } else {
      temp.modules = temp.modules.filter(v => v.moduleId !== moduleId);
      toast.info(tr.module + " " + moduleName + " " + tr.removed_from_basket)
    }
    temp.totalPrice = calculateTotalPrice(temp);

    setCart(temp)
    setCounter(countBasket(temp))

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

  function cardClickHandler() {

    toast.info("در حال بررسی سبد خرید...");

    const promise_ = axios.post(prefixUrl + "addBill/", cart).then(r => {
      console.log(r.data);
      if (r.data.status) {
        navigateTo("/bill")
      } else {
        toast.error(r.data.message)
      }
    }).catch(error => {
      debugger
      console.log(error)
    })

    // toast.promise(promise_, {
    //   loading: 'در حال بررسی سبد خرید...',
    //   // success: 'Got the data',
    //   // error: 'Error when fetching',
    // })

  }

  return (<div>
    {Object.keys(dataHolder).length === 0 ? <Loader className={"center__Loader"}/> : <>
      <div className={"bg__section___selectedProduct"}>

        {/*<div style={{*/}
        {/*  height: 55,*/}
        {/*  width: "100%",*/}
        {/*  position: "absolute",*/}
        {/*  top: 0,*/}
        {/*  background: '#fff',*/}
        {/*  zIndex: 12,*/}
        {/*  padding: 15,*/}


        {/*}}>*/}

        {/*  <ul style={{float: "right"}}>*/}
        {/*    <li><span className={"px-4"}>*/}
        {/*    <img className={""} src={ravanhesabLogo} alt={"روانحساب"}/>*/}
        {/*  </span></li>*/}
        {/*  </ul>*/}

        {/*  <ul*/}
        {/*    style={{float: "left"}}*/}
        {/*    className={"d-flex justify-content-end"}>*/}
        {/*    <li>*/}
        {/*      /!*<>*!/*/}
        {/*      /!*  <>آیدی پلن انتخابی: {cart.planId}</>*!/*/}
        {/*      /!*  &nbsp;&nbsp;|&nbsp;&nbsp;*!/*/}
        {/*      /!*  <>زمان پلن انتخابی: {cart.planTime}</>*!/*/}
        {/*      /!*  &nbsp;&nbsp;|&nbsp;&nbsp;*!/*/}
        {/*      /!*  <>تیک های پلن انتخابی: {cart.modules.map(v => <>{v.moduleName} _ {v.modulePrice}</>)}</>*!/*/}
        {/*      /!*  &nbsp;&nbsp;|&nbsp;&nbsp;*!/*/}

        {/*      /!*</>*!/*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      {(cart.modules.length > 0 || cart.planId !== 0) ?*/}
        {/*        <div className={"position-relative "}>*/}
        {/*          <BasketRoundedFill/>*/}
        {/*          <div className={"number__basket"}>*/}
        {/*            <div className={"number__basket_number"}> {numeric.e2p(counter + "")}</div>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        : <BasketRounded/>}*/}

        {/*    </li>*/}
        {/*    <li>*/}
        {/*      جمع کل : {numeric.e2p(cart.totalPrice.toLocaleString())} ريال*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</div>*/}
        <Header>
          <div>
            <div>
              {/*<>*/}
              {/*  <>آیدی پلن انتخابی: {cart.planId}</>*/}
              {/*  &nbsp;&nbsp;|&nbsp;&nbsp;*/}
              {/*  <>زمان پلن انتخابی: {cart.planTime}</>*/}
              {/*  &nbsp;&nbsp;|&nbsp;&nbsp;*/}
              {/*  <>تیک های پلن انتخابی: {cart.modules.map(v => <>{v.moduleName} _ {v.modulePrice}</>)}</>*/}
              {/*  &nbsp;&nbsp;|&nbsp;&nbsp;*/}
              {/**/}
              {/*</>*/}
            </div>
            <div>
              {(cart.modules.length > 0 || cart.planId !== 0) ?
                <div onClick={cardClickHandler} className={"position-relative cursor_pointer"}>
                  <BasketRoundedFill/>
                  <div className={"number__basket"}>
                    <div className={"number__basket_number"}> {numeric.e2p(counter + "")}</div>
                  </div>
                </div>
                : <div className={"position-relative cursor_pointer"}><BasketRounded/></div>}
              {/**/}
            </div>
            <div className={"d-none"}>
              جمع کل : {numeric.e2p(cart.totalPrice.toLocaleString())} {tr.currency_unit}
            </div>
          </div>
        </Header>
        <div className={"padding_top_80"}>
          <div className={"title__bar"}>{tr.ravanhesab_software}</div>
          <div className={"sub__title__bar mb-2  mt-4"}>{tr.select_your_plan}</div>
          <div ref={planItemsRef} className={"position-relative "}>
            <div className={"position-absolute w-100 bg_plans"}>
              {/*123*/}
              {/*<BgPlans />*/}
            </div>

            <ul className={"nav nav-pills d-flex justify-content-around w_770 mb-2 mx-auto"} id="pills-tab"
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
                <button onClick={() => selectMonthHandler("month_12")} className="nav-link active"
                        id="pills-tab_month_12"
                        data-bs-toggle="pill"
                        data-bs-target="#month_12"
                        type="button" role="tab" aria-controls="pills-contact" aria-selected="false">یک ساله
                </button>
              </li>
            </ul>


            <div className="" id="">
              <div className="" id="" role="" aria-labelledby="">
                {dataShow.length > 0 && <MonthSection
                  // changeItemCheck={changeItemCheck}
                  planTime={planTime}
                  onSelectPlan={onSelectPlan}
                  dataHolder={dataShow}
                  modules={modules}
                  selectSingleModule={selectSingleModule}
                />}
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
      </div>

    </>}

  </div>);
};

export default SelectedProductType;
