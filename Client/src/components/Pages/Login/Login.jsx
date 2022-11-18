import './Login.css'
import React, { useState, useContext } from 'react';

import { AuthContext } from '../../Contexts/auth';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Home() {
    const { authenticated, login, signup } = useContext(AuthContext);



    const [values, setValues] = useState();
    const handleChangeValues = (value) => {
        setValues((prevalue) => ({
            ...prevalue,
            [value.target.name]: value.target.value,
        }));
    };
    const handleClickButton = () => {
        login(
            values.login,
            values.password
        );
    };

    const Subscription = () => {
        signup();
    };


    return (
        <div className='login-banner'>


            <div className='login-card'>
                <h2>Login</h2>

                <form method='post'>
                    <div className='login'>
                        <label htmlFor="username">Login:</label>
                        <input
                            type="text"
                            name="login"
                            id="login"
                            placeholder='email ou usuario'
                            onChange={handleChangeValues} />
                    </div>
                    <div className='login'>
                        <label htmlFor="password">Pass:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='password'
                            onChange={handleChangeValues} />
                    </div>
                </form>

                <div className='submit'>
                    <button onClick={()=>Subscription()}>Cadastro</button>
                    <button onClick={() => handleClickButton()}>Login</button>
                </div>
                <a href="/forgot">Esqueceu a senha?</a>
            </div>
        </div>
    )
};


