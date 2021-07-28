import { createGlobalStyle } from "styled-components";
import React from 'react';
import { Normalize } from "styled-normalize";
import { Reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Inter, Arial, Helvetica, sans-serif;
    box-sizing: border-box;
  }

  * {
    box-sizing: inherit;
  }
`

const StyledInit = () => (
    <>
        <Reset/>
        <Normalize/>
        <GlobalStyle/>
    </>
);

export default StyledInit;
