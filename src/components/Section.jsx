import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const Section = (props) => {

    const [coinsprecios, setCoinsprecios] = useState([]);


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

                    x: new Date(price[0]).toLocaleString(),
                    y: price[1].toFixed(2)
                })
            })
        }

        return labels;
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

        </>
    )
}

export default Section;




