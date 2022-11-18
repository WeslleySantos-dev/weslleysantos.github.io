import './subscribe.css'
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/auth';
import API from '../../API/API.JSX';
import { IMaskInput } from "react-imask";
import InputMask from 'react-input-mask';



export default function Home() {
    const { authenticated, sub } = useContext(AuthContext);



    const [values, setValues] = useState();
    const handleChangeValues = async (value) => {
        setValues((prevalue) => ({
            // ...prevalue,
            [value.target.name]: value.target.value,
        }));
        console.log(values);

    };


    const handleChangePerson = async (value) => {
        console.log(values);
        setValues((prevalue) => ({
            ...prevalue,
            [value.target.name]: value.target.value,
        }));
        var Type = document.getElementById('tpPessoa').value
        if (Type) {

            if (Type == 'Juri') {
                console.log('Juri');
                document.getElementById('cpfcnpj').innerHTML = ('as');
                document.getElementById('cpfcnpj').innerHTML = (`<label htmlFor="Nome">CNPJ:</label>
                                                            <input
                                                                type="text"
                                                                name="cpfcnpj"
                                                                id="cpfcnpj"
                                                                placeholder='XX. XXX. XXX/0001-XX'
                                                                onChange={handleChangeValues} />`);
            } else if (Type == 'Fis') {
                console.log('fis');
                document.getElementById('cpfcnpj').innerHTML = ('as');
                document.getElementById('cpfcnpj').innerHTML = (`<label htmlFor="Nome">CPF:</label>
                                                                <input
                                                                    type="text"
                                                                    name="cpfcnpj"
                                                                    id="cpfcnpjinput"
                                                                    placeholder='XXX.XXX.XXX-XX'/>`)
                document.getElementById('cpfcnpjinput').addEventListener("onChange", handleChangeValues, true)
            } else { document.getElementById('cpfcnpj').innerHTML = ('Nada'); }
        }
    }
    const handleClickButton = () => {
        sub(
            values.Nome,
            values.Sobrenome,
            values.Email,
            values.Usuario,
            values.Login,
            values.PassUser,
            values.Fone,
            values.Pessoa,
            values.CpfCnpj
        );

    };



    return (
        <div className='sub-banner'>

            <div className='sub-card'>
                <h2>Login</h2>

                <form method='post'>
                    <div className='sub'>
                        <label htmlFor="Nome">Nome:</label>
                        <input
                            type="text"
                            name="Nome"
                            id="Nome"
                            placeholder='Nome'
                            onChange={handleChangeValues} />
                    </div>

                    <div className='sub'>
                        <label htmlFor="Sobrenome">Sobrenome:</label>
                        <input
                            type="text"
                            name="Sobrenome"
                            id="Sobrenome"
                            placeholder='Sobrenome'
                            onChange={handleChangeValues} />
                    </div>
                    <div className='sub'>
                        <label htmlFor="Email">Email:</label>
                        <input
                            type="text"
                            name="Email"
                            id="Email"
                            placeholder='Email'
                            onChange={handleChangeValues} />
                    </div>

                    <div className='sub'>
                        <label htmlFor="tel">Fone:</label>
                        <input
                            type='text'
                            name="tel"
                            id="tel"
                            placeholder='(00) 00000-0000'
                            onChange={handleChangeValues} />
                    </div>

                    <div className='sub'>
                        <label htmlFor="Pessoa">Pessoa: </label>
                        <input type='text' name="Pessoa" id="tpPessoa" list="Pessoa" onChange={handleChangePerson} />
                        <datalist id="Pessoa" onChange={handleChangePerson}>
                            <option value="Fis" className='1'>Pessoa Fisica</option>
                            <option value="Juri">Pessoa Juridica ex: ONGs, instituições,empresas... </option>
                            
                        </datalist>
                    </div>

                    <div className='sub' id='cpfcnpj'>

                    </div>



                    <div className='sub'>
                        <label htmlFor="Nome">Login:</label>
                        <input
                            type="text"
                            name="Login"
                            id="Login"
                            placeholder='Usuario'
                            onChange={handleChangeValues} />
                    </div>


                    <div className='sub'>
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Password'
                            onChange={handleChangeValues} />
                    </div>
                </form>

                <div className='sub submit_sub'>
                    <button onClick={() => handleClickButton()}>Cadastrar</button>
                </div>
            </div>
            <h2>Seja Bem Vindo(a)!!!</h2>
        </div>
    )
};


