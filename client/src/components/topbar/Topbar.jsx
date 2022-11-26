import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { setLogOut } from "../../store/action";
import DecodeToken from "../DecodeToken";
import "./topbar.css";

const Topbar = () => {
  const currentUser = DecodeToken();
  const navigate = useNavigate();

  const exit = () => {
    setLogOut();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar_wrapper">
          <div className="d-flex align-items-center">
            <h5>User Management</h5>
          </div>
          <div className="d-flex align-items-center">
            <span className="mr-4 text-info text-light">
              Hello {currentUser?.email}
            </span>
            <span onClick={exit}>
              Logout <FaSignOutAlt />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Topbar);
