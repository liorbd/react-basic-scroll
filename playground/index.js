import * as React from "react";
import * as ReactDom from "react-dom";
import {App} from "./App";
import * as babel from "babel-polyfill";

ReactDom.render(<App />, document.querySelector('#app'));