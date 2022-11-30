import './Login.css'
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/auth';
import './login2'




export default function Home() {

    const { authenticated, login, signup } = useContext(AuthContext);

    document.body.addEventListener('keydown', function (event) {
        const key = event.key;
        let v1 = document.querySelector('#login').value;
        let v2 = document.querySelector('#password').value;
        if (key == 'Enter') {
            if (v1) {
                if (v2) {
                    handleClickButton();
                }
            }
        }
    });

    const [values, setValues] = useState();
    const handleChangeValues = (value) => {
        setValues((prevalue) => ({
            ...prevalue,
            [value.target.name]: value.target.value,
        }));
    };
    const handleClickButton = () => {
        console.log(values.login);
        login(
            values.login,
            values.password
        );
    };
    return (
        <div className='login-banner'>


            <div className='login-card'>
                <h2>Login</h2>
                <p id='mensagem'></p>
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
                    <button onClick={() => signup()}>Cadastro</button>
                    <button onClick={() => handleClickButton()}>Login </button>
                </div>
                <a href="/forgot">Esqueceu a senha?</a>
            </div>
        </div>
    )
};


