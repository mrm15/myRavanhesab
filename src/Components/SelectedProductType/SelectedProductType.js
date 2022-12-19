import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import Loader from "../Loader/Loader";
import Input from "../UI/Input";
import {BasketTopHand} from "../../Assets/svg";
import tr from "../translate/translate";
import axios from "axios";

const SelectedProductType = (props) => {
    const prefixUrl = localStorage.getItem("apiUrl") + "ravanhesabPlans/";

    const reactLocation = useLocation();
    const [data, setData] = useState([])
    const [planTime, setPlanTime] = useState("month") // || month, month_3, month_6, month_12
    const [totalPriceState, setTotalPriceState] = useState({month: [], month_3: [], month_6: [], month_12: []})
    const [basket, setBasket] = useState({id: undefined, title: undefined})


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

          // const temp1 = resetTotalPrice(r.data.data, {...totalPriceState});
          //
          // setTotalPriceState(temp1)

          setData(r.data.data);
        });
      }
    }, [])


    const changeTimeHandler = (event, inputTime) => {

      // const node = document.querySelectorAll('.package__section input[type=checkbox]')
      // if (node.length > 0) {
      //   for (const nodeKey in node) {
      //     if (typeof (node[nodeKey]) === 'object') {
      //       node[nodeKey].checked = false
      //     }
      //   }
      // }

      const parent = document.getElementsByClassName("removeOtherClassJs");
      for (let element in parent[0].childNodes) {
        const t = parent[0].childNodes[element];
        t.classList !== undefined && t.classList.contains("bg-info") && t.classList.remove("bg-info")
      }
      // debugger
      event.target.classList.toggle("bg-info")

      // const temp = {...data};
      // const temp2 = resetTotalPrice(temp)
      // setTotalPriceState(temp2)
      setPlanTime(inputTime)
    }


    const changeItemCheck = (event, planId, price) => {
      // debugger
      let temp = {...totalPriceState}
      // let  temp[planTime] = temp[planTime];
      let totalPrice = 0;
      if (event.target.checked) {
        const singleItem = temp[planTime].filter(item => item.planId === planId)[0];
        totalPrice = singleItem.totalPrice + price;
        temp[planTime] = temp[planTime].filter(item => item.planId !== planId);
        temp[planTime].push({planId, totalPrice})
      } else {
        totalPrice = temp[planTime].find(item => item.planId === planId).totalPrice - price;
        temp[planTime] = temp[planTime].filter(item => item.planId !== planId)
        temp[planTime].push({planId, totalPrice})
      }
      setTotalPriceState({...temp});

    };
    return (<div>


      {data.length === 0 ? <Loader className={"center__Loader"}/> : <>

        <>
          <div>
            <div className={"w-100 d-block text-center "}>
              <div className={"d-flex justify-content-center removeOtherClassJs"}>
                <div className={"mx-2 rounded p-2 " + "bg-info"} style={{transition: 'all 0.6s'}}
                     onClick={(event) => changeTimeHandler(event, 'month')}> یک ماهه
                </div>
                <div className={"mx-2 rounded p-2 "} style={{transition: 'all 0.6s'}}
                     onClick={(event) => changeTimeHandler(event, 'month_3')}> سه ماهه
                </div>
                <div className={"mx-2 rounded p-2 "} style={{transition: 'all 0.6s'}}
                     onClick={(event) => changeTimeHandler(event, 'month_6')}> شش ماهه
                </div>
                <div className={"mx-2 rounded p-2 "} style={{transition: 'all 0.6s'}}
                     onClick={(event) => changeTimeHandler(event, 'month_12')}> یک ساله
                </div>
              </div>
            </div>
            <div className={"package__section"}>
              {/*{console.log(data)}*/}
              {data[planTime].map((v, index) =>
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
                                {console.log(item)}
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
        </>
      </>}

    </div>);
  }
;

export default SelectedProductType;
