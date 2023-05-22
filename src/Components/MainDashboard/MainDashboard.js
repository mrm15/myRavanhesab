import React, { useEffect, useRef, useState } from "react";
import MainHeader from "../MainHeader/MainHeader";
import "./MainDashboard.scss";
import { carwash } from "../../Assets/js/images";
import TitleBox from "../TitleBox/TitleBox";
import PriceSection from "../PriceSection/PriceSection";
import axios from "axios";
import Footerr from "../Footer/Footerr";
import Swal from 'sweetalert2';


const MainDashboard = () => {
  const [prices, setPrices] = useState({
    priceUnderNumberOfUser: 0,
    priceUnderNumberOfAPK: 0,
  });
  const [state, setState] = useState("windows");
  const [data, setData] = useState([]);
  const cardSelector = useRef();
  const [cardData, setCardData] = useState("1");
  const [listItem, setListItem] = useState([]);
  const [idSelector, setIdSelector] = useState(0);
  const [time, timeSetter] = useState("price_1");
  const [totalPrice, setTotalPrice] = useState(0);
  const [apkSelector, setApkSelector] = useState("1");
  //   const [sale, setSale] = useState(0);
  //   const [tax, setTax] = useState(0);

  const [userOption, setUserOption] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState(1);
  // const [sendData, setSendData] = useState({
  //   numberOfUsers: "",
  //   planTime: "oneMonth",
  //   numberOfApk: "",
  // });
  const [servicePrice, setServicePrice] = useState(0);
  const [saveData, setSaveData] = useState([]);

  const clickHandler = (e) => {
    setCardData(e.currentTarget.id);
    let activeChild = cardSelector.current.querySelector(".softBoxActive_");
    if (activeChild) {
      activeChild.classList.remove("softBoxActive_");
    }
    e.currentTarget.classList.add("softBoxActive_");
  };
  const addCheckedItemsToSaveDataState = (data) => {
    const temp = [];
    data.forEach((singleItemObject) => {
      if (singleItemObject.checked) {
        temp.push(singleItemObject);
      }
    });

    setSaveData(temp);
  };
  useEffect(() => {
    axios
      .get(
        `http://localhost/myRavanhesabBackend/ravanhesabProductData/?productId=${cardData}`
      )
      .then((response) => {
        setListItem([...response.data.productData.items]);
        setUserOption([...response.data.productData.userOptions]);
        addCheckedItemsToSaveDataState(response.data.productData.items);
        setServicePrice(response.data.productData.serverPrice);
        setNumberOfUsers(response.data.productData.userOptions[0].percent);
      });
  }, [cardData]);

  console.log(userOption);

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
    const selectedTime = e.target.value;
    timeSetter(selectedTime);
  };
  const updatePrices = () => {
    let totalPrice = calculateTotalItemPrice(time);
    let poshtibani = 1; // WILL FIX IT
    let totalUserPrice =
      (totalPrice + servicePrice + poshtibani) * (numberOfUsers / 100) * 2;
    // اینجا باید یه چیزی که از بک میاد رو بگیرم و ست کنم و اینجا ضرب کنم
    let totalAPKPrice = servicePrice * apkSelector;

    const temp = { ...prices };
    temp.priceUnderNumberOfAPK = totalAPKPrice;

    temp.priceUnderNumberOfUser = totalUserPrice;

    setPrices(temp);
  };

  const calculateTotalItemPrice = (selectedTime) => {
    let totalItemPrice = 0;

    saveData.forEach((item) => {
      totalItemPrice += item[selectedTime];
    });

    return totalItemPrice;
  };
  const calculateSum = () => {
    let totalPrice = 0;
    const selectedTime = time;

    let numberOfUsersPercentage = 1;
    if (userOption !== undefined && userOption.length > 0) {
      numberOfUsersPercentage = numberOfUsers;
    }

    // i want to calculate sumOfCheked in items
    let totalItemPrice = calculateTotalItemPrice(selectedTime);

    let myNumberToCalulateData =
      time === "price_1"
        ? 12
        : time === "price_2"
        ? 4
        : time === "price_3"
        ? 2
        : time === "price_4"
        ? 1
        : 1;
    const serverPrice = 15 / myNumberToCalulateData;
    const maintainsPrice = 15 / myNumberToCalulateData;
    numberOfUsersPercentage = parseFloat(numberOfUsersPercentage);
    totalPrice =
      totalItemPrice + serverPrice + maintainsPrice + numberOfUsersPercentage;
    setTotalPrice(totalPrice);
  };

  const numberOfUsersHandler = (e) => {
    setNumberOfUsers(e.target.value);
  };

  const changeHandlerApk = (e) => {
    setApkSelector(e.target.value);
  };

  const myAwsomeChangeHandler = (e, myAwesomeObject) => {
    
    // console.log(myAwesomeObject);

    if (e.target.checked) {

      if (myAwesomeObject.prerequisite.length > 0) {
      let dependeny = false;

      let text = "";
      myAwesomeObject.prerequisite.forEach((itemId) => {
        const temp = [...saveData].filter((item) => item.itemId === itemId)[0];

        if (temp === undefined) {
          listItem.forEach((item) => {
            if (item.itemId === itemId) {
              text += `${item.itemTitle} `;
              dependeny = true;
            }
          });
        }
        debugger;
      });

      if (dependeny) {
        
        Swal.fire(`${text}`)



        e.target.checked=false
        return;
      }
    }

      setSaveData([...saveData, myAwesomeObject]);
    } else {
      const temp = [...saveData];
      const result = temp.filter(
        (item) => item.itemId !== myAwesomeObject.itemId
      );
      setSaveData(result);
    }
  };

  useEffect(() => {
    calculateSum();
    updatePrices();
  }, [numberOfUsers, time, userOption, apkSelector, saveData]);
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
        <div className="cards_contents_right">
          <div className="header_section">
            <span>سیستم‌ ها</span>
          </div>
          {listItem.map((v, index) => (
            <PriceSection
              className={index % 2 === 0 ? "lightGray_" : "darkGray_"}
              id={v.itemId}
              key={index}
              price={
                time === "price_1"
                  ? v.price_1
                  : time === "price_2"
                  ? v.price_2
                  : time === "price_3"
                  ? v.price_3
                  : time === "price_4"
                  ? v.price_4
                  : v.price_5
              }
              title={v.itemTitle}
              disabled={v.active === false ? true : false}
              checked={v.checked ? true : false}
              changeHandler={(e) => myAwsomeChangeHandler(e, v)}
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
                {userOption !== undefined && userOption.length > 0 && (
                  <>
                    <div className="selectBox_parent">
                      <label htmlFor="userNumber">تعداد کاربر</label>
                      <select
                        id="userNumber"
                        value={numberOfUsers}
                        onChange={numberOfUsersHandler}
                      >
                        <option value={"nullSelect"} disabled={true}>
                          اطلاعات خود را وارد کنید
                        </option>
                        {userOption.length > 0 &&
                          userOption.map((item, index) => (
                            <option value={item.percent} key={index}>
                              {item.numberOfUsers}
                            </option>
                          ))}
                      </select>
                    </div>
                    <span>قیمت : {prices.priceUnderNumberOfUser} تومان</span>
                  </>
                )}
              </div>
              <div className="price_parent">
                <div className="selectBox_parent">
                  <label htmlFor="chosenTime">انتخاب زمان </label>
                  <select
                    id="chosenTime"
                    defaultValue={"price_1"}
                    onChange={timeSelector}
                  >
                    <option value={"price_1"}> یک ماهه</option>
                    <option value={"price_2"}>سه ماهه</option>
                    <option value={"price_3"}> شش ماهه</option>
                    <option value={"price_4"}>یک ساله</option>
                    <option value={"price_5"}>دائمی</option>
                  </select>
                </div>
              </div>

              <div className="price_parent">
                <div className="selectBox_parent">
                  <label htmlFor="chosenTime">تعداد apk</label>
                  <select
                    value={apkSelector}
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
                <span>قیمت : {prices.priceUnderNumberOfAPK} تومان</span>
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
                  <span className="totall">{totalPrice}</span>
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
