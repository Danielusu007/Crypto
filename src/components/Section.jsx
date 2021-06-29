import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const Section = (props) => {
    let ganacias = 0
    const [coinsprecios, setCoinsprecios] = useState([]);
    const [fecha, setFecha] = useState([]);
    const [inversion, setInversion] = useState([]);

    useEffect(() => {

        async function fetchApi() {

            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${props.moneda.id}/${props.dia.s}`);
            const responseJSON = await response.json();

            setCoinsprecios((currentcoinsprecios) => {
                return responseJSON.prices
            })
        }
        fetchApi();

    }, [props])

    //transforma a fecha legible por humanos.
    function getlabels(prices) {
        const labels = [];

        if (prices !== undefined) {

            prices.forEach(price => {

                labels.push({
                    //toLocaleDateString()
                    x: new Date(price[0]).toLocaleString(),
                    y: price[1].toFixed(2)
                })
            })
        }

        return labels;
    }
    /////////////////////

    if (coinsprecios !== undefined) {
        const calendario = calculo(coinsprecios)
        console.log(calendario)

        const filtro = calendario.filter(f => f.x === fecha)
        if (filtro[0] !== undefined) {
            let { x, y } = filtro[0];

            if (inversion !== undefined) {

                ganacias = (inversion / y) * props.moneda.current_price;
                ganacias = ganacias.toFixed(2)
            }
        }

    }
    ///////////////////////////
    function calculo(coinsprecios) {
        const array = [];

        if (coinsprecios !== undefined) {

            coinsprecios.forEach(price => {

                array.push({
                    x: new Date(price[0]).toLocaleDateString(),
                    y: price[1].toFixed(2)
                })
            })
        }
        return array
    }

    return (
        <>
            <section>

                <Bar key={props.moneda.id} className="canvas" data={{
                    // nombres de las graficas 

                    datasets: [{

                        //valores de la grafica 
                        data: getlabels(coinsprecios),
                        backgroundColor: [
                            'lightgreen',
                        ],
                        borderColor: [
                            'lightgreen',

                        ],
                        borderWidth: 2
                    }],
                }}
                    options={{
                        interaction: {
                            mode: 'point'
                        },
                        //para que se ajuste al tamaño de mi contenedor section
                        maintainAspectRatio: false,

                        //para que la grafica empiece en 0 o no
                        scales: {
                            y: {
                                beginAtZero: false
                            },
                        },
                        // eleiminar la etiqueta 
                        plugins: {
                            legend: {
                                labels: true
                            }
                        },
                    }} >
                </Bar>
            </section>

            <from >
                <div className="contenedorsection">
                    <input className="inputFecha" type="text" name="fechas" placeholder="00/00/0000" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                    <input className="inputInversion" type="text" name="inversion" placeholder="inversion" value={inversion} onChange={(e) => setInversion(e.target.value)} />
                </div>
            </from>
            <p className="resultado"  >{"Ganancias-" + ganacias + "$"} </p>
        </>)
}
export default Section;




