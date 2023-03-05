import React from 'react';
import {Link} from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/footer";

const Page_404 = () => {
  return (
<div>
  <Header/>
  <div className="not-found-container">
    <h1>404</h1>
    <h2>صفحه یافت نشد!</h2>
    <p>
      بهترین کار حالا چیه؟
      <br/>
      تماس با پشتیبانی سایت و یا رفتن به صفحه اصلی
      😉
    </p>
    <Link to={"/"}>صفحه اصلی </Link>
  </div>


  <Footer/>

</div>
  );
};

export default Page_404;
