import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux';
import App from "./components/App"
import store from './components/Store';

ReactDOM.render(<Provider store = { store }><App /></Provider>, document.getElementById("root"))
//make sure "root" is right or change it
