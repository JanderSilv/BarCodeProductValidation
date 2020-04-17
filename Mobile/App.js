import React, { Fragment } from "react";
import { StatusBar } from "react-native";
import Routes from "./src/routes";

export default function App() {
    return (
        <Fragment>
            <StatusBar backgroundColor="#000000" barStyle="light-content" />
            <Routes />
        </Fragment>
    );
}
