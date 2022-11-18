import "./Products.css"
import cama from "../../assets/cama para pets.png"

export function Products() {
    return (
        
            <nav className="Products">

                <div className="Product">
                    <img className="ImgProduct" src={cama} alt="Cama para animais de estimação" />
                    <p>Cama para animais de estimaçã</p>
                    <p id="Value">R$ 250,00</p>

                    <button className="ButtonBuy" type="submit">Adicionar ao carrinho</button>
                </div>

            </nav>

       
    )
}