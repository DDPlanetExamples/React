import {
    filter, keyBy, map, mapValues, noop, find,
} from "lodash";
import React, {
    useCallback, useEffect, useState,
} from 'react';
import { Route, useLocation, useParams } from "react-router";
import { useFetch } from "use-http";
import { PoseGroup } from "react-pose";
import { SlideAnimationWrapper } from "../../Components/Animation/AnimationWrapper";
import { MAIN_ROUTE, ROUTE_PARAMS } from "../../Constants/ROUTING_CONSTANTS";
import GraphPageContainer from "../GraphPage/GraphPageContainer";
import LoaderPage from "../LoaderPage";
import { Stub } from "../Stub";
import {
    getDeviceInfoAPI, updateDeviceName,
} from "./api";
import { DEVICE_CONTROL_ALL_TYPES } from "./DEVICE_CONSTANTS";
import DeviceMainModal from './DeviceMainModal'
import DeviceEditModal from "./DeviceEditModal";
import DeviceSettingsModal from "./DeviceSettingsModal";
import { getWifiLevel, mapToSettings } from "./helpers";

const DevicePageContainer = () => {
    const { serialNumber, ownerId } = useParams();
    const location = useLocation();
    const { loading, error, request } = useFetch('');
    const [submitForm] = useFetch('');
    const [originalData, setOriginalData] = useState();
    const [metaData, setMetaData] = useState();

    const getDeviceInfo = useCallback(async (sn) => {
        try {
            const resp = await getDeviceInfoAPI(request, { serialNumber: sn });
            const signals = filter(resp?.data?.signals, { main: 0 })
            setMetaData({
                serialNumber: resp?.data?.meta?.serialnumber,
                title: resp?.data?.meta?.class?.title,
                link: resp?.data?.meta?.manual,
                info: [{
                    name: 'Серийный номер',
                    value: resp?.data?.meta?.serialnumberHuman,
                }, {
                    name: 'Версия микропрограммы',
                    value: resp?.data?.meta?.firmware?.ver,
                }],
                canResetWifi: resp?.data?.meta?.model?.resetwifi,
                canRestart: resp?.data?.meta?.model?.restart,
                mainSettings: map(filter(resp?.data?.signals, 'main'), s => mapToSettings(s, resp?.data?.meta, submitForm)),
                online: resp?.data?.meta?.state?.type !== 'disconnect',
                wifiLevel: getWifiLevel(find(signals, { name: 'rssi' })),
                deviceEditBlock: [
                    {
                        label: 'Устройство',
                        title: resp?.data?.meta?.class?.title,
                        readOnly: true,
                        readOnlyLabel: true,
                        updateNameApi: noop,
                        type: DEVICE_CONTROL_ALL_TYPES.CUSTOM,
                        serialNumber: resp?.data?.meta?.serialnumber,
                        control: {},
                    },
                    {
                        label: 'Название',
                        title: resp?.data?.meta?.name,
                        readOnlyLabel: resp?.data?.meta?.readOnly,
                        readOnly: true,
                        updateNameApi: async (model) => await updateDeviceName(
                            submitForm, {
                                serialNumber: model.serialNumber,
                                title: model.title,
                            },
                        ),
                        type: DEVICE_CONTROL_ALL_TYPES.CUSTOM,
                        serialNumber: resp?.data?.meta?.serialnumber,
                        control: {},
                    },
                    {
                        serialNumber: resp?.data?.meta?.serialnumber,
                        label: 'Помещение устройства',
                        title: resp?.data?.meta?.room?.title,
                        value: resp?.data?.meta?.room?.id,
                        type: DEVICE_CONTROL_ALL_TYPES.ROOM,
                        readOnly: false,
                        readOnlyLabel: true,
                        control: {},
                    },
                ],
                settings: mapValues(keyBy(resp?.data?.meta?.settingsBlock, 'id'), v => ({
                    ...v,
                    to: `/smartapartment/${ownerId}/device/${serialNumber}/settings/${v.id}`,
                    settings: map(filter(signals, { settingsBlock: v.id }), s => (
                        mapToSettings(s, resp?.data?.meta, submitForm)
                    )),
                })),
            });
            setOriginalData(resp?.data);
        } catch (e) {
            console.log(e);
        }
    }, [request])

    useEffect(() => {
        getDeviceInfo(serialNumber);
    }, [serialNumber]);

    useEffect(() => {
        console.log(originalData);
    }, [originalData, metaData]);

    if (loading) {
        return <LoaderPage />;
    }

    if (error) {
        return <Stub />;
    }

    if (!metaData || !originalData) {
        return null
    }

    return (
        <PoseGroup>
            <SlideAnimationWrapper key={`DeviceMainAndSettingsModals${location.key}`} >
                <Route
                    path={`${MAIN_ROUTE}/device/${ROUTE_PARAMS.SERIAL_NUMBER}`}
                    render={() => <DeviceMainModal metaData={metaData} originalData={originalData} />}
                />
                <Route
                    path={`${MAIN_ROUTE}/device/${ROUTE_PARAMS.SERIAL_NUMBER}/edit`}
                    render={() => <DeviceEditModal originalData={originalData} metaData={metaData} />}
                />
                <Route
                    path={`${MAIN_ROUTE}/device/${ROUTE_PARAMS.SERIAL_NUMBER}/settings/${ROUTE_PARAMS.SETTINGS_ID}`}
                    render={() => <DeviceSettingsModal metaData={metaData} />}
                />
                <Route
                    path={`${MAIN_ROUTE}/device/${ROUTE_PARAMS.SERIAL_NUMBER}/graph/${ROUTE_PARAMS.SIGNAL_NAME}`}
                    render={({ match }) => (
                        <GraphPageContainer
                            name={find(originalData.signals, { name: match.params.signalName }).label.title}
                        />
                    )}
                />
            </SlideAnimationWrapper>
        </PoseGroup>
    )
}

export default DevicePageContainer;
