import React from 'react';
import { map } from "lodash";
import SettingsListItemLayout from "../../Components/SettingsList/SettingsListItemLayout";

const DeviceForm = ({ settings, online }) => (
    map(settings, s => (
        <SettingsListItemLayout
            key={`${s.id}${s.name}${s.title}`}
            online={online}
            {...s}
        />
    ))
);

export default DeviceForm;
