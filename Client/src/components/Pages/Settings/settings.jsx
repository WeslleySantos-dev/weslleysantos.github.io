import './settings.css'
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/auth';



export default function Home() {
    const { authenticated, newPet } = useContext(AuthContext);
    const [values, setValues] = useState();

    return (
        <div id='Settings'>
            <div>
                <h2>ola</h2>
            </div>
        </div>
    )
};