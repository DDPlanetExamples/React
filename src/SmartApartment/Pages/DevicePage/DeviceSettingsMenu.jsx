import React from 'react';
import { map } from 'lodash'
import SettingsSubmenu from "../../Components/SettingsSubmenu/SettingsSubmenu";

const DeviceSettingsMenu = ({ settingsList }) => (
    <SettingsSubmenu settingsList={map(settingsList, s => ({
        title: s.title,
        to: s.to,
    }))}/>
);

export default DeviceSettingsMenu;
