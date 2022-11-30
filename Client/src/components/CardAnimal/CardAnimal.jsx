import react, { Component } from 'react'

import './CardAnimal.css';
import gatinho from '../../assets/imagens/cat.jpg';
import API from '../API/API.JSX';



function selectpet(petid) {
    var hreflink = '/adoption' + petid
    console.log(hreflink);
}

class Pets extends Component {
    state = {
        petsinfo: [],
    }

    async componentDidMount() {
        const response = await API.get('/pets');
        this.setState({ petsinfo: response.data.Pets });
        console.log(this.state);

    }

    render() {
        var pets = this.state.petsinfo;
        console.log(this.state.petsinfo[0]);
        console.log(pets.petsinfo);

        pets.forEach(animal => {
            animal.Sexo = animal.Sexo.toUpperCase();
            if (animal.Sexo == 'M') {
                console.log('m');
                animal.Sexo = 'Macho'
            } else if (animal.Sexo == 'F') {
                console.log('f');
                animal.Sexo = 'Fêmea'
            }

        });
        console.log(pets);
        return (
            <div>
                {pets.map(pet =>
                (<div className='Card'>
                    <div className='CardAnimal'>
                        <img className='img' src={pet.Imagem} alt="" />

                        <div className='infopet'>
                            <div>
                                <h3>{pet.NomePet}</h3>
                            </div>
                            <div>
                                <a className='infopets' href="">
                                    <ul>

                                        <li>{pet.Sexo}</li>
                                        <li>{pet.Raça}</li>
                                        <li>{pet.IdadePet}</li>
                                        <li>No abrigo desde: {pet.Data}</li>
                                    </ul>

                                </a>
                            </div>
                            <br />

                            <div>
                                <a href={'/pet/' + pet.idPet} className='btnSubmit' onAuxClick={selectpet}>
                                    Quero Conhecer
                                </a>
                            </div>
                        </div>
                    </div>
                </div>))}
            </div>
        )
    }
}





// export function CardAnimal() {
//     return (
// <div className='Card'>
//     <div className='CardAnimal'>
//         <img className='img' src={gatinho} alt="" />

//         <div className='infopet'>
//             <div>
//                 <h3>
//                     Nome do animal
//                 </h3>
//             </div>
//             <div>
//                 <a className='infopets' href="">
//                     <ul>
//                         <li>Sexo</li>
//                         <li>Raça</li>
//                         <li>Idade</li>
//                         <li>Tempo no abrigo</li>
//                     </ul>

//                 </a>
//             </div>
//             <br />

//             <div>
//                 {/* <button type='submit' className='btnSubmit'
//                 >
//                     Quero Conhecer
//                 </button> */}


//                 <a href="" className='btnSubmit'>
//                     Quero Conhecer
//                 </a>
//             </div>
//         </div>
//     </div>
// </div>
//     )

//}

export default Pets;