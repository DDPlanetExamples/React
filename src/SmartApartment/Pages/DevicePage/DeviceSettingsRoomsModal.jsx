import React, {
    useCallback, useContext, useEffect, useState,
} from 'react';
import { useFetch } from "use-http";
import { find } from 'lodash'
import Button from "../../Components/Common/Button";
import SelectModal from "../../Components/Modals/SelectModal";
import WebviewContext from "../../WebviewContext";
import { getRoomsAPI, updateRoomAPI } from "../MainPage/api";

const DeviceSettingsModal = ({
    onSave, onClose, initialSelectedId, index,
}) => {
    const [roomList, setRoomList] = useState([])
    const { input, alert } = useContext(WebviewContext)

    const {
        request,
    } = useFetch({
        cachePolicy: 'no-cache',
    })

    const [addNewRoomRequest] = useFetch({
        cachePolicy: 'no-cache',
    })

    const getRoomList = useCallback(async () => {
        try {
            const { data, StatusCode } = await getRoomsAPI(request);
            if (!StatusCode) {
                setRoomList(data?.rooms || []);
            }
        } catch (e) {
            console.log(e);
        }
    }, []);

    const getRoomById = useCallback((roomId) => onSave(find(roomList, { id: roomId })),
        [roomList, onSave])

    const addNewRoom = useCallback(async () => {
        const title = await input({
            inputTitle: 'Название',
            title: 'Добавление комнаты',
            initialValue: '',
        })

        if (title) {
            try {
                await updateRoomAPI(addNewRoomRequest, {
                    title,
                })
                getRoomList()
            } catch (e) {
                alert('Ошибка!', 'Не удалось создать комнату');
            }
        }
    }, [])

    useEffect(() => {
        getRoomList()
    }, [])

    return (
        <SelectModal
            index={index}
            list={roomList}
            onClose={() => onClose()}
            onSave={getRoomById}
            initialSelectedId={initialSelectedId}
            title='Комнаты'
            control={
                <Button wide onClick={addNewRoom}
                    style={{ margin: '17px 11px 0 16px', width: 'calc(100% - 27px)' }}>
                    Добавить комнату
                </Button>
            }
        />
    )
};

export default DeviceSettingsModal;
