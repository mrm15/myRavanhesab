// import { useState } from 'react';
import './MainHeader.scss';
import { useRef } from 'react';

const MainHeader = (props) => {

  const navSelector = useRef();

  const clickHandler = (e) => {
    props.setState(e.currentTarget.id);
    let activeChild = navSelector.current.querySelector(".tabs_active");
    if (activeChild) {
      activeChild.classList.remove("tabs_active");
    }
    e.currentTarget.classList.add("tabs_active");
  }

  return (
    <div className="header_wrapper">
      <svg
        width="163"
        height="28"
        viewBox="0 0 163 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M124.03 0H124.017C122.401 0 121.088 1.31332 121.088 2.92871V19.122C121.088 20.7373 119.787 22.0507 118.185 22.0901C118.159 22.0901 118.145 22.0901 118.119 22.0901C116.49 22.0901 115.164 23.4165 115.164 25.045C115.164 26.6735 116.49 28 118.119 28C118.329 28 118.526 27.9737 118.71 27.9343C123.32 27.6191 126.972 23.8236 126.972 19.1351V2.94184C126.959 1.31332 125.645 0 124.03 0Z"
          fill="#33A980"
        />
        <path
          d="M115.505 7.36773C115.505 3.29644 112.209 0 108.15 0C104.091 0 100.795 3.29644 100.795 7.3546V14.4597C100.795 16.0882 102.108 17.4015 103.737 17.4015C105.365 17.4015 106.679 16.0882 106.679 14.4597V7.3546C106.679 6.54034 107.336 5.88368 108.15 5.88368C108.964 5.88368 109.621 6.54034 109.621 7.3546V16.2064C109.621 19.4634 106.981 22.1032 103.724 22.1032C102.095 22.1032 100.781 23.4165 100.781 25.045C100.781 26.6735 102.095 27.9869 103.724 27.9869C110.225 27.9869 115.505 22.7073 115.505 16.2064V7.3546V7.36773Z"
          fill="#33A980"
        />
        <path
          d="M94.8711 0.0262451H94.858C93.2424 0.0262451 91.929 1.33957 91.929 2.95495V25.045C91.929 26.6735 93.2424 27.9868 94.8711 27.9868C96.4998 27.9868 97.8132 26.6735 97.8132 25.045V2.96808C97.8132 1.3527 96.4998 0.0393783 94.8842 0.0393783L94.8711 0.0262451Z"
          fill="#33A980"
        />
        <path
          d="M68.3128 0H59.4601C57.8446 0 56.5311 1.31332 56.5311 2.92871V14.4597C56.5311 16.0882 57.8446 17.4015 59.4733 17.4015C61.102 17.4015 62.4154 16.0882 62.4154 14.4597V5.88368H65.3838V16.1932C65.3838 19.4503 62.7438 22.1032 59.4733 22.1032C56.2028 22.1032 53.5627 19.4634 53.5627 16.1932V8.82552C53.5627 7.21013 52.2493 5.89681 50.6337 5.89681H50.6206C49.005 5.89681 47.6916 7.21013 47.6916 8.82552V20.6191C47.6916 21.4334 47.0348 22.0901 46.2205 22.0901C45.4062 22.0901 44.7494 21.4334 44.7494 20.6191V8.83865C44.7494 7.22326 43.436 5.90994 41.8204 5.90994H41.8073H41.7941C40.1786 5.90994 38.8651 7.22326 38.8651 8.83865V20.6323C38.8651 21.4465 38.2084 22.1032 37.3941 22.1032C36.5797 22.1032 35.923 21.4465 35.923 20.6323V8.83865C35.923 7.22326 34.6095 5.90994 32.994 5.90994H32.9677C31.3522 5.90994 30.0387 7.22326 30.0387 8.83865V20.6323C30.0387 21.4465 29.382 22.1032 28.5676 22.1032C27.7533 22.1032 27.0966 21.4465 27.0966 20.6323V2.94184C27.0178 1.31332 25.7043 0 24.0887 0H24.0756C22.4601 0 21.1466 1.31332 21.1466 2.92871V20.6191C21.1466 24.6904 24.4434 27.9737 28.502 27.9737C30.1701 27.9737 31.6937 27.3959 32.9283 26.4634C34.163 27.3959 35.6866 27.9737 37.3547 27.9737C39.0228 27.9737 40.5464 27.3959 41.781 26.4634C43.0157 27.3959 44.5393 27.9737 46.2074 27.9737C48.519 27.9737 50.5549 26.8837 51.9078 25.2289C53.9568 26.9493 56.5837 27.9737 59.4733 27.9737C65.9749 27.9737 71.255 22.6942 71.255 16.1932V2.94184C71.2419 1.31332 69.9284 0 68.3128 0Z"
          fill="#33A980"
        />
        <path
          d="M77.1655 5.90994C78.7942 5.90994 80.1208 4.58349 80.1208 2.95497C80.1208 1.32645 78.7942 0 77.1655 0C75.5368 0 74.2102 1.32645 74.2102 2.95497C74.2102 4.58349 75.5368 5.90994 77.1655 5.90994Z"
          fill="#33A980"
        />
        <path
          d="M86.0182 0C84.3895 0 83.0761 1.31332 83.0761 2.94184V20.6191C83.0761 21.4465 82.4062 22.1032 81.5919 22.1032C80.7775 22.1032 80.1077 21.4334 80.1077 20.6191V12.2664C80.1077 10.6379 78.7942 9.32458 77.1655 9.32458C75.5368 9.32458 74.2234 10.6379 74.2234 12.2664V20.6191C74.2234 24.6904 77.5202 27.9869 81.5919 27.9869C85.6636 27.9869 88.9604 24.6904 88.9604 20.6191V2.94184C88.9604 1.32645 87.6469 0 86.0182 0Z"
          fill="#33A980"
        />
        <path
          d="M14.8683 0C13.2528 0 11.9393 1.32645 11.9393 2.95497V9.37711C11.9393 11.0056 10.6127 12.3321 8.97091 12.3321H8.87897C7.23715 12.3321 5.91056 11.0056 5.91056 9.37711V2.95497C5.91056 1.33959 4.5971 0 2.95528 0C1.31346 0 0 1.32645 0 2.95497V9.37711C0 14.2627 3.95351 18.2158 8.83957 18.2158H8.95778C13.8438 18.2158 17.8105 14.2627 17.8105 9.37711V2.95497C17.8105 1.33959 16.4839 0 14.8552 0H14.8683Z"
          fill="#33A980"
        />
        <path
          d="M8.90523 22.09C7.27654 22.09 5.94995 23.4165 5.94995 25.045C5.94995 26.6735 7.27654 28 8.90523 28C10.5339 28 11.8605 26.6735 11.8605 25.045C11.8605 23.4165 10.5339 22.09 8.90523 22.09Z"
          fill="#33A980"
        />
        <path
          d="M152.939 0H145.058C139.502 0 134.997 4.50469 134.997 10.06V17.94C134.997 23.4953 139.502 28 145.058 28H152.939C158.495 28 163 23.4953 163 17.94V10.06C163 4.50469 158.495 0 152.939 0ZM145.518 17.1914C145.084 17.2702 144.651 17.3227 144.191 17.3227H140.303C138.964 17.3227 137.887 16.2458 137.887 14.9062C137.887 13.7373 138.714 12.7655 139.817 12.5422C139.975 12.5159 140.133 12.4897 140.303 12.4897H144.191C144.191 12.4897 144.244 12.4897 144.27 12.4897C145.584 12.4503 146.621 11.3865 146.621 10.06V6.63227C146.621 5.30582 147.698 4.21576 149.038 4.21576C150.378 4.21576 151.455 5.29268 151.455 6.63227V10.0732C151.455 11.2946 151.126 12.4371 150.588 13.4484C150.562 13.4878 150.535 13.5403 150.509 13.5797C150.351 13.8687 150.167 14.1576 149.97 14.4203C149.944 14.4465 149.918 14.4728 149.892 14.5122C149.524 14.985 149.09 15.4184 148.618 15.7861C148.539 15.8518 148.46 15.9174 148.381 15.9831C148.21 16.1013 148.027 16.2064 147.843 16.3114C147.646 16.4296 147.449 16.5347 147.238 16.6398C147.068 16.7186 146.91 16.7842 146.739 16.8499C146.477 16.955 146.214 17.0338 145.938 17.0994C145.794 17.1388 145.649 17.1782 145.505 17.2045L145.518 17.1914ZM149.012 23.7711C147.672 23.7711 146.595 22.6942 146.595 21.3546C146.595 20.015 147.672 18.9381 149.012 18.9381C150.351 18.9381 151.428 20.015 151.428 21.3546C151.428 22.6942 150.351 23.7711 149.012 23.7711ZM157.694 17.3227H149.419C151.034 16.1538 152.23 14.4597 152.794 12.4897H157.694C159.033 12.4897 160.11 13.5666 160.11 14.9062C160.11 16.2458 159.033 17.3227 157.694 17.3227Z"
          fill="#33A980"
        />
      </svg>

      <ul className="tabs__parent" ref={navSelector}>
        <li  className={'tabs_li'}  onClick={clickHandler} id='windows'>نرم افزارهای ویندوزی</li>
        <li  className={'tabs_li'}  onClick={clickHandler} id='web'>نرم افزارهای تحت وب</li>
      </ul>
    </div>
  );
};

export default MainHeader;
