import React, { useEffect } from "react";
import MainHeader from "../MainHeader/MainHeader";
import "./MainDashboard.scss";
import { carwash } from "../../Assets/js/images";
import TitleBox from "../TitleBox/TitleBox";
import PriceSection from "../PriceSection/PriceSection";
import axios from "axios";

const MainDashboard = () => {
    let localData = localStorage.getItem("NavId")
  useEffect(() => {
    axios
      .get(
        `/getRavanhesabProducts/?platform=${localData}`
      )
      .then((response) => {
        console.log(response);
      });
  }, [localData]);
  return (
    <div className="dashboard_wrapper">
      <MainHeader />
      <div className="sub_header_">
        <h1>نرم‌‌افزار حسابداری و صندوق فروشگاهی روان حساب</h1>
        <span>
          در زیر قیمت سیستم‌های نرم افزار روان حساب را مشاهده می‌نمایید. جهت ثبت
          سفارش و یا هماهنگی جهت جلسه حضوری اطلاعات خود را ثبت نمایید.
        </span>
      </div>
      <div className="cardsContainer_">
        <TitleBox url={carwash} title={"کارواش"} id={"1id"} />
        <TitleBox url={carwash} title={"کارواش"} id={"2id"} />
        <TitleBox url={carwash} title={"کارواش"} id={"3id"} />
        <TitleBox url={carwash} title={"کارواش"} id={"4id"} />
        <TitleBox url={carwash} title={"کارواش"} id={"5id"} />
        <TitleBox url={carwash} title={"کارواش"} id={"6id"} />
        <TitleBox url={carwash} title={"کارواش"} id={"8id"} />
        <TitleBox url={carwash} title={"کارواش"} id={"9id"} />
      </div>
      <div className="cards_contents_parent">
        <div className="cards_contents_right">
          <div className="header_section">
            <span>سیستم‌ ها</span>
          </div>
          <PriceSection className={"lightGray_"} id={"1"} />
          <PriceSection className={"darkGray_"} id={"2"} />
          <PriceSection className={"lightGray_"} id={"3"} />
          <PriceSection className={"darkGray_"} id={"4"} />
          <PriceSection className={"lightGray_"} id={"5"} />
        </div>
        <div className="cards_contents_left">
          <div className="cards_contents_left_top">
            <div className="header_section">
              <span>امکانات جانبی</span>
            </div>
            <div className="form_cards_content">
              <div className="price_parent">
                <div className="selectBox_parent">
                  <label htmlFor="userNumber">تعداد کاربر</label>
                  <select id="userNumber">
                    <option value={0}>اطلاعات خود را وارد کنید</option>
                  </select>
                </div>
                <span>قیمت : 0 ريال</span>
              </div>

              <div className="price_parent">
                <div className="selectBox_parent">
                  <label htmlFor="chosenTime">انتخاب زمان </label>
                  <select id="chosenTime">
                    <option value={0}>اطلاعات خود را وارد کنید</option>
                  </select>
                </div>
                <span>قیمت : 0 ريال</span>
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
                  <span>600,000 تومان</span>
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
    </div>
  );
};

export default MainDashboard;
