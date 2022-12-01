import "./Products.css"
import cama from "../../assets/cama para pets.png"


import react, { Component } from 'react'
import API from '../API/API.JSX';


function selectproduct(productid) {
    var hreflink = '/product/' + productid
    console.log(hreflink);
}


class Products extends Component {
    // state = {
    //     infoproducts: [],
    // }

    // async componentDidMount() {
    //     if (this.state.infoproducts == 0) { const response = await API.get('/pets'); this.setState({ infoproducts: response.data.Pets }); }

    // }

    render() {
        // var Products = this.state.infoproducts;
        return (
            <div>

                <nav className="Products">

                    <div className="Product">
                        <img className="ImgProduct" src={cama} alt="Cama para animais de estimação" />
                        <p>Cama para animais de estimaçã</p>
                        <p id="Value">R$ 250,00</p>

                        <button className="ButtonBuy" onAuxClick={selectproduct}>Ver Produto</button>
                    </div>

                </nav>
                {/* {Products.map(product =>
                    <nav className="Products">

                        <div className="Product">
                            <img className="ImgProduct" src={product.imagem} alt="Cama para animais de estimação" />
                            <p>product.nome</p>
                            <p id="Value">product.valor</p>

                            <button className="ButtonBuy" hreflink='/'>Ver Produto</button>
                        </div>

                    </nav>)} */}
            </div>
        )
    }
}
export default Products;
