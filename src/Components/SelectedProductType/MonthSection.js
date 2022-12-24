import React, {useEffect, useState} from 'react';
import {BasketTopHand} from "../../Assets/svg";
import Input from "../UI/Input";
import tr from "../translate/translate";

const MonthSection = (props) => {
  const [holder, setHolder] = useState(props.dataHolder)
  const [optionsHolder, setOptionsHolder] = useState([])
  const [basePriceState, setBasePriceState] = useState([])
  const [randomString, setRandomString] = useState(Math.floor(Math.random() * 10000000000000000) + "_W_L_F")

  useEffect(() => {
    const temp_basePrice = [];
    props.dataHolder.forEach(v => {
      temp_basePrice.push({planId: v.planId, totalPrice: v.totalPrice});
    })

    setBasePriceState(temp_basePrice);
  }, [])

  function changeItemCheck(event, planId, price, itemId, title) {
    setOptionsHolder(ps => {
      let temp = [...ps]
      if (event.target.checked) {
        temp.filter(v => v.itemId === itemId).length === 0 && temp.push({
          planId: planId, itemId: itemId, value: event.target.value, itemTitle: title
        })
      } else {
        // اگه تیک برداشت ببین اگه توی آپشن بود حذفش کن
        const removeIndex = temp.map(item => item.itemId).indexOf(itemId);
        temp.splice(removeIndex, 1);
      }
      return temp;
    })

    setHolder(ps => {
      let temp = [...ps]
      if (event.target.checked) {
        const singlePlan = temp.filter(item => item.planId === planId)[0];
        singlePlan.totalPrice += price;
      } else {
        const singlePlan = temp.filter(item => item.planId === planId)[0];
        singlePlan.totalPrice -= price;
      }
      return temp;
    })


    // setBasePriceState(ps => {
    //   let temp = [...ps];
    // })

    props.changeItemCheck(event, planId, price, itemId, title, props.planTime)
  }

  function addToCardHandler(event, planId, planPrice) {

    props.onSelectPlan(event, planId, optionsHolder, props.planTime, planPrice)
  }

  return <div className={"package__section"}>
    {holder.map((v, index) => <React.Fragment key={index + ""}>
      <>
        <div className={"single__package"}>
          {/**/}
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

              {/*{totalPriceState[index].basePriceState}*/}


              {/*_{totalPriceState[planTime].filter(x => x.planId === v.planId)[0].basePriceState}_*/}
              <br/>
              {v.totalPrice} {/* i mean BasePrice */}__
              {basePriceState.length > 0 && basePriceState[index].totalPrice}

              {/*  <React.Fragment key={indexItem + ""}>*/}
              {/*    {items.basePriceState}*/}
              {/*  </React.Fragment>*/}
              {/*  : <></>)*/}
              {/*}*/}
            </div>
          </div>
          {/* آیتم ها */}
          <div className={"package__width__body"}>
            {/*{console.log(v.data)}*/}
            {v.data.map((item, indexNumber) => <React.Fragment key={indexNumber + ""}>
              {item.fixed ? <div className={"py-1"}>
                {/*{console.log(item)}*/}
                {/*{item.itemId}*/}
                {item.title}
                {/*{item.price}*/}
              </div> : <div className={"form__control__check__box"}>
                <Input id={v.planId + "_" + item.itemId + "" + indexNumber + randomString}
                       onChange={(event) => changeItemCheck(event, v.planId, item.price, item.itemId, item.title)}
                       type="checkbox"
                       value={item.price}/>
                <label htmlFor={v.planId + "_" + item.itemId + "" + indexNumber + randomString}>
                  <div style={{direction: "rtl"}}>
                    <span>_{item.itemId}_</span><span>_{item.title}_</span><span>_{item.price}_</span>
                  </div>
                </label>
              </div>}
            </React.Fragment>)}
          </div>
          <div
            className={"add__To__card__section"}
          >
            <div
              onClick={(event) => addToCardHandler(event, v.planId, basePriceState.length > 0 ? basePriceState[index].totalPrice : 0)}
              className={"p-2"}>{tr.add_to_card}</div>
          </div>
        </div>
      </>
    </React.Fragment>)}
  </div>
};

export default MonthSection;
