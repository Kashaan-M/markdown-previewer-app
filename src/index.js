import React from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";
// import { App } from "./components/App";
import App from "./components/AppWithReactHooks";

const app = ReactDOM.createRoot(document.getElementById("app"));
app.render(<App />);


/*const editor = document.querySelector("#editor");
const previewer = document.querySelector(".previewer");
const submit = document.querySelector("#submit");

export const buildPreview = (e) => {
  previewer.innerHTML = marked.parse(editor.value);
}

editor.addEventListener("keyup",buildPreview);
*/