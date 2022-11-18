import react, { Component } from 'react'
import API from '../../API/API.JSX';
import "./pet.css"

function selectpet(petid) {
    var hreflink = '/Pet' + petid
    console.log(hreflink);
}

var pet = {}
var link = document.location.href
link = link.split('/')
const idPet = link[4]


export default class Pet extends Component {

    state = {
        infopet: {},
    }

    async componentDidMount() {



        let token = localStorage.getItem('token');
        var Usuario = JSON.parse(token);
        const response = await API.post('/pets/' + idPet, {
            token: Usuario.token
        });
        this.setState({ infopet: response.data.Pet[0] })
    };

    render() {
        pet = this.state.infopet;
        let prefix = ''
        if (pet.Sexo == 'M') {
            pet.Sexo = 'Macho'
            prefix = o
        } else {
            pet.Sexo = 'Fêmea'
            prefix = 'a'
        }


        return (
            <div>

                <div className='imgpet'>
                    <img id='img' className='img' src={pet.Imagem} alt="" />
                </div>

                <div className="adoption">
                    <div className="Myhistory Pet">
                        <h2>Minha História</h2>
                        <h3>Adote {prefix} {pet.NomePet}</h3>
                        <h3>{pet.Sexo}</h3>
                        <p>{pet.Descricao}</p>

                    </div>

                    <div id='Adopt' className='Pet'>
                        <a href="">QUERO ADOTAR {prefix} {pet.NomePet}</a>
                    </div>

                    <div className='Petinfo'>
                        <p>Idade: {pet.IdadePet}</p>
                        <p>Porte: {pet.Porte}</p>
                        <p>Sexo: {pet.Sexo}</p>
                    </div>

                </div>
            </div >
        )
    };

}
;