import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { Alert } from "../../../components/alert/Alert";
import { axiosInstance } from "../../../config";
import { setLoginSuccess } from "../../../store/action";

const LoginFormInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); //{ shouldUseNativeValidation: true }
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const navigate = useNavigate();
  const disableInputref = useRef();
  const registerFormCenterContentref = useRef();

  const onSubmit = async (data) => {
    try {
      disableInputref.current.disabled = true;
      disableInputref.current.style.cursor = "no-drop";
      const res = await axiosInstance.post("auth/login", data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setLoginSuccess(res.data);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      Alert(setAlert, "#fcdae2", error.response?.data?.error);
      disableInputref.current.disabled = false;
      disableInputref.current.style.cursor = "pointer";
    }
  };

  return (
    <div
      className="registerFormCenterContent"
      ref={registerFormCenterContentref}
    >
      {alert.open && (
        <span className="submitError" style={{ backgroundColor: alert.color }}>
          {alert.text}
        </span>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="registerFormElement">
        <div className="registerFormElementContent">
          <HiOutlineMail />
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="registerInput"
            autoComplete="true"
          />
        </div>
        {errors.email && <p className="error">Email is required.</p>}
        <div className="registerFormElementContent">
          <HiOutlineLockClosed />
          <input
            {...register("password", { required: true })}
            type="password"
            autoComplete="true"
            placeholder="Password"
            className="registerInput"
          />
        </div>
        {errors.password && <p className="error">Password is required.</p>}
        <input
          type="submit"
          value="Sign In"
          ref={disableInputref}
          className="registerBtn"
          autoComplete="true"
        />
      </form>
    </div>
  );
};

export default React.memo(LoginFormInput);
