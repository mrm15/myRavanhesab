import React, {useEffect, useState} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import Loader from "../Loader/Loader";
import BoxShadow from "../UI/BoxShadow";
import tr from "../translate/translate";
import axios from "axios";
import Footer from "../Footer/footer";


const Dashboard = () => {
  const prefixUrl = localStorage.getItem("apiUrl") + "getRavanhesabProducts/";
  const [listItem, setListItem] = useState([]);
  const navigateTo = useNavigate();
  useEffect(() => {
    // اینجا درخواست میزنم بک اند تا لیست روان حساب ها رو بده
    // و اینو  توی همین صفحه نشون میدم

    axios.get(prefixUrl).then(r => {
      setListItem([
        {id: 1, name: "روانحساب فروشگاه پوشاک", color: "#FFC9BD"},
        {id: 2, name: "روانحساب فروشگاه لوازم یدکی", color: "#DF01A5"},
        {id: 3, name: "روانحساب فروشگاه لوازم برقی", color: "#F5ECCE"},
        {id: 4, name: "روانحساب فروشگاه خوراک", color: "#A9F5F2"},
        {id: 5, name: "روانحساب فروشگاه مسکن", color: "#F5A9F2"},
      ])
      setListItem(r.data.data);
    });

  }, [])

  return (
    <div>
      <h6>من داشبودم در بالا</h6>
      {/*<Outlet/>*/}
      {listItem.length > 0 ?
        listItem.map((v, index) =>
          <React.Fragment key={index}>
            <div onClick={() => navigateTo("/selectedProductType", {state: {id: v.id, name: v.name}})}
                 style={{background: v.color}}>
              آیدی :{v.id} ___ عنوان:{v.name}
            </div>
          </React.Fragment>
        )
        :
        listItem.length === 0 ?
          <Loader className={"center__Loader"} text={tr.receiving_data}/>
          : <></>
      }

    </div>

  );
};

export default Dashboard;
