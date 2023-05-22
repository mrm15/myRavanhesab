import React, { useEffect, useRef, useState } from "react";
import MainHeader from "../MainHeader/MainHeader";
import "./MainDashboard.scss";
import { carwash } from "../../Assets/js/images";
import TitleBox from "../TitleBox/TitleBox";
import PriceSection from "../PriceSection/PriceSection";
import axios from "axios";
import Footerr from "../Footer/Footerr";

const MainDashboard = () => {
  const [state, setState] = useState("windows");
  const [data, setData] = useState([]);
  const cardSelector = useRef();
  const [cardData, setCardData] = useState("1");
  const [listItem, setListItem] = useState([]);
  const [idSelector, setIdSelector] = useState(0);
  const [time, timeSetter] = useState("1");
  const [apkSelector, setApkSelector] = useState("1");
  //   const [sale, setSale] = useState(0);
  //   const [tax, setTax] = useState(0);
  const [updateSelector, setUpdateSelector] = useState([]);
  const updatePrices = useRef();
  const [userApk, setUserApk] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState();
  const [sendData, setSendData] = useState({
    numberOfUsers: "",
    planTime: "oneMonth",
    numberOfApk: "",
  });
  const [saveData, setSaveData] = useState([]);

  //   useEffect(() => {
  //     setSendData({
  //       numberOfUsers: userApk,
  //       planTime: time,
  //       numberOfApk: apkSelector,
  //     });
  //   }, [sendData, time, apkSelector, userApk]);

  const clickHandler = (e) => {
    setCardData(e.currentTarget.id);
    let activeChild = cardSelector.current.querySelector(".softBoxActive_");
    if (activeChild) {
      activeChild.classList.remove("softBoxActive_");
    }
    e.currentTarget.classList.add("softBoxActive_");
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost/myRavanhesabBackend/ravanhesabProductData/?productId=${cardData}`
      )
      .then((response) => {
        setListItem([...response.data.productData.items]);
        setUserApk([...response.data.productData.userOptions]);
      });
  }, [cardData]);

  console.log(userApk);

  useEffect(() => {
    axios
      .get(
        `http://localhost/myRavanhesabBackend/getRavanhesabProducts/?platform=${state}`
      )
      .then((response) => {
        setData([...response.data.productsData]);
      });
  }, [state]);

  const timeSelector = (e) => {
    timeSetter(e.target.value);
    setIdSelector(0);
    let prices = updatePrices.current.querySelectorAll(".item__");
    console.log(prices);
    if (prices) {
      setIdSelector(0);
      prices.forEach((item) => {
        if (item.checked) {
          debugger;
          console.log(item.defaultValue);
        }
      });
    }
  };

  const numberOfUsersHandler = (e) => {
    setNumberOfUsers(e.target.value);
  };

  const changeHandlerApk = (e) => {
    setApkSelector(e.target.value);
  };

  return (
    <div className="dashboard_wrapper">
      <MainHeader state={state} setState={setState} />
      <div className="sub_header_">
        <h1>نرم‌‌افزار حسابداری و صندوق فروشگاهی روان حساب</h1>
        <span>
          در زیر قیمت سیستم‌های نرم افزار روان حساب را مشاهده می‌نمایید. جهت ثبت
          سفارش و یا هماهنگی جهت جلسه حضوری اطلاعات خود را ثبت نمایید.
        </span>
      </div>
      <div className="cardsContainer_" ref={cardSelector}>
        {data.map((item, index) => (
          <TitleBox
            url={item.productPicture !== "" ? item.productPicture : carwash}
            title={`${item.productName}`}
            id={`${item.productId}`}
            key={index}
            onClick={clickHandler}
          />
        ))}
      </div>
      <div className="cards_contents_parent">
        <div className="cards_contents_right" ref={updatePrices}>
          <div className="header_section">
            <span>سیستم‌ ها</span>
          </div>
          {listItem.map((v, index) => (
            <PriceSection
              className={index % 2 === 0 ? "lightGray_" : "darkGray_"}
              id={v.itemId}
              key={index}
              price={
                time === "oneMonth"
                  ? v.price_1
                  : time === "threeMonth"
                  ? v.price_2
                  : time === "sixMonth"
                  ? v.price_3
                  : time === "oneYear"
                  ? v.price_4
                  : v.price_5
              }
              title={v.itemTitle}
              disabled={v.active === false ? true : false}
              checked={v.checkedb ? true : false}
              changeHandler={(e) => {
                // if(v.prerequistie !== []){
                //     v.prerequistie.foreach((i) =>
                //     listItem.filter(i === v.itemId)[0].itemId
                //     )
                // }
                // let data = setUpdateSelector([
                //   updateSelector,
                //   { id: e.target.id },
                // ]);

                debugger;
                let dataSave = [...saveData];
                if (dataSave.length > 0) {
                  dataSave.forEach((item) => {
                    if (item.id === e.target.id) {
                      setSaveData(
                        dataSave.filter((item) => item.id !== e.target.id)
                      );
                    } else {
                      setSaveData((prevState) => [
                        ...prevState,
                        {
                          id: e.target.id,
                          value: e.target.value,
                          checked: e.target.checked,
                        },
                      ]);
                    }
                  });
                } else if (dataSave.length === 0) {
                  setSaveData((prevState) => [
                    ...prevState,
                    { 
                      id: e.target.id,
                      value: e.target.value,
                      checked: e.target.checked,
                    },
                  ]);
                  if (e.target.checked) {
                    setIdSelector(idSelector + Number(e.target.value));
                  } else {
                    setIdSelector(idSelector - Number(e.target.value));
                  }
                }
              }}
            />
          ))}
        </div>
        <div className="cards_contents_left">
          <div className="cards_contents_left_top">
            <div className="header_section">
              <span onClick={console.log(saveData)}>امکانات جانبی</span>
            </div>
            <div className="form_cards_content">
              <div className="price_parent">
                <div className="selectBox_parent">
                  <label htmlFor="userNumber">تعداد کاربر</label>
                  <select id="userNumber" defaultValue={"nullSelect"}>
                    <option
                      value={"nullSelect"}
                      disabled={true}
                      onChange={numberOfUsersHandler}
                    >
                      اطلاعات خود را وارد کنید
                    </option>
                    {userApk.length > 0 &&
                      userApk.map((item, index) => (
                        <option value={item.percent} key={index}>
                          {item.numberOfUsers}
                        </option>
                      ))}
                  </select>
                </div>
                <span>قیمت : {idSelector} تومان</span>
              </div>
              <div className="price_parent">
                <div className="selectBox_parent">
                  <label htmlFor="chosenTime">انتخاب زمان </label>
                  <select
                    id="chosenTime"
                    defaultValue={"1"}
                    onChange={timeSelector}
                  >
                    <option value={"oneMonth"}> یک ماهه</option>
                    <option value={"threeMonth"}>سه ماهه</option>
                    <option value={"sixMonth "}> شش ماهه</option>
                    <option value={"oneYear"}>یک ساله</option>
                    <option value={"always"}>دائمی</option>
                  </select>
                </div>
                {/* <span>قیمت : 0 تومان</span> */}
              </div>

              <div className="price_parent">
                <div className="selectBox_parent">
                  <label htmlFor="chosenTime">تعداد apk</label>
                  <select
                    id="chosenNumber"
                    defaultValue={"1"}
                    onChange={changeHandlerApk}
                  >
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"4"}>4</option>
                    <option value={"5"}>5</option>
                    <option value={"6"}>6</option>
                    <option value={"7"}>7</option>
                    <option value={"8"}>8</option>
                    <option value={"9"}>9</option>
                    <option value={"10"}>10</option>
                  </select>
                </div>
                <span>قیمت : {Number(apkSelector) * idSelector} تومان</span>
              </div>
            </div>
          </div>
          <div className="cards_contents_left_bottom">
            <div className="header_section">
              <span>قیمت نهایی</span>
            </div>
            <div className="form_cards_content_bottom">
              <div className="totallBox_">
                <div className="totall_price">
                  <span>قیمت کل :</span>
                  <span>{idSelector} تومان</span>
                </div>
                <div className="totall_price">
                  <span> تخـفـیـف : </span>
                  <span className="discount_">600,000 تومان</span>
                </div>
                <div className="totall_price">
                  <span> مالیات و عوارض :</span>
                  <span>600,000 تومان</span>
                </div>
                <div className="totall_price">
                  <span> جمع کل :</span>
                  <span className="totall">600,000 تومان</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footerr />
    </div>
  );
};

export default MainDashboard;
