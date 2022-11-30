import './forgot.css'
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/auth';



export default function Home() {
    const { authenticated, forgot,forgotupdate } = useContext(AuthContext);
    var first = 0
    const [values, setValues] = useState();
    const handleChangeValues = async (value) => {
        setValues((prevalue) => ({
            ...prevalue,
            [value.target.name]: value.target.value,
        }));
        console.log(values);
        if (value.target.name == "login") { document.getElementById('inputemail').innerText = '' }
        if (value.target.name == "fone") { document.getElementById('inputfone').innerText = '' }

        if (value.target.name == "confirm") {

            var password = document.getElementById("password");
            var confirm = document.getElementById("newpassword");

            if (password.value != confirm.value) {
                console.log('diferente');
                confirm.style.borderColor = 'Red'
                document.getElementById('mensagem').innerText = ''
            } else {
                console.log('igual');
                password.style.borderColor = ''
                confirm.style.borderColor = ''
                document.getElementById('mensagem').innerText = ''
            }
            console.log(password.value);
            console.log(confirm.value);
            console.log(password.value != confirm.value);
        }
        document.getElementById('mensagem').innerText = ''
        first = 0

    };


    const handleClickButton = () => {
        var login = document.querySelector('#login').value;
        var fone = document.querySelector('#fone').value;
        var password = document.querySelector('#password').value;
        var confirm = document.querySelector('#newpassword').value;


        if (!password) {
            if (!login) {
                document.getElementById('inputemail').innerText = 'Digite um email válido';
            } else {
                forgot(values);
                document.getElementById('inputemail').innerText = '';
                first++
                if (first === 1) {
                    if (fone === '') {
                        var INPUTfone = document.getElementById("_fone");
                        INPUTfone.style.display = 'flex';
                    }
                } else {
                    if (login) {
                        if (fone) {
                            forgot(values);
                        } else {
                            document.getElementById('mensagem').innerText = 'Preencha os campos corretamente'
                            document.getElementById('inputfone').innerText = 'Ex: (00) 00000-0000'
                        }
                    }
                }
            }
        } else if (password == confirm) {
            console.log('Acertou');
            console.log(password === confirm);
            const id = localStorage.getItem('user');
            console.log(id);
            console.log(password);
            forgotupdate(
                id,
                password
            );

        } else {
            document.getElementById('mensagem').innerText = 'As senhas não conferem'
        }
    };


    return (
        <div className='forgot-banner'>
            <div className='forgot-card'>
                <h2>Recuperação de senha</h2>
                <p id='mensagem'></p>
                <form method='post'>
                    <p id='inputemail'></p>
                    <div style={{ display: 'flex' }} id='_login' className='forgot'>
                        <label htmlFor="username">Login:</label>
                        <input
                            type="text"
                            name="login"
                            id="login"
                            placeholder='email ou usuario'
                            onChange={handleChangeValues} />
                    </div>
                    <p id='inputfone'></p>
                    <div style={{ display: 'none' }} id='_fone' className='forgot' >
                        <label htmlFor="password">Fone:</label>
                        <input
                            type="fone"
                            name="fone"
                            id="fone"
                            placeholder='(00) 00000-0000'
                            onChange={handleChangeValues} />
                    </div>

                    <p id='inputemail'></p>
                    <div style={{ display: 'none' }} id='_password' className='forgot'>
                        <label htmlFor="username">senha:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Digite a nova Senha'
                            onChange={handleChangeValues} />
                    </div>
                    <p id='inputfone'></p>
                    <div style={{ display: 'none' }} id='_Newpassword' className='forgot' >
                        <label htmlFor="password">confirme:</label>
                        <input
                            type="password"
                            name="confirm"
                            id="newpassword"
                            placeholder='(00) 00000-0000'
                            onChange={handleChangeValues} />
                    </div>
                </form>

                <div className='submit'>
                    <button id='prox' onClick={() => handleClickButton()}>Proximo</button>
                </div>
            </div>
        </div>

    )

};

