import react, { Component } from 'react'
import API from '../../API/API.JSX';
import Pets from '../../CardAnimal/CardAnimal';




export default function Adoption(){
   
        return (
            <div class='Adoption'>
                <div id='Top'>
                    <h2>Adote um amigo</h2>
                </div>
                <Pets></Pets>
                
            </div >
        )

}
;