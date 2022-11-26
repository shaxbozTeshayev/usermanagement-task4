import React from "react";
import { useNavigate } from "react-router-dom";
import { setLogOut } from "../../store/action";
import "./block.css";

const Block = () => {
  const navigate = useNavigate();

  const blocked = () => {
    navigate("/");
  };

  const goRegister = () => {
    setLogOut();
    localStorage.removeItem("user");
    navigate("/register");
  };

  return (
    <div className="block_container">
      <div className="block_wrapper">
        <h4>You have been blocked</h4>
        <button onClick={blocked}>Back to home</button>
        <button onClick={goRegister}>Register</button>
      </div>
    </div>
  );
};

export default React.memo(Block);
