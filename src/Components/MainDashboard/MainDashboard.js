import React, { useEffect, useRef, useState, useCallback } from "react";
import MainHeader from "../MainHeader/MainHeader";
import "./MainDashboard.scss";
import defaultPic from "../../Assets/img/frameee.png";
import TitleBox from "../TitleBox/TitleBox";
import PriceSection from "../PriceSection/PriceSection";
import axios from "axios";
import Footerr from "../Footer/Footerr";
import Swal from "sweetalert2";
import { formatToPersianAddComma } from "../../Assets/utils/CommaSeprator";
// import { json } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { prefixUrl } from "../../utils/utilsData";

const MainDashboard = () => {
  const [prices, setPrices] = useState({
    priceUnderNumberOfUser: 0,
    priceUnderNumberOfAPK: 0,
  });
  const [state, setState] = useState("windows");
  const [data, setData] = useState([]);
  const cardSelector = useRef();
  const [cardData, setCardData] = useState();
  const [listItem, setListItem] = useState([]);
  const [time, timeSetter] = useState("price_1");
  const [totalPrice, setTotalPrice] = useState(0); //قیمت کل
  const [totalSum, setTotalSum] = useState(0); //جمع کل
  const [apkSelector, setApkSelector] = useState("1");
  const [support, setSupport] = useState(0);
  const [apkOption, setApkOption] = useState(0);
  const [userOption, setUserOption] = useState([]);
  const [discount, setDiscount] = useState(0); //درصد تخفیف که بعدا قرار داده میشه
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [serverPrices, setServerPrices] = useState(0); //هزینه سرور
  const [supportive, setSupportive] = useState(0); //هزینه پشتیبانی
  const [servicePrice, setServicePrice] = useState(0);
  const [userNumbers, setUserNumbers] = useState(0); //تعداد کاربران
  const [saveData, setSaveData] = useState([]);
  const removeParentChecked = useRef();
  const [loader, setLoader] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [checkState, setCheckState] = useState(false);
  const [checkboxes, setCheckBoxes] = useState({});

  //اکتیو کردن محصولی که روش کلیک شده
  const clickHandler = (e) => {
    setCardData(e.currentTarget.id);
    let activeChild = cardSelector.current.querySelector(".softBoxActive_");
    if (activeChild) {
      if (activeChild === e.currentTarget) {
      } else if (activeChild !== e.currentTarget) {
        activeChild.classList.remove("softBoxActive_");
        e.currentTarget.classList.add("softBoxActive_");
      }
    } else {
      e.currentTarget.classList.add("softBoxActive_");
      setIsLoading(true);
    }
  };

  //اضافه شدن آیتم های  که تیک زده شدن به saveData
  const addCheckedItemsToSaveDataState = (data) => {
    const temp = [];
    data.forEach((singleItemObject) => {
      if (singleItemObject.checked) {
        temp.push(singleItemObject);
      }
    });
    setSaveData(temp);
  };

  //درخواست تمام آیتم های هر محصول
  useEffect(() => {
    axios
      .get(prefixUrl() + `/ravanhesabProductData/?productId=${cardData}`)
      .then((response) => {
        setListItem([...response.data.productData.items]); //لیست تمامی آیتم های هر محصول
        setUserOption([...response.data.productData.userOptions]); //تعداد کاربران
        addCheckedItemsToSaveDataState(response.data.productData.items); //لیست آیتم های تیک خورده
        setServicePrice(response.data.productData.serverPrice); //هزینه سرور
        setSupport(response.data.productData.supportPrice); //هزینه پشتیبانی
        if (response.data.productData.apkOptions === false) {
          setApkOption(0);
        } else {
          setApkOption(response.data.productData.apkOptions); //هزینه apk
        }
        if (response.data.productData.userOptions.length === 0) {
          setNumberOfUsers(0);
          setUserNumbers(0);
        } else {
          setNumberOfUsers(response.data.productData.userOptions[0].percent); //درصد هزینه هر کاربر
          setUserNumbers(
            response.data.productData.userOptions[0].numberOfUsers
          ); //تعداد کاربر
        }
        setIsLoading(false);
        setLoader(false);
      });
  }, [cardData]);
  useEffect(() => {
    const checkListObj = listItem.reduce((acc, item) => {
      acc[item.itemId] = false;
      return acc;
    }, {});
    console.log(checkListObj);
    setCheckBoxes(checkListObj);
  }, [listItem]);

  //درخواست تمام آیتم های هر محصول

  const submitHandler = () => {
    let newData = [];
    saveData.forEach((v) => {
      newData.push({
        itemId: v.itemId,
        itemDescription: v.itemDescription,
        itemTitle: v.itemTitle,
        itemPrice:
          time === "price_1"
            ? v.price_1
            : time === "price_2"
            ? v.price_2
            : time === "price_3"
            ? v.price_3
            : time === "price_4"
            ? v.price_4
            : v.price_5,
      });
    });

    let data = [
      { name: "productId", value: cardData },
      { name: "duration", value: time },
      { name: "numberOfApk", value: apkSelector },
      { name: " price", value: prices.priceUnderNumberOfAPK },
      { name: "supportPrice", value: supportive },
      { name: "serverPrice", value: serverPrices },
      { name: "percent", value: numberOfUsers },
      { name: "items", value: JSON.stringify(newData) },
      { name: "numberOfUsers", value: userNumbers },
    ];

    let formData = new FormData();
    data.forEach((v) => {
      formData.append(v.name, v.value);
    });

    axios.post(prefixUrl() + `/addBill/`, formData).then((response) => {
      debugger;
      if (response.data.status) {
        toast("success", response.data.message);
        setTimeout(() => {
          // 👇️ redirects to an external URL
          window.location.replace(response.data.link);
        }, 3000);
      } else {
        toast("error", response.data.message);
      }
    });
  };

  useEffect(() => {
    axios
      .get(prefixUrl() + `/getRavanhesabProducts/?platform=${state}`)
      .then((response) => {
        setData([...response.data.productsData]);
        setLoader(false);
      });
  }, [state]);

  const timeSelector = (e) => {
    const selectedTime = e.target.value;
    timeSetter(selectedTime);
  };
  const updatePrices = () => {
    let totalPrices = calculateTotalItemPrice(time);
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
    const serverPrice = Math.floor(servicePrice / myNumberToCalulateData); //هزینه سرور
    const supportPrice = Math.floor(support / myNumberToCalulateData); //هزینه پشتبانی
    let totalUserPrice =
      (totalPrices + serverPrice + supportPrice) * (numberOfUsers / 100); //درصد هزینه کاربر

    let totalAPKPrice = apkOption * apkSelector; //هزینه apk
    const temp = { ...prices };
    temp.priceUnderNumberOfAPK = totalAPKPrice; //هزینه apk

    temp.priceUnderNumberOfUser = totalUserPrice; //هزینه کاربر

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
    const selectedTime = time; //برای چند مدت انتخاب شده

    let numberOfUsersPercentage = 0;
    if (userOption !== undefined && userOption.length > 0) {
      numberOfUsersPercentage = numberOfUsers; //درصد هزینه کاربر
    }

    // i want to calculate sumOfCheked in items
    let totalItemPrice = calculateTotalItemPrice(selectedTime); //جمع تمامی آیتم های تیک خورده

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
    const serverPrice = Math.floor(servicePrice / myNumberToCalulateData); //هزینه سرور
    setServerPrices(serverPrice); //هزینه سرور
    const supportPrice = Math.floor(support / myNumberToCalulateData); //هزینه پشتبانی
    setSupportive(supportPrice); //هزینه پشتبانی
    numberOfUsersPercentage = parseFloat(numberOfUsersPercentage); //درصد کاربر
    totalPrice =
      totalItemPrice +
      serverPrice +
      supportPrice +
      Math.abs(prices.priceUnderNumberOfUser.toFixed(2)) +
      apkOption * apkSelector;
    setTotalPrice(totalPrice.toFixed(2));

    //جمع کل
    let someCumputedwithDiscount = Math.floor(
      totalPrice - discount + (totalPrice + discount) * (9 / 100)
    );
    setTotalSum(someCumputedwithDiscount);
  };

  const numberOfUsersHandler = (e) => {
    setNumberOfUsers(e.target.value);
    let index = e.target.selectedIndex;
    setUserNumbers(e.target[index].text);
  };

  const changeHandlerApk = (e) => {
    setApkSelector(e.target.value);
  };

  const RemoveUncheckedItem = (e, v) => {
    const tempListItem = [...listItem];
    tempListItem.forEach((item) => {
      if (item.prerequisite.length > 0) {
        item.prerequisite.forEach((prereqId) => {
          if (prereqId === e.target.id) {
            let temp = [...saveData];
            if (temp.length > 0) {
              let newTemp = temp.filter(
                (tempId) => tempId.itemId !== item.itemId
              );
              let newArray = newTemp.filter(
                (item) => item.itemId !== e.target.id
              );
              setSaveData(newArray);
              if (
                removeParentChecked.current.querySelector(`#${item.itemId}`)
                  .checked
              ) {
                removeParentChecked.current.querySelector(
                  `#${item.itemId}`
                ).checked = false;
                return;
              }
            }
          }
        });
      }
    });
  };
 
  const myAwsomeChangeHandler = (e, myAwesomeObject) => {
    if (myAwesomeObject === "all") {
      const updatedResultObject = { ...checkboxes };
      for (const key in updatedResultObject) {
        updatedResultObject[key] = checkState;
      }
      console.log(updatedResultObject);
      setCheckBoxes(updatedResultObject);
      listItem.map((item) => setSaveData((prevData) => [...prevData, item]));
    }
    if (e.target.checked) {
      if (myAwesomeObject.prerequisite.length > 0) {
        let dependeny = false;

        let text = "";
        myAwesomeObject.prerequisite.forEach((itemId) => {
          const temp = [...saveData].filter(
            (item) => item.itemId === itemId
          )[0];

          if (temp === undefined) {
            listItem.forEach((item) => {
              if (item.itemId === itemId) {
                text += `${item.itemTitle}, `;
                dependeny = true;
              }
            });
          }
        });

        if (dependeny) {
          Swal.fire(`ابتدا باید آیتم  ${text}را انتخاب کنید `);
          e.target.checked = false;
          return;
        }
      }

      setSaveData([...saveData, myAwesomeObject]);
    } else {
      const temp = [...saveData];
      const result = temp.filter(
        (item) => item.itemId !== myAwesomeObject.itemId
      );
      setSaveData(result); //آیتمی که unchecked شده را از توی savedata بردار
      RemoveUncheckedItem(e, myAwesomeObject);

      return;
    }
  };
  const handleChangeAllCheckbox = useCallback(
    (e) => {
      // Toggle checkState and apply the change immediately
      setCheckState((prevState) => !prevState);
      myAwsomeChangeHandler(e, "all");
    },
    [myAwsomeChangeHandler] // Dependency array to ensure the function references the latest myAwsomeChangeHandler
  );
  useEffect(() => {
    calculateSum();
    updatePrices();
  }, [numberOfUsers, time, userOption, apkSelector, saveData, apkOption]);

  useEffect(() => {
    calculateSum();
  }, [prices]);
  useEffect(() => {
    setListItem([]);
    setSupportive(0);
    setServerPrices(0);
    setTotalPrice(0);
    setTotalSum(0);
  }, [state]);

  return (
    <div className="dashboard_wrapper">
      <MainHeader
        state={state}
        setState={setState}
        setItems={setListItem}
        loader={loader}
        setLoader={setLoader}
      />
      <div className="sub_header_">
        <h1>نرم‌‌افزار حسابداری و صندوق فروشگاهی روان حساب</h1>
        <span>
          در زیر قیمت سیستم‌های نرم افزار روان حساب را مشاهده می‌نمایید. جهت ثبت
          سفارش و یا هماهنگی جهت جلسه حضوری اطلاعات خود را ثبت نمایید.
        </span>
      </div>
      <div className="cardsContainer_" ref={cardSelector}>
        {loader === false ? (
          data.map((item, index) => (
            <TitleBox
              url={
                item.productPicture !== "" ? item.productPicture : defaultPic
              }
              title={`${item.productName}`}
              id={`${item.productId}`}
              key={index}
              onClick={clickHandler}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
      <div className="cards_contents_parent">
        <div className="cards_contents_right" ref={removeParentChecked}>
          <div className="header_section">
            <span>سیستم‌ ها</span>
          </div>
          <PriceSection
            className={"darkGray_"}
            id={"all"}
            key={749}
            pricehidden={""}
            price={""}
            title={"انتخاب همه"}
            discription={""}
            picSrc={""}
            videoSrc={""}
            disabled={false}
            checked={false}
            changeHandler={(e) => handleChangeAllCheckbox()}
          />
          {isloading === false ? (
            listItem.map((v, index) => (
              <PriceSection
                className={index % 2 === 0 ? "lightGray_" : "darkGray_"}
                id={v.itemId}
                key={index}
                setCheck={checkboxes[v.itemId]}
                pricehidden={v.hiddenPrice}
                price={
                  time === "price_1"
                    ? formatToPersianAddComma(v.price_1)
                    : time === "price_2"
                    ? formatToPersianAddComma(v.price_2)
                    : time === "price_3"
                    ? formatToPersianAddComma(v.price_3)
                    : time === "price_4"
                    ? formatToPersianAddComma(v.price_4)
                    : formatToPersianAddComma(v.price_5)
                }
                title={v.itemTitle}
                discription={v.itemDescription}
                picSrc={v.itemPicture}
                videoSrc={v.itemFilm}
                disabled={v.active === false ? true : false}
                checked={v.checked ? true : false}
                changeHandler={(e) => myAwsomeChangeHandler(e, v)}
              />
            ))
          ) : (
            <Loader text={"در حال بارگزاری..."} />
          )}
        </div>
        <div className="cards_contents_left">
          <div className="cards_contents_left_top">
            <div className="header_section">
              <span>امکانات جانبی</span>
            </div>
            <div className="form_cards_content">
              <div className="extra_costs">
                <label>
                  هزینه سرور:{formatToPersianAddComma(serverPrices)} تومان
                </label>
                <label>
                  هزینه پشتیبانی: {formatToPersianAddComma(supportive)} تومان
                </label>
              </div>
              {userOption !== undefined && userOption.length > 0 && (
                <div className="price_parent">
                  <div className="selectBox_parent">
                    <label htmlFor="userNumber">تعداد کاربر</label>
                    <select
                      id="userNumber"
                      value={numberOfUsers}
                      onChange={numberOfUsersHandler}
                    >
                      {userOption.length > 0 &&
                        userOption.map((item, index) => (
                          <option value={item.percent} key={index}>
                            {item.numberOfUsers}
                          </option>
                        ))}
                    </select>
                  </div>
                  <span>
                    قیمت :{" "}
                    {formatToPersianAddComma(
                      Math.abs(prices.priceUnderNumberOfUser)
                    )}{" "}
                    تومان
                  </span>
                </div>
              )}

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

              {apkOption !== 0 && (
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
                  <span>
                    قیمت :{" "}
                    {formatToPersianAddComma(prices.priceUnderNumberOfAPK)}{" "}
                    تومان
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="cards_contents_left_bottom">
            <div className="header_section submit__btn">
              <span>قیمت نهایی</span>
            </div>
            <div className="form_cards_content_bottom">
              <div className="totallBox_">
                <div className="totall_price">
                  <span>قیمت کل :</span>
                  <span>{formatToPersianAddComma(totalPrice)} تومان</span>
                </div>
                {/* <div className="totall_price">
                  <span> تخـفـیـف : </span>
                  <span className="discount_">{discount}%</span>
                </div> */}
                <div className="totall_price">
                  <span> مالیات و عوارض :</span>
                  <span>{formatToPersianAddComma(9)}%</span>
                </div>
                <div className="totall_price">
                  <span> جمع کل :</span>
                  <span className="totall">
                    {formatToPersianAddComma(totalSum)} تومان
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button className="submit__btn" onClick={submitHandler}>
            ثبت
          </button>
        </div>
      </div>
      <Footerr />
    </div>
  );
};

export default MainDashboard;
