import React, {
    useCallback, useContext, useEffect, useState,
} from 'react';
import { useFetch } from "use-http";
import { useHistory, useParams } from "react-router";
import FooterEditHTML from '../../Components/FooterEdit';
import Header from '../../Components/Header';
import SettingsListItemLayout from '../../Components/SettingsList/SettingsListItemLayout';
import SettingsSubmenuItem from '../../Components/SettingsSubmenu/SettingsSubmenuItem';
import Main from "../../Components/Main";
import WebviewContext from "../../WebviewContext";
import { getRoomsAPI } from "../MainPage/api";

const AddDeviceForm = ({ initialValue, onSubmit }) => {
    const { request } = useFetch('');
    const { ownerId } = useParams();
    const history = useHistory();
    const { input, select, alert } = useContext(WebviewContext);
    const [title, setTitle] = useState('');
    const [room, setRoom] = useState(null);
    const [roomList, setRoomList] = useState([]);

    const getRoomList = useCallback(async () => {
        try {
            const { data, StatusCode } = await getRoomsAPI(request);
            if (!StatusCode) {
                setRoomList(data?.rooms || []);
            }
        } catch {
            alert('', 'Не удалось получить список комнат');
        }
    }, []);

    useEffect(() => {
        getRoomList();
    }, []);

    return <div>
        <Header onBackClick={() => history.push(`/smartapartment/${ownerId}/add_device/2`)}>
            Новое устройство
        </Header>
        <Main>
            <SettingsListItemLayout
                label={'Тип устройства'}
                value={initialValue?.title}
                onChange={() => () => {}}
                dontShowControls
                control={{}}
            />
        </Main>
        <SettingsSubmenuItem
            empty={!title}
            title={title || 'Добавить'}
            desc={'Название устройства'}
            onClick={async () => {
                setTitle(await input({
                    inputTitle: 'Название',
                    title: 'Название устройства',
                    initialValue: title,
                    note: () => {},
                }))
            }}
        />
        <SettingsSubmenuItem
            empty={!room}
            title={roomList.find(i => i.id === room)?.title || 'Выбрать'}
            desc={'Помещение устройства'}
            onClick={async () => {
                setRoom(await select({
                    list: roomList,
                    initialSelectedId: room,
                    title: 'Комната',
                }))
            }}
        />
        <FooterEditHTML text='Добавить' disabled={!(room && title)} fixed onClick={() => onSubmit({
            serialNumber: initialValue.serial,
            title,
            roomId: `${room}`,
        })}/>
    </div>
}

export default AddDeviceForm
