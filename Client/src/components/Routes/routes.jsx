import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom"
import HomePage from "../Pages/Home/Home.jsx"
import Adoption from "../Pages/Adoption/Adoption"
import Login from "../Pages/Login/Login"
import Logout from "../Pages/Login/logout"
import Sub from "../Pages/newUser/subscribe"
import Pet from "../Pages/pet/pet"
import App from '../../App'

import React, { useContext } from "react"

import { AuthProvider, AuthContext } from "../Contexts/auth"


export default function AppRoutes() {
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);
        console.log(authenticated);
        if (loading) {
            return <div className="loading">Carregando...</div>
        }
        if (!authenticated) {
            return <Navigate to="/login" />
        } else {
            console.log(authenticated);
            return children
        }
    };


    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/pet/:idPet" element={<Pet />} />
                    <Route exact path="/pet" element={<Private><Pet /></Private>} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/logout" element={<Logout />} />
                    <Route exact path="/subscription" element={<Sub />} />
                    <Route exact path="/pets" element={<Adoption />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
};