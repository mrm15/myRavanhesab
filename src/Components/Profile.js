import React from "react";
import { useAuth } from "./Auth/auth";
import { useNavigate } from "react-router-dom";
import Button from "./UI/Button";

const Profile = () => {
  const navigateTo = useNavigate();
  const auth = useAuth();

  function handleLogout() {
    auth.logOut();
    window.location.href = "https://userpanel.varkan.ir/login";
  }

  return (
    <div>
      {auth.user && "تو یه کاربر عادی نیستی. "}
      <br />
      <br />
      این جا صفحه پروفایله خوش اومدی محمد
      <br />
      <br />
      <br />
      <br />
      <h2>
        <button onClick={handleLogout}> خروج از سایت</button>
        <Button
          onClick={() =>
            (window.location.href = "https://userpanel.varkan.ir/login")
          }
          className={"my-4 greenBtn"}
        >
          {"صفحه لاگین"}
        </Button>
      </h2>
    </div>
  );
};

export default Profile;
