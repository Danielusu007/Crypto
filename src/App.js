import './App.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart1 from './Chart1';
import Chart2 from './Chart2';




function App() {



  return (
    <>

      <header>
        <h1>Crypto Cry</h1>
      </header>

      <div className="contenedor">

        <nav>

          <div>
            <p>bnb</p>
          </div>

          <div>
            <span className="material-icons">&#xe8b6;</span>
            <input></input>

          </div>


        </nav>

        <section>




          <Chart2 ></Chart2>



        </section>

        <footer>

          <div>

            <div className="contFechas">
              <input></input>
              <input></input>
            </div>

            <div className="contInversion">
              <input></input>
            </div>

          </div>

          <div className="contBeneficios" >
            <p >beneficios</p>
          </div>


        </footer>
      </div>
    </>
  );
}





export default App;
