import './App.scss';
import React, { useState } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Section from './components/Section';
import Footer from './components/Footer';



function App() {

  //para la comunicacion entre componentes, he creado la funcion de abajo que se le envia al nav para recoger la filtracion de la api
  const [coin, setCoin] = useState({})

  const getcurrentcoin = (currentCoin) => {
    setCoin(currentCoin);
  }

  //////////////////////////////////////
  //lo mismo que el anterior pero en dias 
  const [dias, setDias] = useState({})

  const getcurrentday = (currentday) => {
    setDias(currentday);
  }
  ///////////////////////////////////


  return (
    <>
      <Header></Header>
      <div className="contenedor">

        {/* le mandamos la funcion al nav para que pille el valor de la seleccion del token y la traiga de vuelta al app */}
        <Nav oncurrentcoin={getcurrentcoin} oncurrentday={getcurrentday}  ></Nav>
        {/* declaramos que "moneda" es igual a "coin" que es el valor guardado de la seleccion que llega del nav, y lo mandamos como props */}
        <div key={coin.id}>
          <Section moneda={coin} key={dias.d} dia={dias} > </Section>
        </div>
        <Footer ></Footer>
      </div>
    </>
  );
}





export default App;
