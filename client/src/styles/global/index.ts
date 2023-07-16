import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
    list-style: none;
    -webkit-font-smoothing: antialiased;

     input[type=number]::-webkit-inner-spin-button { 
    -webkit-appearance: none;
    
    }
    input[type=number] { 
      -moz-appearance: textfield;
      appearance: textfield;

    }
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    background: linear-gradient(45deg, #21C25E 0%, #02A35C 100%);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: none;
  }
`
