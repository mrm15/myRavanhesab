import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from "react-router-dom";
import Loader from "../Loader/Loader";
import Input from "../UI/Input";
import {BasketTopHand} from "../../Assets/svg";
import tr from "../translate/translate";
import axios from "axios";
import Button from "../UI/Button";
import {click} from "@testing-library/user-event/dist/click";
import MonthSection from "./MonthSection";

const SelectedProductType = (props) => {
  const prefixUrl = localStorage.getItem("apiUrl") + "ravanhesabPlans/";

  const reactLocation = useLocation();

  const [dataHolder, setDataHolder] = useState({})
  // const [data, setData] = useState([])
  // const [planTime, setPlanTime] = useState("month") // || month, month_3, month_6, month_12
  // const [totalPriceState, setTotalPriceState] = useState([])
  const [card, setCard] = useState({
    planTime: "", planId: 0, options: [], modules: [], planPrice: 0, totalPrice: 0,
  })
  const selectTimeRef = useRef();
  const planItemsRef = useRef();

  const calculateTotalPrice = (card) => {
    let sum = 0;
    // اول از همه بیا قیمت پایه رو بهش اضافه کن
    sum += +card.planPrice;

    //حالا بیا قیمت آپشن ها رو بهش اضافه کن
    card.options.forEach(v => sum += +v.value)

    // حالا بیا مايول ها رو هم حساب کنیم.
    // محل محاسبه جمع قیمت ماژول
    return sum;
  }
  useEffect(() => {
    if (reactLocation.state) {
      const id = reactLocation.state.id;
      axios.get(prefixUrl + "?id=" + id).then(r => {
        const backData = r.data.data;
        setDataHolder(backData.plans) // نگه دارنده دیتا برای زمانی که زمان رو عوض کرد دیتا  و جمع کل دوباره ریست بشه
        // setData(backData[planTime]) //  نمایش دیتا
        // setTotalPriceState(calculateTotalPrice(backData[planTime]))
      });
    }
  }, [])


  const changeTimeHandler = (event, inputTime) => {
    event.preventDefault();


    // اگه موردی رو انتخاب کرده اول از حالت انتخاب درش بیار
    removeBoxShadowFromSingleItem()
    // سبد خرید رو آپدیت کن مطمئن شو که اکه از قبل چیزی انتخاب کرده از سبد خرید حذف بشه
    // چون داره باز یه ماهه دیکه ای رو انتخاب میکنه
    setCard(prevState => {
      return {planTime: inputTime, planId: 0, options: [], modules: prevState.modules,}
    })
    // debugger
    console.log(dataHolder)


    // setTotalPriceState(resetTotalPrice(temp))
    // setPlanTime(inputTime);

    const nodeList = planItemsRef.current.querySelectorAll('.package__section input[type=checkbox]');
    // remove if check Box are true
    if (nodeList.length > 0) {
      for (const nodeKey in nodeList) {
        if (typeof (nodeList[nodeKey]) === 'object') {
          nodeList[nodeKey].checked = false
        }
      }
    }
    // change Bg Image
    if (selectTimeRef.current) {
      const div = selectTimeRef.current;
      const parent = div.childNodes;

      parent.forEach((element, index) => {
        element.classList.remove("bg-info")
      })
      event.target.classList.toggle("bg-info")
      // debugger

    } else {
      console.log("Error Ref")
    }
  }

  const changeItemCheck = (event, planId, price, itemId, itemTitle, planTime) => {

    // اینجا خیلی مهمه
    //باید چک کنم آیا این تیکی که خورده الان جزو اونایی هست که توی سبد خریده؟
    // هم پلن تایم و هم پلن آیدی رو چک میکنیم.
    //اگه هر دوش برابر بود با همونی که توی سبد خریده
    // باید سبد خرید آپدیت بشه
    // اگه هم پلن آیدی و پلن تایم یکی نبود نباید سبد خرید آپدیت بشه

    const temp_card = {...card}
    if (temp_card.planId === planId && temp_card.planTime === planTime) {
      if (event.target.checked) {
        //  اگه تیک زد ببینم اگه توی اون سبد خرید بخش آپشن مورد نبود قرارش بدم
        temp_card.options.filter(v => v.itemId === itemId).length === 0 && temp_card.options.push({
          planId: planId, itemId: itemId, value: event.target.value, itemTitle: itemTitle
        })
      } else {
        // اگه تیک برداشت ببین اگه توی آپشن بود حذفش کن
        const removeIndex = temp_card.options.map(item => item.itemId).indexOf(itemId);
        if (removeIndex !== -1) {
          temp_card.options.splice(removeIndex, 1);
        }
      }
      setCard(temp_card)
    } else {
      //Just Do Nothing!
    }
  };

  const removeBoxShadowFromSingleItem = () => {
    const singlePlanSelected = planItemsRef.current.querySelector(".set_box_shadow_to_singleItem")
    singlePlanSelected !== null && singlePlanSelected.classList.remove("set_box_shadow_to_singleItem")
  }

  const addBoxShadowToSingleItem = (event) => {
    event.target.parentElement.parentElement.classList.add("set_box_shadow_to_singleItem");
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

  return (<div>
    {Object.keys(dataHolder).length === 0 ? <Loader className={"center__Loader"}/> : <>

      <div style={{position: "sticky", top: 0, padding: 22, background: "whitesmoke"}}>
        <span>آیدی پلن انتخابی: {card.planId}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
        <span>زمان پلن انتخابی: {card.planTime}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
        <span>تیک های پلن انتخابی: {card.options.map(v => <>[{v.itemTitle},{v.value}]</>)}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
        {/*<span>ماژول های پلن انتخابی: {card.modules.map(v => <>{v},</>)}</span>&nbsp;&nbsp;|&nbsp;&nbsp;*/}


        <span>جمع کل : {card.totalPrice}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
      </div>
      <div>
        <div className={"w-100 d-block text-center "}>

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


        <div ref={planItemsRef}>

          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link " id="pills-tab_month_1" data-bs-toggle="pill" data-bs-target="#month_1"
                      type="button" role="tab" aria-controls="pills-home" aria-selected="true">یک ماهه
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-tab_month_3" data-bs-toggle="pill" data-bs-target="#month_3"
                      type="button" role="tab" aria-controls="pills-profile" aria-selected="false">سه ماهه
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-tab_month_6" data-bs-toggle="pill" data-bs-target="#month_6"
                      type="button" role="tab" aria-controls="pills-contact" aria-selected="false">شش ماهه
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="pills-tab_month_12" data-bs-toggle="pill"
                      data-bs-target="#month_12"
                      type="button" role="tab" aria-controls="pills-contact" aria-selected="false">یک ساله
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane  " id="month_1" role="tabpanel" aria-labelledby="pills-tab_month_1">

              <MonthSection changeItemCheck={changeItemCheck} planTime={"month"} onSelectPlan={onSelectPlan}
                            dataHolder={dataHolder['month']}/>

            </div>
            <div className="tab-pane " id="month_3" role="tabpanel" aria-labelledby="pills-tab_month_3">
              <MonthSection changeItemCheck={changeItemCheck} planTime={"month_3"} onSelectPlan={onSelectPlan}
                            dataHolder={dataHolder['month_3']}/>
            </div>
            <div className="tab-pane " id="month_6" role="tabpanel" aria-labelledby="pills-tab_month_6">
              <MonthSection changeItemCheck={changeItemCheck} planTime={"month_6"} onSelectPlan={onSelectPlan}
                            dataHolder={dataHolder['month_6']}/>
            </div>
            <div className="tab-pane show active" id="month_12" role="tabpanel" aria-labelledby="pills-tab_month_12">
              <MonthSection changeItemCheck={changeItemCheck} planTime={"month_12"} onSelectPlan={onSelectPlan}
                            dataHolder={dataHolder['month_12']}/>
            </div>
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
