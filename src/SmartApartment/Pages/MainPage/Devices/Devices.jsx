import React, { useCallback, useMemo } from 'react';
import styled from "styled-components";

import { map } from 'lodash'
import { useHistory, useParams } from "react-router";
import ButtonIcon from '../../../Components/Common/ButtonIcon';
import SvgIcon from '../../../Components/Common/SvgIcon';
import DevicesFilterHTML from '../../../Components/DevicesFilter';
import DevicesItem from './DevicesItem';
import { useModal } from "../../../Components/useModal";
import RoomsList from "../../RoomsList/RoomsList";

const DevicesHTML = ({
    className,
    availableRooms,
    setAvailableRooms,
    devices,
    activeRoom,
    setActiveRoom,
    setDevices,
}) => {
    const history = useHistory();
    const { ownerId } = useParams();
    const [Modal, setModal] = useModal();
    const deviceRender = useMemo(() => (!activeRoom
        ? devices
        : devices.filter(item => item.room?.id === Number(activeRoom?.id)))
        .map(item => <DevicesItem
            origItem={item}
            devices={devices}
            setDevices={setDevices}
            key={`${item.id}_${item.signal}`}
        />), [devices, activeRoom]);

    const openRoomList = useCallback(() => {
        setModal(<RoomsList
            onClose={() => setModal(null)}
            rooms={availableRooms.map(i => ({
                ...i,
                desc: `${devices.reduce((acc, d) => (d.room.id === Number(i.id) ? acc + 1 : acc), 0)} устройств`,
            }))}
            setRooms={setAvailableRooms}
            devices={devices}
        />);
    }, [availableRooms, devices])

    return <div className={className ? `devices ${className}` : "devices"}>
        <div className="devices__title">
            <h2>
                Устройства
            </h2>
            <ButtonIcon
                onClick={() => history.push(`/smartapartment/${ownerId}/add_device`)}
            >
                <SvgIcon
                    name="webview-plus"
                    width="16"
                    height="16"
                    stroke="#283593"/>
            </ButtonIcon>
        </div>

        <div className="devices-filters">
            <DevicesFilterHTML
                text='Все'
                state={!activeRoom && 'active'}
                onClick={() => setActiveRoom()}
            />
            {
                map(availableRooms, item => <DevicesFilterHTML
                    key={item.id}
                    text={item.title}
                    state={!!item.enabled && 'active'}
                    onClick={() => setActiveRoom(item)}
                />)
            }
            <DevicesFilterHTML
                text='Комнаты'
                state={'disabled'}
                edit
                onClick={() => openRoomList()}
            />
        </div>

        <div className="devices-list">
            {deviceRender}
        </div>
        {Modal}
    </div>
}

const Devices = styled(DevicesHTML)`
    & {
        background: #fff;
        border-radius: 12px 12px 0px 0px;
        padding: 20px 16px;
        user-select: none;
    }

    .devices__title {
        display: flex;
        justify-content: space-between;
    }

    .devices__title h2 {
        font-size: 20px;
        line-height: 140%;
        letter-spacing: -0.017em;
        font-weight: 700;
    }

    .devices-filters {
        display: flex;
        overflow: auto;
        padding: 12px 0 20px;
        margin: 0 -16px 0 -16px;
    }

    .devices-filters::-webkit-scrollbar {
        display: none;
    }

    .devices-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

`

export default Devices
