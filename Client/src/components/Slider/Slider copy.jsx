import react, { Component } from 'react'
import './Slider.css'
import API from '../API/API.JSX';
import "./banner"


function selectpet(petid) {
    var hreflink = '/adoption' + petid
    console.log(hreflink);
}

class Pets extends Component {
    state = {
        petsinfo: [],
    }

    async componentDidMount() {
        // se não há nenhum pet no state faz consulta na api---------------------------------------------------------------------------------
        if (this.state.petsinfo == 0) { const response = await API.post('/banner'); this.setState({ petsinfo: response.data.Pets }); }
    }

    render() {
        var pets = this.state.petsinfo;
        return (
            <div className='slider'>
                <div className='slides'>
                    <input type="radio" name='radio-btn' id='radio1' className='rd' />
                    <input type="radio" name='radio-btn' id='radio2' className='rd' />
                    <input type="radio" name='radio-btn' id='radio3' className='rd' />
                    <input type="radio" name='radio-btn' id='radio4' className='rd' />
                    {pets.map(pet => (
                        <a className='Slide' href={'/pet/' + pet.idpet} onAuxClick={selectpet}><img className='imgbanner' src={pet.imagem} alt="" /></a>
                    ))}
                    <div className='navigation-auto'>
                        <div className='auto-btn1'></div>
                        <div className='auto-btn2'></div>
                        <div className='auto-btn3'></div>
                        <div className='auto-btn4'></div>
                    </div>
                </div>
                <div className='manual-navigation'>
                    <label htmlFor="radio1" className='manual-btn' id='btn1'></label>
                    <label htmlFor="radio2" className='manual-btn' id='btn2'></label>
                    <label htmlFor="radio3" className='manual-btn' id='btn3'></label>
                    <label htmlFor="radio4" className='manual-btn' id='btn4'></label>
                </div>
            </div>
        )
    }
}
export default Pets;