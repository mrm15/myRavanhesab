import React from 'react';
import varkanLogo from "../../Assets/img/varkanLogo.png"
import tr from "../translate/translate";
import {Link} from "react-router-dom";
import {AddressIcon, IgIcon, Namad, PhoneIcon, TelegramIcon} from "../../Assets/svg";

const Footer = () => {
    return (
        <div className={"footer__ravanhesab px-5  mt-5"}>
            <div className={"d-flex justify-content-lg-around w-100"}>
                <div style={{maxWidth: 382, textAlign: "justify"}}>
                    <div className={"mb-2"}>
                        <img alt={tr.company_name} src={varkanLogo}/>
                    </div>
                    <p className={"mt-3"}>
                        ما فعالیت خود را در حوزه طراحی و تولید نرم افـزارهای حسـابداری، مدیریتی، آموزشی، اتوماسیون های
                        اداری،
                        اندروید و پردازش تصویر آغاز نموده و خدا را شاکر هستیم که بیش از یک دهه فعالیت در این حوزه،
                        توانستیم رضایت
                        تعداد زیادی از مشتریان را جلب نماییم.
                    </p>
                </div>
                <div>
                    <div className={"footer__head"}> دسترسی سریع</div>
                    <div className={"d-flex justify-content-around footer__head__before__ul mt-4"}>
                        <ul>
                            <li>
                                <a href={"https://ravanhesab.com/"} target={"_blank"}> صفحه اصلی</a>
                            </li>
                            <li>
                                <a href={"https://ravanhesab.com/product-category/%d9%85%d8%ad%d8%b5%d9%88%d9%84%d8%a7%d8%aa/"} target={"_blank"}>
                                    محصولات
                                </a>

                            </li>
                            <li>
                                <a href={"https://ravanhesab.com/"} target={"_blank"}>
                                    پروژه ها
                                </a>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <a href={"https://ravanhesab.com/"} target={"_blank"}>
                                    خدمات ما
                                </a>
                            </li>
                            <li>
                                <a href={"https://ravanhesab.com/about-us/"} target={"_blank"}>
                                    درباره ما
                                </a>
                            </li>
                            <li>
                                <a href={"https://ravanhesab.com/contast-us/"} target={"_blank"}>
                                    ارتباط با ما
                                </a>
                            </li>
                        </ul>

                    </div>

                </div>
                <div style={{maxWidth:200}}>
                    <div className={"footer__head"}>
                        <div className={""}>ارتباط با ما</div>
                    </div>
                    <div className={"mt-4"} >
                        <div className={"d-flex"} >
                            <div className={"ps-2 cursor_pointer"} ><a  href="https://goo.gl/maps/9MZG58ztMBiRzKNZ6" target={"_blank"}><AddressIcon/></a></div>
                            <div className={"footer__address"}>{tr.footer_address}</div>
                        </div>
                        <div className={"d-flex justify-content-between   pt-4"}>
                          <div className={"cursor_pointer"}><a href="https://www.instagram.com/ravanhesab/" target={"_blank"}><IgIcon/></a></div>
                          <div className={"cursor_pointer"}><a href="tel:02191018137" target={"_blank"}><PhoneIcon/></a></div>
                          <div className={"cursor_pointer"}><TelegramIcon/></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={""}>
                        <div><Namad/></div>
                        <div className={"mt-2"}><Namad/></div>
                    </div>

                </div>
            </div>
        <hr style={{height: 3, backgroundColor: "white", border: 'none'}}/>
            <div className={"footer__copy__right text-center pb-3"}>
                تمامی حقوق این وب سایت متعلق به
                <a href={"http://varkan.ir/"}  target={"_blank"} > {tr.varkan} </a>
                می باشد

            </div>
        </div>
    );
};

export default Footer;
