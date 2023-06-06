import React from 'react';
import './footerr.css';
import backgroundFooter from '../../Assets/img/Group 10.png';
import resbackgroundFooter from '../../Assets/img/res900.png';
import imagemobile from '../../Assets/img/2374 copy 1.png';
import imagewindows from '../../Assets/img/Group 4.png';
import imageandroid from '../../Assets/img/android.png';
import imageios from '../../Assets/img/Group 2.png';
import logofooter from '../../Assets/img/logo-footer.png';
import Ellipse from '../../Assets/img/Ellipse 12.png';
import imagelocation from '../../Assets/img/location 1.png';
import imageemail from '../../Assets/img/sms 1.png';
import imagetelephone from '../../Assets/img/call 1.png';
import responsi from '../../Assets/img/responsive650.png';
import respons from '../../Assets/img/Frame 104.png';

const Footerr = () => {
    return (
      <div>
        <div className="footer">
          <div className="background-footer">
            <div className="image-background">
              <img className="res" src={backgroundFooter} />
              <img className="resp" src={resbackgroundFooter} />
            </div>
            <div className="image-mobile">
              <img src={imagemobile} />
            </div>
            <div className="span-circle">
              <span>برنامه روان حساب روی همه کامپیوترهای ویندوزی، مک و همه گوشی‌ها و تبلت‌های اندروید یا iOS قابل نصب است.</span>
            </div>
            <div className="three-image">
              <a href="#">
                <div className="image-windows">
                  <img src={imagewindows} />
                </div>
              </a>
              <a href="#">
                <div className="image-android">
                  <img src={imageandroid} />
                </div>
              </a>
              <a href="#">
                <div className="image-ios">
                  <img src={imageios} />
                </div>
              </a>
            </div>
            <div className="column-footer">
              <div className="logo-footer">
                <img src={logofooter}/>
              </div>
              <div className="paragraph-footer">
                <span>ما فعالیت خود را در حوزه طراحی و تولید نرم افـزارهای حسـابداری، مدیریتی، آموزشی، اتوماسیون های اداری، اندروید و پردازش تصویر آغاز نموده و خدا را شاکر هستیم که بیش از یک دهه فعالیت در این حوزه، توانستیم رضایت تعداد زیادی از مشتریان را جلب نماییم.</span>
              </div>
              <div className="row-footer">
                <div className="column-footerr">
                  <div className="title-dastresi">
                    <span>دسترسی سریع</span>
                  </div>
                  <div className="row-footter">
                    <div className="two-column">
                      <div className="row-foter">
                        <div className="image-circle">
                          <img src={Ellipse} />
                        </div>
                        <a href="#">
                        <div className="text-footer">
                          <span>صفحه اصلی</span>
                        </div>
                        </a>
                      </div>
                      <div className="row-foter">
                        <div className="image-circle">
                          <img src={Ellipse} />
                        </div>
                        <a href="#">
                        <div className="text-footer">
                          <span>درباره ما</span>
                        </div>
                        </a>
                      </div>
                    </div>
                    <div className="two-column">
                      <div className="row-foter">
                        <div className="image-circle">
                          <img src={Ellipse} />
                        </div>
                        <a href="http://varkan.ir/">
                        <div className="text-footerr">
                          <span>برنامه سازان ورکان</span>
                        </div>
                        </a>
                      </div>
                      <div className="row-foter">
                        <div className="image-circle">
                          <img src={Ellipse} />
                        </div>
                        <a href="#">
                        <div className="text-footer">
                          <span>تماس با ما</span>
                        </div>
                        </a>
                      </div>
                    </div>
                    <div className="two-column">
                      <div className="row-foter">
                        <div className="image-circle">
                          <img src={Ellipse} />
                        </div>
                        <a href="https://www.anipo.ir/">
                        <div className="text-footer">
                          <span>آنیپو</span>
                        </div>
                        </a>
                      </div>
                      <div className="row-foter">
                        <div className="image-circle">
                          <img src={Ellipse} />
                        </div>
                        <a href="#">
                        <div className="text-footer">
                          <span>ای آیلند</span>
                        </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column-footerr">
                  <div className="title-ertebat">
                    <span>ارتباط با ما</span>
                  </div>
                  <div className="row-address">
                    <div className="image-location">
                      <img src={imagelocation} />
                    </div>
                    <div className="span-address">
                      <span>گلستان ، گرگان ، میدان مفتح، کارخانه نوآوری استان گلستان، واحد 411</span>
                    </div>
                  </div>
                  <div className="roww">
                    <div className="row-email">
                      <div className="image-email">
                        <img src={imageemail} />
                      </div>
                      <div className="span-email">
                        <span>ravanhesab</span>
                      </div>
                    </div>
                    <div className="row-tamas">
                      <div className="shomare">
                        <span>02191018137</span>
                      </div>
                      <div className="image-telephone">
                        <img src={imagetelephone} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-ravanhesab">
                <p>تمام حقوق این سایت متعلق به <span className="ravanhesabb">روان حساب</span> می باشد</p>
              </div>
            </div>
          </div>
        </div>
        {/* responsive:720 */}
        <div className="footer-responsive">
          <div className="background-footer">
            <div className="image-background">
              <img src={backgroundFooter} />
              <div className="image-mobile">
                <img src={imagemobile} />
              </div>
              <div className="span-circle">
                <span>برنامه روان حساب روی همه کامپیوترهای ویندوزی، مک و همه گوشی‌ها و تبلت‌های اندروید یا iOS قابل نصب است.</span>
              </div>
              <div className="three-image">
              <a href="#">
                <div className="image-windows">
                  <img src={imagewindows} />
                </div>
              </a>
              <a href="#">
                <div className="image-android">
                  <img src={imageandroid} />
                </div>
              </a>
              <a href="#">
                <div className="image-ios">
                  <img src={imageios} />
                </div>
              </a>
              </div>
              <div className="column-footer">
                <div className="logo-footer">
                  <img src={logofooter}/>
                </div>
                <div className="paragraph-footer">
                  <span>ما فعالیت خود را در حوزه طراحی و تولید نرم افـزارهای حسـابداری، مدیریتی، آموزشی، اتوماسیون های اداری، اندروید و پردازش تصویر آغاز نموده و خدا را شاکر هستیم که بیش از یک دهه فعالیت در این حوزه، توانستیم رضایت تعداد زیادی از مشتریان را جلب نماییم.</span>
                </div>
                <div className="row-footer">
                  <div className="column-footerr">
                    <div className="title-dastresi">
                      <span>دسترسی سریع</span>
                    </div>
                    <div className="row-footter">
                      <div className="two-column">
                        <div className="row-foter">
                          <div className="image-circle">
                            <img src={Ellipse} />
                          </div>
                          <div className="text-footer">
                            <span>صفحه اصلی</span>
                          </div>
                        </div>
                        <div className="row-foter">
                          <div className="image-circle">
                            <img src={Ellipse} />
                          </div>
                          <div className="text-footer">
                            <span>درباره ما</span>
                          </div>
                        </div>
                      </div>
                      <div className="two-column">
                        <div className="row-foter">
                          <div className="image-circle">
                            <img src={Ellipse} />
                          </div>
                          <div className="text-footerr">
                            <span>برنامه سازان ورکان</span>
                          </div>
                        </div>
                        <div className="row-foter">
                          <div className="image-circle">
                            <img src={Ellipse} />
                          </div>
                          <div className="text-footer">
                            <span>تماس با ما</span>
                          </div>
                        </div>
                      </div>
                      <div className="two-column">
                        <div className="row-foter">
                          <div className="image-circle">
                            <img src={Ellipse} />
                          </div>
                          <div className="text-footer">
                            <span>آنیپو</span>
                          </div>
                        </div>
                        <div className="row-foter">
                          <div className="image-circle">
                            <img src={Ellipse} />
                          </div>
                          <div className="text-footer">
                            <span>ای آیلند</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="column-footerr">
                    <div className="title-ertebat">
                      <span>ارتباط با ما</span>
                    </div>
                    <div className="row-address">
                      <div className="image-location">
                        <img src={imagelocation} />
                      </div>
                      <div className="span-address">
                        <span>گلستان ، گرگان ، میدان مفتح، کارخانه نوآوری استان گلستان، واحد 411</span>
                      </div>
                    </div>
                    <div className="roww">
                      <div className="row-email">
                        <div className="image-email">
                          <img src={imageemail} />
                        </div>
                        <div className="span-email">
                          <span>ravanhesab</span>
                        </div>
                      </div>
                      <div className="row-tamas">
                        <div className="shomare">
                          <span>02191018137</span>
                        </div>
                        <div className="image-telephone">
                          <img src={imagetelephone} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-ravanhesab">
                  <p>تمام حقوق این سایت متعلق به <span className="ravanhesabb">روان حساب</span> می باشد</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* responsive:650 */}
        <div className="footer-responsive-one">
          <div className="background-footer">
            <div className="image-background">
              <img className="responsi" src={responsi} />
              <img className="respons" src={respons} />
              <div className="image-mobile">
                <img src={imagemobile} />
              </div>
              <div className="span-circle">
                <span>برنامه روان حساب روی همه کامپیوترهای ویندوزی، مک و همه گوشی‌ها و تبلت‌های اندروید یا iOS قابل نصب است.</span>
              </div>
              <div className="three-image">
              <a href="#">
                <div className="image-windows">
                  <img src={imagewindows} />
                </div>
              </a>
              <a href="#">
                <div className="image-android">
                  <img src={imageandroid} />
                </div>
              </a>
              <a href="#">
                <div className="image-ios">
                  <img src={imageios} />
                </div>
              </a>
              </div>
              <div className="column-footer">
                <div className="logo-footer">
                  <img src={logofooter} />
                </div>
                <div className="paragraph-footer">
                  <span>ما فعالیت خود را در حوزه طراحی و تولید نرم افـزارهای حسـابداری، مدیریتی، آموزشی، اتوماسیون های اداری، اندروید و پردازش تصویر آغاز نموده و خدا را شاکر هستیم که بیش از یک دهه فعالیت در این حوزه، توانستیم رضایت تعداد زیادی از مشتریان را جلب نماییم.</span>
                </div>
                <div className="row-footer">
                  <div className="column-footerr">
                    <div className="title-dastresi">
                      <span>دسترسی سریع</span>
                    </div>
                    <div className="row-footter">
                      <div className="two-column">
                        <div className="row-foter">
                          <div className="image-circle">
                            <img src={Ellipse} />
                          </div>
                          <div className="text-footer">
                            <span>صفحه اصلی</span>
                          </div>
                        </div>
                        <div className="row-foter">
                          <div className="image-circle">
                            <img src={Ellipse} />
                          </div>
                          <div className="text-footer">
                            <span>درباره ما</span>
                          </div>
                        </div>
                      </div>
                      <div className="two-column">
                        <div className="row-foter">
                          <div className="image-circle">
                            <img src={Ellipse} />
                          </div>
                          <div className="text-footerr">
                            <span>برنامه سازان ورکان</span>
                          </div>
                        </div>
                        <div className="row-foter">
                          <div className="image-circle">
                            <img src={Ellipse} />
                          </div>
                          <div className="text-footer">
                            <span>تماس با ما</span>
                          </div>
                        </div>
                      </div>
                      <div className="two-column">
                        <div className="row-foter">
                          <div className="image-circle">
                            <img src={Ellipse} />
                          </div>
                          <div className="text-footer">
                            <span>آنیپو</span>
                          </div>
                        </div>
                        <div className="row-foter">
                          <div className="image-circle">
                            <img src={Ellipse} />
                          </div>
                          <div className="text-footer">
                            <span>ای آیلند</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="column-footerr">
                    <div className="title-ertebat">
                      <span>ارتباط با ما</span>
                    </div>
                    <div className="row-address">
                      <div className="image-location">
                        <img src={imagelocation} />
                      </div>
                      <div className="span-address">
                        <span>گلستان ، گرگان ، میدان مفتح، کارخانه نوآوری استان گلستان، واحد 411</span>
                      </div>
                    </div>
                    <div className="roww">
                      <div className="row-email">
                        <div className="image-email">
                          <img src={imageemail} />
                        </div>
                        <div className="span-email">
                          <span>ravanhesab</span>
                        </div>
                      </div>
                      <div className="row-tamas">
                        <div className="shomare">
                          <span>02191018137</span>
                        </div>
                        <div className="image-telephone">
                          <img src={imagetelephone } />
                        </div>
                      </div>
                    </div>
                    <div className="text-ravanhesab">
                      <p>تمام حقوق این سایت متعلق به <span className="ravanhesabb">روان حساب</span> می باشد</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Footerr;