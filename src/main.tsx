import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import  { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
body {
  overflow: hidden;}  
`

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <GlobalStyle />
      <App />
    </>
  </StrictMode>
);
