import React, { useEffect,useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Billetera = (props) => {

  const [theme, setTheme] = useState('');
  const { toggle, toggleFunction } = React.useContext(ThemeContext);

  useEffect(() => {
    var temp = "";
    if (toggle) {
      temp = "bg-dark";
    } else {
      temp = "";
    }
    setTheme(temp);
  }, [toggle]);

  const { compras } = props;

  const btcs = compras.filter((compra, key) => compra.moneda === "BTC");
  const eths = compras.filter((compra, key) => compra.moneda === "ETH");
  const ltcs = compras.filter((compra, key) => compra.moneda === "LTC");

  const totalb = btcs.reduce(
    (previousValue, currentValue) => previousValue + currentValue.monto,
    0
  );
  const totale = eths.reduce(
    (previousValue, currentValue) => previousValue + currentValue.monto,
    0
  );
  const totall = ltcs.reduce(
    (previousValue, currentValue) => previousValue + currentValue.monto,
    0
  );

  const [clpB, setClpB]=useState();
  const [clpE, setClpE]=useState();
  const [clpL, setClpL]=useState();

  useEffect(() => {
    fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=CLP&api_key=1538e6cd3a57308e6e3a8f75d008b49553958f7ce261905e23de93b647f83cb4"
    )
      .then((response) => response.json())
      .then((data) => setClpB(Math.trunc(data.CLP)));
  }, []);

  useEffect(() => {
    fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=CLP&api_key=1538e6cd3a57308e6e3a8f75d008b49553958f7ce261905e23de93b647f83cb4"
    )
      .then((response) => response.json())
      .then((data) => setClpE(Math.trunc(data.CLP)));
  }, []);

  useEffect(() => {
    fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=CLP&api_key=1538e6cd3a57308e6e3a8f75d008b49553958f7ce261905e23de93b647f83cb4"
    )
      .then((response) => response.json())
      .then((data) => setClpL(Math.trunc(data.CLP)));
  }, []);

  useEffect(() => {
    console.log(ltcs);
    console.log(totall);
  }, []);

  const formatter = new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP'});


  return (
    <>
      <h3 className={ `dashboard`}>BILLETERA <img src='https://image.flaticon.com/icons/png/128/214/214362.png' height='30rem'/></h3>
        <div className="row">
          <div className="col-md-4">
            
            <div className={`card ${theme}`}>
              <div class="card-header">BITCOIN</div>
              <div class="card-body">
                <h5 class="card-title">{totalb}</h5>
                <p class="card-text">
                  CLP: {totalb>0?formatter.format(clpB*totalb):formatter.format(totalb)}
                </p>
                <p class="card-text pactual">
                  *Precio Actual: {formatter.format(clpB)}
                </p>
              </div>
            </div>

          </div>
          <div className="col-md-4">

          <div className={`card ${theme}`}>
              <div class="card-header">ETHEREUM</div>
              <div class="card-body">
                <h5 class="card-title">{totale}</h5>
                <p class="card-text">
                  CLP: {totale>0?formatter.format(clpE*totale):formatter.format(totale)}
                </p>
                <p class="card-text pactual">
                  *Precio Actual: {formatter.format(clpE)}
                </p>
              </div>
            </div>

          </div>
          <div className="col-md-4">

          <div className={`card ${theme}`}>
              <div class="card-header">LITECOIN</div>
              <div class="card-body">
                <h5 class="card-title">{totall}</h5>
                <p class="card-text">
                  CLP: {totall>0?formatter.format(clpL*totall):formatter.format(totall)}
                </p>
                <p class="card-text pactual">
                  *Precio Actual: {formatter.format(clpL)}
                </p>
              </div>
            </div>


          </div>
        </div>
      
    </>
  );
};

export default Billetera;
