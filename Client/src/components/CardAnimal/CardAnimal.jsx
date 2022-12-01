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
        if (this.state.petsinfo == 0) { const response = await API.get('/pets'); this.setState({ petsinfo: response.data.Pets }); }

    }

    render() {
        var pets = this.state.petsinfo;
        pets.forEach(animal => {
            animal.Sexo = animal.Sexo.toUpperCase();
            if (animal.Sexo == 'M') {
                animal.Sexo = 'Macho'
            } else if (animal.Sexo == 'F') {
                animal.Sexo = 'Fêmea'
            }

        });
        return (
            <div>
                {pets.map(pet => <div className='Card'>

                    <a className='infopets' href={'/pet/' + pet.idPet} >
                        <div className='CardAnimal'>
                            <img className='img' src={pet.Imagem} alt="" />



                            <div className='infopet'>

                                <div><h3>{pet.NomePet}</h3></div>
                                <ul>
                                    <li>{pet.Sexo}</li>
                                    <li>{pet.Raça}</li>
                                    <li>{pet.IdadePet}</li>
                                    <li>No abrigo desde: {pet.Data}</li>
                                </ul>

                                <div>
                                    <span
                                        className='btnSubmit'
                                        onAuxClick={selectpet}>
                                        Quero Conhecer
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>)}
            </div>
        )
    }
}
export default Pets;