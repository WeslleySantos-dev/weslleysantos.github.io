import './settings.css'
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/auth';
import { json } from 'react-router-dom';

const ExibirLogin = () => {
    const aux = document.getElementById('login')
    if (aux.type === 'hidden') { aux.type = 'text' } else { aux.type = 'hidden' }
};

const LiberaUpdate = () => {
    const aux = document.getElementById('login')
    const auxFone = document.getElementById('contato')
    const auxEmail = document.getElementById('email')
    aux.type = 'text'
};

export default function Home() {
    const { authenticated, newPet } = useContext(AuthContext);
    const [values, setValues] = useState();
    const aux = localStorage.getItem('Usuario')
    const Usuario = JSON.parse(aux)

    return (
        <div id='Settings'>
            <div>
                <h2>{Usuario.Nome + ' ' + Usuario.Sobrenome}</h2>
                <br />
                <div id='Dados'>
                    <span>
                        <label htmlFor="login">Usuario:</label>
                        <input type="hidden" id='login' Value={Usuario.Login} disabled />
                        <button onClick={ExibirLogin}>Mostrar</button>
                    </span>
                    <span>
                        <label htmlFor="">Contato:</label>
                        <input type="text" id='contato' Value={Usuario.Fone} disabled />
                    </span>
                    <span>
                        <label htmlFor="">e-Mail:</label>
                        <input type="text" id='email' Value={Usuario.email} disabled />
                    </span>
                    <span>
                        <button className='submit-form' onClick={LiberaUpdate}>Atualizar Cadastro</button>
                    </span>
                </div>
            </div>
        </div>
    )
};