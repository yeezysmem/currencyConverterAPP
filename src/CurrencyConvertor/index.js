import React, { useState, useEffect } from "react";
import { Card, Grid } from "@mui/material";
import axios from "axios";
import "./CurrencyConvertor.css";
import TextField from "@mui/material/TextField";
import swapicon from "../images/swapicon.svg";
import card from "../images/card.svg";
import bloops from "../images/bloops.svg";
import { ReactComponent as Swap } from "../images/swapicon.svg";

const Convertor = () => {
  const [latestData, setLatestData] = useState([]);

  const [initialState, setState] = useState({
    currencies: ["USD", "SGD", "PHP", "EUR", "UAH"],
    base: "USD",
    amount: 1,
    convertTo: "UAH",
    result: "",
    date: "",
    symbols: "EUR",
    rate: "UAH",
  });

  const myHeaders = new Headers();
  myHeaders.append("apikey", "W43JqGnf0uZhcxBhHpuyf9eUm39D5ze2");
  myHeaders.append("Access-Control-Allow-Origin", "*");

  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  const { currencies, base, amount, convertTo, result, rate, symbols, latest } =
    initialState;

  useEffect(() => {
    if (amount === isNaN) {
      return;
    } else {
      const getCurrencyconvertTor = async () => {
        const response = await axios.get(
          `https://api.exchangerate.host/convert?from=${base}&to=${convertTo}&amount=${amount}`
        );

        const result = response.data.result;
        setState({
          ...initialState,
          result,
          latest,
          symbols,
          rate,
        });
      };
      const getLatestRate = async () => {
        const latestRate = await axios
          .get(
            "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
          )
          .then((res) => {
            setLatestData(res.data);
          });
      };
      getCurrencyconvertTor();
      getLatestRate();
    }
  }, [amount, base, convertTo, result, setLatestData]);

  const onChangeInput = (e) => {
    setState({
      ...initialState,
      amount: e.target.value,
      result: null,
      date: null,
    });
  };
  const handleSelect = (e) => {
    setState({
      ...initialState,
      [e.target.name]: e.target.value,
      result: null,
    });
  };

  const handleSwap = (e) => {
    e.preventDefault();
    setState({
      ...initialState,
      convertTo: base,
      base: convertTo,
      result: null,
    });
  };
  const rebelst = latestData.filter((el) => el.cc === "USD");
  return (
    <Grid item xs={4}>
      <img src={bloops} style={{ position: "absolute", bottom: "10px" }}></img>
      <div className="row">
        <div className="ConverterBlock">
          <Grid container justifyContent="center" style={{ marginBottom: 15 }}>
            <Grid
              item
              xs={10}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
                <p>
                  {latestData
                    .filter((el) => el.cc === "EUR")
                    .map((item) => (
                      <span style={{fontSize:10}}>
                        {item.cc}&nbsp;
                        {item.rate}
                      </span>
                    ))}
                </p>
                &nbsp;
                <p>
                  {latestData
                    .filter((el) => el.cc === "USD")
                    .map((item) => (
                      <span style={{fontSize:10}}>
                        {item.cc}&nbsp;
                        {item.rate}
                      </span>
                    ))}
                </p>
            </Grid>
            <Grid item>
              <h5>
                <span className="ConverterBlock-base">
                  {amount} {base}
                </span>{" "}
                is equivalent to &nbsp;
              </h5>
            </Grid>
            <Grid item>
              <h5>
                {amount === "" ? (
                  "0"
                ) : result === null ? (
                  "Calculating ..."
                ) : (
                  <span className="ConverterBlock-convertTo">{result}</span>
                )}
                &nbsp;
                <span className="ConverterBlock-convertTo">{convertTo}</span>
              </h5>
            </Grid>
            <Grid item></Grid>
          </Grid>

          <Grid container style={{ display: "flex" }}>
            <Grid item xs={12}>
              <Grid container justifyContent="center">
                <Grid item xs={12}>
                  <form className="form-inline ">
                    <Grid container justifyContent="space-around">
                      <Grid item xs={8}>
                        <input
                          type="number"
                          value={amount}
                          onChange={onChangeInput}
                          className="form-control"
                        />
                      </Grid>
                      <Grid item>
                        <select
                          name="base"
                          value={base}
                          onChange={handleSelect}
                          className="form-select "
                        >
                          {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                              {currency}
                            </option>
                          ))}
                        </select>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <button className="swapbtn" onClick={handleSwap}>
                    <span>SWAP</span>
                    <img src={swapicon}></img>
                  </button>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 40 }}>
                  <form className="form-inline">
                    <Grid container justifyContent="space-around">
                      <Grid item xs={8}>
                        <input
                          disabled={true}
                          value={
                            amount === ""
                              ? "0"
                              : result === null
                              ? "Calculating..."
                              : result
                          }
                          className="form-control "
                        />
                      </Grid>
                      <Grid item>
                        <select
                          name="convertTo"
                          value={convertTo}
                          onChange={handleSelect}
                          className="form-select"
                        >
                          {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                              {currency}
                            </option>
                          ))}
                        </select>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </Grid>
  );
};

export default Convertor;
