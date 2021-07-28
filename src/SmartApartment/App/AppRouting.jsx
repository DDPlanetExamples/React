import { Route } from "react-router-dom";
import React, { useEffect } from "react";
import { Switch, useLocation } from "react-router";
import { MAIN_ROUTE } from "../Constants/ROUTING_CONSTANTS";
import UIKIT from "../Pages/UIKIT";
import { Stub } from "../Pages/Stub";
import MainPage from "../Pages/MainPage/MainPage";
import AddDeviceContainer from "../Pages/AddDevice/AddDeviceContainer";
import AddDeviceForm from "../Pages/AddDevice/AddDeviceForm";
import RoomsList from "../Pages/RoomsList/RoomsList";
import AddScene from "../Pages/SettingScenes/AddScene";
import SettingScene from "../Pages/SettingScenes/SettingScene";
import DevicePageContainer from "../Pages/DevicePage/DevicePageContainer";

const AppRouting = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        const event = new CustomEvent('webview_route_changed', { detail: window.location.href });
        document.dispatchEvent(event);
    }, [pathname])
    return (
        <Switch>
            <Route path={`${MAIN_ROUTE}/device/:serialNumber`} component={DevicePageContainer}/>
            <Route path={`${MAIN_ROUTE}?/add_device`} component={AddDeviceContainer}/>
            <Route exact path={`${MAIN_ROUTE}?/add_scene`} component={AddScene}/>
            <Route exact path={`${MAIN_ROUTE}?/setting_scene`} component={SettingScene}/>

            <Route path={`${MAIN_ROUTE}?`} component={MainPage}/>

            <Route exact path={`${MAIN_ROUTE}/uikit`} component={UIKIT}/>
            <Route exact path={`${MAIN_ROUTE}/stub`} component={Stub}/>

            <Route exact path={`${MAIN_ROUTE}?/new_device_setting`} component={AddDeviceForm}/>
            <Route exact path={`${MAIN_ROUTE}?/rooms`} component={RoomsList}/>
        </Switch>
    )
};

export default AppRouting;
