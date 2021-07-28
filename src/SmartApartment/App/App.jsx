import React from 'react';
import {
    BrowserRouter,
} from 'react-router-dom';
import {Route, Switch} from "react-router";
import AppRoutingContainer from "./AppRoutingContainer";
import { MAIN_ROUTE } from "../Constants/ROUTING_CONSTANTS";
import StubApartmentHTML from "../Components/StubSmartApartment";

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route component={AppRoutingContainer} path={MAIN_ROUTE} />
            <Route component={StubApartmentHTML} />
        </Switch>
    </BrowserRouter>
)

export default App
