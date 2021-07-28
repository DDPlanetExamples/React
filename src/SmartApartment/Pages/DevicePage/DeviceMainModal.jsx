import React from 'react';
import { useHistory, useParams } from "react-router";
import Header from "../../Components/Header";
import InfoGroup from "../../Components/InfoGroup/InfoGroup";
import { LayoutWhite } from "../../Components/Layout";
import Main from "../../Components/Main";
import DeviceBadges from "./DeviceBadges";
import DeviceForm from "./DeviceForm";

const DeviceMainModal = ({ metaData }) => {
    const { push } = useHistory();
    const { ownerId, serialNumber } = useParams();

    return (
        <LayoutWhite isFullHeight fixed>
            <Header
                onSettingsClick={() => push(`/smartapartment/${ownerId}/device/${serialNumber}/edit`)}
                onBackClick={() => push(`/smartapartment/${ownerId}`)}
            >{metaData?.title}</Header>
            <DeviceBadges online={metaData.online} wifiLevel={metaData.wifiLevel} />
            <Main>
                <div>
                    <DeviceForm
                        settings={metaData?.mainSettings}
                        online={metaData.online}
                    />
                </div>
                <InfoGroup
                    items={(metaData?.info || [])}
                    link={metaData?.link}
                />
            </Main>
        </LayoutWhite>
    );
};

export default DeviceMainModal;
