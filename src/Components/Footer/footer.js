import React from 'react';
import varkanLogo from "../../Assets/img/varkanLogo.png"
import tr from "../translate/translate";
const Footer = () => {
  return (
    <div>
      من فوترم در اینجا 🙂

      <div className={"d-flex justify-content-lg-around w-100"}>
        <div style={{maxWidth:382, textAlign:"justify"}}>
          <div className={"mt-3"} >
            <img alt={tr.company_name} src={varkanLogo}/>
          </div>
          <p className={"mt-3"}>
            ما فعالیت خود را در حوزه طراحی و تولید نرم افـزارهای حسـابداری، مدیریتی، آموزشی، اتوماسیون های اداری، اندروید و پردازش تصویر آغاز نموده و خدا را شاکر هستیم که بیش از یک دهه فعالیت در این حوزه، توانستیم رضایت تعداد زیادی از مشتریان را جلب نماییم.
          </p>
        </div>
        <div>
          <div className={"footer__head"}> دسترسی سریع</div>
        </div>
        <div>3</div>
        <div> 4</div>
      </div>
    </div>
  );
};

export default Footer;
