import React, {useEffect, useState} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import Loader from "../Loader/Loader";
import BoxShadow from "../UI/BoxShadow";
import tr from "../translate/translate";
import axios from "axios";
import Footer from "../Footer/footer";
import {ArrowLeft} from "../../Assets/svg";
import numeric from "../utils/NumericFunction";


const Dashboard = () => {
  const prefixUrl = localStorage.getItem("apiUrl") + "getRavanhesabProducts/";
  const [listItem, setListItem] = useState([]);
  const navigateTo = useNavigate();
  useEffect(() => {
    // اینجا درخواست میزنم بک اند تا لیست روان حساب ها رو بده
    // و اینو  توی همین صفحه نشون میدم

    axios.get(prefixUrl).then(r => {

      setListItem(r.data.productsData);
    });

  }, [])

  return (
    <div>
      <h6>من داشبودم در بالا</h6>
      {/*<Outlet/>*/}
      {Object.keys(listItem).length > 0 ?
        <div className={"all_products__section px-5"}>
          {listItem.boughtProducts.length > 0 &&
            <div className={"bought_products_section"}>
              <div className={"pb-4"}>
                <ArrowLeft/>
                <span className={"your__plans__text"}>&nbsp;&nbsp;{tr.your_plans}</span>
              </div>
              <div className={"d-flex justify-content-lg-start mx-1"}>
                {
                  listItem.boughtProducts.map((v, index) =>
                    <React.Fragment key={index}>
                      <div>
                        <div className={"single__product__name__box"}
                             onClick={() => navigateTo("/selectedProductType", {state: {id: v.id, name: v.name}})}
                        >
                          {v.name}
                        </div>
                        <div className={"text-center mt-1"}>
                          {v.active
                            ?
                            <div
                              className={"badge bg-info text-dark"}> {numeric.e2p(v.remainingDays + "")} {tr.day + "" + tr.remain}</div>
                            :
                            <div className={"badge bg-danger"}> {tr.expired}</div>
                          }
                        </div>
                      </div>
                    </React.Fragment>
                  )
                }
              </div>
            </div>
          }
          <hr style={{height: 1, backgroundColor: "#ccc", border: 'none'}}/>
          {listItem.otherProducts.length > 0 &&
            <div className={"other_products_section "}>
              <div className={"pb-4"}>
                <ArrowLeft/>
                <span className={"your__plans__text"}>&nbsp;&nbsp;{tr.suggested_plans}</span>
              </div>
              <div className={"d-flex justify-content-lg-start mx-1"}>
                {
                  listItem.otherProducts.map((v, index) =>
                    <React.Fragment key={index}>
                      <div className={"single__product__name__box__suggested"}
                           onClick={() => navigateTo("/selectedProductType", {state: {id: v.id, name: v.name}})}
                      >
                        {v.name}
                      </div>
                    </React.Fragment>
                  )
                }
              </div>
            </div>
          }
        </div>
        :
        Object.keys(listItem).length === 0 ?
          <Loader className={"center__Loader"} text={tr.receiving_data}/>
          : <></>
      }

    </div>

  );
};

export default Dashboard;
