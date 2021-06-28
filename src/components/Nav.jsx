import React, { useEffect, useState } from 'react';


const Nav = (props) => {

    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20dogecoin%2C%20iota%2C%20chiliz%2C%20litentry%2C%20casper&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    const [coins, setCoins] = useState([]);
    const [currentCoin, setCurrentCoin] = useState("");

    ///////////////////////////////////////////////////////
    useEffect(() => {

        async function fetchApi() {
            const response = await fetch(url);
            const responseJSON = await response.json();
            setCoins(responseJSON)

        }
        fetchApi();
    }, [])


    //////////////////////////////////////////////
    //funcion que recoge los valores de la seleccion de fecha para devolver a app dicha seleccion + un id para el key 
    function tiempo(pdias) {

        switch (pdias) {

            case "1-día":
                var seleccion = {
                    s: "market_chart?vs_currency=usd&days=1",
                    d: pdias
                };
                props.oncurrentday(seleccion)
                break;

            case "7-días":
                var seleccion = {
                    s: "market_chart?vs_currency=usd&days=7",
                    d: pdias
                };
                props.oncurrentday(seleccion)
                break;

            case "30-días":
                var seleccion = {
                    s: "market_chart?vs_currency=usd&days=30",
                    d: pdias
                };
                props.oncurrentday(seleccion)
                break;

            case "Maximo":
                var seleccion = {
                    s: "market_chart?vs_currency=usd&days=max&interval=annual",
                    d: pdias
                };
                props.oncurrentday(seleccion)
                break;

            default:
                var seleccion = {
                    s: "market_chart?vs_currency=usd&days=1",
                    d: "nulo"
                };
                props.oncurrentday(seleccion)
                break;
        }
    }


    ////////////////////////////////////////////////////////

    function pvalores(pvalor) {

        let valor
        if (coins.find(elemento => elemento.id === pvalor)) {
            valor = coins.find(elemento => elemento.id === pvalor)
            setCurrentCoin(valor.id + " - " + valor.current_price + "-USD");
            // console.log(valor)
            props.oncurrentcoin(valor)//mirar


        }
    }
    ///////////////////////////////////////////////////////////////
    return (
        <>
            <nav >
                <div>
                    <p  > {currentCoin} </p>
                </div>
                <div >
                    <span className="material-icons">&#xe8b6;</span>
                    <select onChange={pvalor => pvalores(pvalor.target.value)}  >
                        <option value="">Selecciona Crypto</option>
                        {
                            coins.map(coin => <option key={coin.id} value={coin.id}> {coin.name} </option>)
                        }
                    </select>

                    <select onChange={pdias => tiempo(pdias.target.value)}  >
                        <option value="">Selecciona día</option>
                        <option value="1-día" key={1} >1-día</option>
                        <option value="7-días" key={2} >7-días</option>
                        <option value="30-días" key={3} >30-días</option>
                        <option value="Maximo" key={4} >Maximo</option>
                    </select>


                </div>
            </nav>

        </>)
}
export default Nav;



