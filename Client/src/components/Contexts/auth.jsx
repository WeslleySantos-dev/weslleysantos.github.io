import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from '../API/API.JSX';

export const AuthContext = createContext();




export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);


    useEffect(() => {
        setloading(true);
        const recover = localStorage.getItem('Usuario');
        const Usuario = JSON.parse(recover);
        console.log(Usuario);
        if (Usuario) {
            // document.getElementById('btnlogin').innerHTML = (`<a href="">${Usuario.Nome}</a>`);
            document.getElementById('btnlogin').innerHTML = (`<a href="">${Usuario.Nome}
            <ul>
                <li className='submenu'><a href="/settings">Configurações</a></li>
                <li className='submenu'><a href="/logout">Logout</a></li>
            </ul></a>`);
            setUser({
                ID: (Usuario.id),
                Nome: (Usuario.Nome),
                Usuario: (Usuario.Usuario),
                email: (Usuario.email)
            });
        } else {
            document.getElementById('btnlogin').innerHTML = ('<a href="/login">Login</a>');
        }
        setloading(false);
    }
        , []);

    const login = async (login, password) => {
        setloading(true);
        console.log("login", { login, password });
        await API.post('/login', {
            Login: login,
            password: password
        }).then((response) => {
            console.log(response.data.token);
            localStorage.setItem('token', JSON.stringify(response.data));
            const token = localStorage.getItem('token');
            const tokenuser = JSON.parse(token);
            localStorage.setItem('Usuario', JSON.stringify(tokenuser.Usuario));
            const userls = localStorage.getItem('Usuario');
            const Usuario = JSON.parse(userls);
            console.log(Usuario);
            if (Usuario.id) {
                setUser({
                    ID: (Usuario.id),
                    Nome: (Usuario.Nome),
                    Usuario: (Usuario.Usuario),
                    email: (Usuario.email)
                });
            }
        });
        setloading(false);

        if (!user) {
            navigate('/');
            window.location.reload();
        }

    };

    const logout = async () => {
        console.log('Logout sendo usado');
        localStorage.clear();
        navigate('/');
        setloading(false);
    };

    const signup =()=>{
        navigate('/subscription');
    };
    const sub = async () => {
        console.log('subscription sendo usado');

        await API.post('/newuser', {
            Nome,
            Sobrenome,
            Email,
            Usuario,
            Login,
            PassUser,
            Fone,
            Pessoa,
            CpfCnpj
        }).then((response) => {
            console.log(response);
            localStorage.setItem('NewUser', 'Usuario Cadastrado com sucesso!')
        });
        setloading(false);
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, sub ,signup}}
        >{children}
        </AuthContext.Provider>

    );
};