import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({ username: "", password: "" });

    const handleChange = (key, value) => {
        const newVal = { ...user, [key]: value };
        setUser(newVal);
    };

    const handleSubmit = () => {
        dispatch({ type: "LOGIN", payload: user });
    };

    return (
        <div>
            <form>
                <label>User name</label>
                <input
                    id="username"
                    onChange={e => handleChange("username", e.target.value)}
                    type="text"
                />
                <label>Password</label>
                <input
                    id="password"
                    onChange={e => handleChange("password", e.target.value)}
                    type="password"
                />
                <button type="button" onClick={() => handleSubmit()} >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;