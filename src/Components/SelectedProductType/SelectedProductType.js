import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from "react-router-dom";
import Loader from "../Loader/Loader";
import Input from "../UI/Input";
import {BasketTopHand} from "../../Assets/svg";
import tr from "../translate/translate";
import axios from "axios";
import Button from "../UI/Button";

const SelectedProductType = (props) => {
    const prefixUrl = localStorage.getItem("apiUrl") + "ravanhesabPlans/";

    const reactLocation = useLocation();

    const [dataHolder, setDataHolder] = useState({})
    const [data, setData] = useState([])
    const [planTime, setPlanTime] = useState("month") // || month, month_3, month_6, month_12
    const [totalPriceState, setTotalPriceState] = useState({month: [], month_3: [], month_6: [], month_12: []})
    const [basket, setBasket] = useState({id: undefined, title: undefined})
    const selectTimeRef = useRef();
    const checkBoxRef = useRef();

    const resetTotalPrice = (ArrayFromBackEnd, totalPriceState) => {
      const tempTotalPrice = {...totalPriceState}
      for (let element in ArrayFromBackEnd) {
        const tempTotalPriceOfEachItem = [];
        ArrayFromBackEnd[element].forEach(v => tempTotalPriceOfEachItem.push({
          planId: v.planId,
          totalPrice: v.totalPrice
        }))
        tempTotalPrice[element] = tempTotalPriceOfEachItem;
      }
      // console.log(planTime);
      //
      // setTotalPriceState(tempTotalPrice);
      return tempTotalPrice

    }
    useEffect(() => {
      if (reactLocation.state) {
        const id = reactLocation.state.id;
        axios.get(prefixUrl + "?id=" + id).then(r => {
          const backData = r.data.data;
          setDataHolder(backData) // نگه دارنده دیتا برای زمانی که زمان رو عوض کرد دیتا  و جمع کل دوباره ریست بشه
          setData(backData[planTime]) //  نمایش دیتا
        });
      }
    }, [])


    const changeTimeHandler = (event, inputTime) => {
      event.preventDefault();
      debugger
      console.log(dataHolder)

      const temp = {...dataHolder}[inputTime]
      setData(temp)
      setPlanTime(inputTime);

      const nodeList = checkBoxRef.current.querySelectorAll('.package__section input[type=checkbox]');
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
        debugger

      } else {
        console.log("Error Ref")
      }
    }

    const changeItemCheck1 = (event, planId, price) => {

    }
    const changeItemCheck = (event, planId, price) => {
      // debugger
      const temp = [...data];

      debugger
      // if (event.target.checked) {
      //   const singlePlan = temp.filter(item => item.planId === planId)[0];
      //   singlePlan.totalPrice = singlePlan.totalPrice + price;
      // } else {
      //   const singlePlan = temp.filter(item => item.planId === planId)[0];
      //   singlePlan.totalPrice = singlePlan.totalPrice - price;
      // }
      setData(prevState => {
        const temp = [...prevState];
        if (event.target.checked) {
          const singlePlan = temp.filter(item => item.planId === planId)[0];
          singlePlan.totalPrice = singlePlan.totalPrice + price;
        } else {
          const singlePlan = temp.filter(item => item.planId === planId)[0];
          singlePlan.totalPrice = singlePlan.totalPrice - price;
        }
        return temp

      });


      console.log("dataHolder: ")
      console.log(dataHolder)
      console.log("_______")
      console.log("temp: ")
      console.log(temp)
      // setData(temp);
    };

    return (
      <div>
        {data.length === 0 ? <Loader className={"center__Loader"}/> :
          <>
            <div style={{position: "sticky", top: 0, padding: 22, background: "whitesmoke"}}>
              <span>زمان: {planTime}</span>
            </div>
            <div>
              <div className={"w-100 d-block text-center "}>
                <div ref={selectTimeRef} className={"d-flex justify-content-center removeOtherClassJs"}>
                  <div  className={"mx-2 rounded p-2 " + "bg-info"}
                          onClick={(event) => changeTimeHandler(event, 'month')}>
                    یک ماهه
                  </div>

                  <div className={"mx-2 rounded p-2 "}
                       onClick={(event) => changeTimeHandler(event, 'month_3')}> سه ماهه
                  </div>
                  <div className={"mx-2 rounded p-2 "}
                       onClick={(event) => changeTimeHandler(event, 'month_6')}> شش ماهه
                  </div>
                  <div className={"mx-2 rounded p-2 "}
                       onClick={(event) => changeTimeHandler(event, 'month_12')}> یک ساله
                  </div>
                </div>
              </div>


              <div className={"package__section"}
                   ref={checkBoxRef}
              >
                {/*{console.log(data)}*/}
                {data.map((v, index) =>
                  <React.Fragment key={index + ""}>
                    <>
                      <div className={"single__package"}>

                        <div className={"package__width__header"} style={{
                          // 'background': `url(${v.pictureUrl})`,
                          // 'backgroundSize': '200px 100px',
                        }}>
                          <div className={"top__hand__section"}>
                            <BasketTopHand/>
                          </div>
                          <div className={"p-4"}>
                            _{v.planId}_
                            _{v.planTitle}_ &nbsp;
                            {/*_{totalPriceState[planTime].filter(x => x.planId === v.planId)[0].totalPrice}_*/}
                            {v.totalPrice}
                            {/*  <React.Fragment key={indexItem + ""}>*/}
                            {/*    {items.totalPrice}*/}
                            {/*  </React.Fragment>*/}
                            {/*  : <></>)*/}
                            {/*}*/}
                          </div>
                        </div>
                        {/* آیتم ها */}
                        <div className={"package__width__body"}>
                          {/*{console.log(v.data)}*/}
                          {v.data.map((item, indexNumber) =>
                            <React.Fragment key={indexNumber + ""}>
                              {item.fixed ?
                                <div className={"py-1"}>
                                  {/*{console.log(item)}*/}
                                  {/*{item.itemId}*/}
                                  {item.title}
                                  {/*{item.price}*/}
                                </div>
                                :
                                <div className={"form__control__check__box"}>
                                  <Input id={v.planId + "" + item.itemId + "" + indexNumber}
                                         onChange={(event) => changeItemCheck(event, v.planId, item.price)}
                                         type="checkbox"
                                         value={item.price}/>
                                  <label htmlFor={v.planId + "" + item.itemId + "" + indexNumber}>
                                    <div style={{direction: "rtl"}}>
                                      <span>_{item.itemId}_</span><span>_{item.title}_</span><span>_{item.price}_</span>
                                    </div>
                                  </label>
                                </div>

                              }
                            </React.Fragment>)}
                        </div>
                        <div className={"add__To__basket__section"}>
                          <div className={""}>{tr.add_to_basket}</div>
                        </div>
                      </div>
                    </>
                  </React.Fragment>)}
              </div>


            </div>

          </>}

      </div>);
  }
;

export default SelectedProductType;
