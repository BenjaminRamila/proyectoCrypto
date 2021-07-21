import React, { useEffect, useState } from "react";
import * as chartjs from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

const Grafico = (props) => {
  const [btcPrice, setBtcPrice] = useState([]);
  const [ethPrice, setEthPrice] = useState([]);
  const [ltcPrice, setLtcPrice] = useState([]);

  const [resultBtcPrice, setResultBtcPrice] = useState([]);
  const [resultEthPrice, setResultEthPrice] = useState([]);
  const [resultLtcPrice, setResultLtcPrice] = useState([]);
  const [resultBtcTime, setResultBtcTime] = useState([]);

  // BTC
  useEffect(() => {
    fetch(
      "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=CLP&limit=30&api_key=1538e6cd3a57308e6e3a8f75d008b49553958f7ce261905e23de93b647f83cb4"
    )
      .then((response) => response.json())
      .then((data) => setBtcPrice(data.Data.Data));
  }, []);
  // ETH
  useEffect(() => {
    fetch(
      "https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=CLP&limit=30&api_key=1538e6cd3a57308e6e3a8f75d008b49553958f7ce261905e23de93b647f83cb4"
    )
      .then((response) => response.json())
      .then((data) => setEthPrice(data.Data.Data));
  }, []);
  // LTC
  useEffect(() => {
    fetch(
      "https://min-api.cryptocompare.com/data/v2/histoday?fsym=LTC&tsym=CLP&limit=30&api_key=1538e6cd3a57308e6e3a8f75d008b49553958f7ce261905e23de93b647f83cb4"
    )
      .then((response) => response.json())
      .then((data) => setLtcPrice(data.Data.Data));
  }, []);

  useEffect(() => {
    const arrTimeRaw = btcPrice.map((index) =>
      moment.unix(index.time).format("MM/DD")
    );
    setResultBtcTime(arrTimeRaw);

    const arrBtc = btcPrice.map((index) => index.open);
    setResultBtcPrice(arrBtc);

    const arrEth = ethPrice.map((index) => index.open);
    setResultEthPrice(arrEth);

    const arrLtc = ltcPrice.map((index) => index.open);
    setResultLtcPrice(arrLtc);
  }, [btcPrice, ethPrice, ltcPrice]);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <h5>
            <img src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@07fd63a0b662ed99c8ad870ee9227b8ef5e11630/svg/color/btc.svg"></img>{" "}
            BTC{" "}
          </h5>
          <Line
            data={{
              labels: resultBtcTime,
              datasets: [
                {
                  label: "BTC",
                  data: resultBtcPrice,
                  fill: true,
                  backgroundColor: "rgba(75, 192, 192, 0.5)",
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            }}
            height={400}
            width={600}
            options={options}
          />
        </div>
        <div className="col-md-4">
          <h5>
            <img src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@07fd63a0b662ed99c8ad870ee9227b8ef5e11630/svg/color/eth.svg"></img>{" "}
            ETH
          </h5>
          <Line
            data={{
              labels: resultBtcTime,
              datasets: [
                {
                  label: "ETH",
                  data: resultEthPrice,
                  fill: true,
                  backgroundColor: "rgba(165, 105, 189, 0.5)",
                  borderColor: "rgb(165, 105, 189)",
                  tension: 0.1,
                },
              ],
            }}
            options={options}
            height={400}
            width={600}
          />
        </div>
        <div className="col-md-4">
          <h5>
            <img src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@07fd63a0b662ed99c8ad870ee9227b8ef5e11630/svg/color/ltc.svg"></img>{" "}
            LTC
          </h5>
          <Line
            data={{
              labels: resultBtcTime,
              datasets: [
                {
                  label: "LTC",
                  data: resultLtcPrice,
                  fill: true,
                  backgroundColor: "rgb(230, 126, 34, 0.5)",
                  borderColor: "rgb(230, 126, 34)",
                  tension: 0.1,
                },
              ],
            }}
            options={options}
            height={400}
            width={600}
          />
        </div>
      </div>
    </div>
  );
};

export default Grafico;
