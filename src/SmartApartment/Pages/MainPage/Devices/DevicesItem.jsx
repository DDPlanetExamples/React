/*eslint-disable*/
import React, { useCallback, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from "react-router";
import { useFetch } from "use-http";
import SvgIcon from '../../../Components/Common/SvgIcon';
import {
    getAdditionalControlView,
    getDeviceComponentByType,
    getDeviceOnControlClickByType,
} from "../../DevicePage/helpers";
import { sendSignalAPI } from "../../DevicePage/api";
import WebviewContext from "../../../WebviewContext";
import Indicator from "../../../Components/Indicator";

const DevicesItemHTML = ({
    setDevices,
    devices,
    origItem,
}) => {
    const history = useHistory();
    const { ownerId } = useParams();
    const { request } = useFetch('', options => ({
        ...options,
        cachePolicy: 'no-cache',
    }));
    const { alert } = useContext(WebviewContext);
    const Control = useMemo(() => getDeviceComponentByType(origItem?.controls[0]?.type), [origItem]);

    const getControlValueByType = (e, control) => {
        switch (control.type) {
            case 'switch':
                return Number(!control.value);
            default:
                e?.target?.value;
        }
    }

    const handleControlClick = useCallback(async (value, setState) => {
        try {
            await sendSignalAPI(request, {
                serialNumber: origItem.id,
                signal: origItem.signal,
                state: value,
            });
            setState(setDevices, origItem, value);
        } catch (e) {
            await alert('Ошибка', 'Не удалось отправить сигнал');
        }
    }, [request, devices, origItem])

    return <DevicesItem state={origItem.status}
        onClick={() => {
            if (origItem.rtsp) {
                const event = new CustomEvent('redirect_to_native_screen', {
                    detail: JSON.stringify({
                        ownerId,
                        serialNumber: origItem.id,
                    }),
                });
                console.log(JSON.stringify({
                    ownerId,
                    serialNumber: origItem.id,
                }))
                document.dispatchEvent(event);
                return;
            }
            history.push(`/smartapartment/${ownerId}/device/${origItem.id}`);
        }}
    >
        <div className="devices-list__indicator">
            <SvgIcon name={origItem.svg} fill="#000000" height="32px"/>
            {
                origItem.dopValues
                    ? <Indicator>{`${origItem.dopValues.value}${origItem.dopValues.measure}`}</Indicator>
                    : <Control
                        id={`${origItem.id}_${origItem.signal}`}
                        checked={!!origItem?.controls[0]?.value}
                        state={!!origItem?.controls[0]?.value}
                        onClick={(e) => {
                            if (!origItem?.controls[0]?.readonly && origItem.status !== 'disconnect') {
                                handleControlClick(getControlValueByType(e, origItem?.controls[0]),
                                    getDeviceOnControlClickByType(origItem?.controls[0]?.type));
                            }
                        }}
                        disable={!!origItem?.controls[0]?.readonly || origItem.status === 'disconnect'}
                    >{origItem?.controls[0]?.value}</Control>
            }
        </div>

        <div className="devices-list__title">
            {origItem.name}
        </div>
        <div className="devices-list__desc">
            {
                (origItem.dopControls || [])
                    .reduce((acc, control) => `${acc} ${getAdditionalControlView(control)}`, '')
            }
        </div>
        {origItem.status === 'disconnect'
        && <div className="devices-list__state">
            <SvgIcon name="webview-warning" stroke="#BF360C" fill="none" height="14px"/>
            <span>Не в сети</span>
        </div>
        }
    </DevicesItem>
}

const DevicesItem = styled.div`
    width: calc(50% - 5px);
    margin-bottom: 10px;
    background: ${props => (props.state === 'disconnect' ? "#FDF5D1" : "#F0F2F4")};
    border-radius: 14px;
    padding: 12px;

    display: flex;
    flex-direction: column;

    .devices-list__indicator {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
    }

    .devices-list__indicator svg {
        max-width: 32px;
    }

    .devices-list__title {
        font-size: 16px;
        line-height: 1.2;
        font-weight: 500;
        margin-bottom: 8px;
        word-break: break-word;
        user-select: none;
    }

    .devices-list__desc {
        font-size: 13px;
        line-height: 1.25;
        letter-spacing: -0.0025em;
        color: #424242;
        user-select: none;
    }

    .devices-list__state {
        display: flex;
        align-items: center;
        color: #BF360C;
        font-weight: 500;
        font-size: 13px;
        line-height: 1.25;
        letter-spacing: -0.0025em;
        margin-top: 8px;
    }

    .devices-list__state svg {
        width: 14px;
        margin-right: 5px;
    }
`

export default DevicesItemHTML
