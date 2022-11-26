import React from "react";
import { Link } from "react-router-dom";
import RegisterFormInput from "./registerFormInput/RegisterFormInput";
import "./register.css";

const Register = () => {
  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <div className="registerForm">
          <div className="registerFormTop">
            <div className="title">
              <h5>Register</h5>
            </div>
          </div>
          <div className="registerFormCenter">
            {/* form input */}
            <RegisterFormInput />
          </div>
          <div className="registerFormBottom">
            <span>
              Already have an account?
              <Link to="/login">
                <strong>Sign In</strong>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Register);
