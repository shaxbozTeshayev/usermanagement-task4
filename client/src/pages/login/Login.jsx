import React from "react";
import { Link } from "react-router-dom";
import LoginFormInput from "./loginFormInput/LoginFormInput";

const Login = () => {
  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <div className="registerForm">
          {/* login */}
          <div className="registerFormTop">
            <div className="title">
              <h5>Admin Panel Login</h5>
            </div>
          </div>
          <div className="registerFormCenter">
            {/* form input */}
            <LoginFormInput />
          </div>
          <div className="registerFormBottom">
            <span>
              Already have an account?{" "}
              <Link to="/register">
                <strong>Sign Up</strong>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Login);
