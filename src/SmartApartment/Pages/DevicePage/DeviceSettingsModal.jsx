import React from 'react';
import { useParams } from "react-router";
import Header from "../../Components/Header";
import { LayoutWhite } from "../../Components/Layout";
import Main from "../../Components/Main";
import DeviceForm from "./DeviceForm";

const DeviceSettingsModal = ({ metaData }) => {
    const { settingsId } = useParams()
    const settings = metaData?.settings[settingsId]

    return (
        <LayoutWhite fixed isFullHeight>
            <Header>
                {settings?.title}
            </Header>
            <Main style={{ paddingBottom: 50 }}>
                <DeviceForm
                    settings={settings?.settings}
                    online={metaData?.online}
                />
            </Main>
        </LayoutWhite>
    );
};

export default DeviceSettingsModal;
