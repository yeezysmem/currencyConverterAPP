import React from "react";
import Convertor from "../CurrencyConvertor";
import { Container, Grid } from "@mui/material";
import rightHand from "../images/rightHand.png";
import leftHand from "../images/leftHand.png";
import "./MainPage.css";

export const MainPage = () => {
  return (
    <Container style={{ marginTop: 200 }}>
      <Grid container style={{ display: "flex" }}>
        <Grid item xs={4}>
          <img className="leftHand" src={leftHand} />
        </Grid>
        <Convertor />
        <Grid item xs={3}>
          <img className="rightHand" src={rightHand} />
        </Grid>
      </Grid>
    </Container>
  );
};
