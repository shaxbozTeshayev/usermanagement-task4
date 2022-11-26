import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { axiosInstance } from '../../../config';
import { Alert } from "../../../components/alert/Alert";

const RegisterFormInput = () => {
    const { register, handleSubmit, formState: { errors } } = useForm(); //{ shouldUseNativeValidation: true }
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });

    const onSubmit = async (data) => {
        try {
            const res = await axiosInstance.post("auth/register", data);
            Alert(setAlert, "#04AA6Dda", res.data);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            // console.log(error);
            Alert(setAlert, "#fcdae2", error.response?.data);
        }
    }

    return (
        <div className="registerFormCenterContent">
            {alert.open && <span className="submitError" style={{ backgroundColor: alert.color }}>{alert.text}</span>}
            <form onSubmit={handleSubmit(onSubmit)} className="registerFormElement">
                <div className="registerFormElementContent">
                    <HiOutlineUser />
                    <input type="text" {...register('username', { required: true, minLength: 2 })} autoComplete="true" placeholder="Username" className="registerInput" />
                </div>
                {errors.username && <p className="error">Username is required.</p>}
                <div className="registerFormElementContent">
                    <HiOutlineMail />
                    <input {...register('email', { required: true })} type="email" autoComplete="true" placeholder="Email" className="registerInput" />
                </div>
                {errors.email && <p className="error">Email is required.</p>}
                <div className="registerFormElementContent">
                    <HiOutlineLockClosed />
                    <input {...register('password', { required: true, pattern: /^[A-Za-z0-9]+$/i })} autoComplete="true" type="password" placeholder="Password" className="registerInput" />
                </div>
                {errors.password && <p className="error">Password is required.</p>}
                <input type="submit" value="Sign Up" className="registerBtn" />
            </form>
        </div>
    )
}

export default React.memo(RegisterFormInput);