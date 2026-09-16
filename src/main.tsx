import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
} 

input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  font-size: 16px;
  transition: border-color 0.3s ease-in-out;
}

input[type=text]:focus {
  border-color: #8c8c8c;
}
`

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <GlobalStyle />
      <App />
    </>
  </StrictMode>
);
