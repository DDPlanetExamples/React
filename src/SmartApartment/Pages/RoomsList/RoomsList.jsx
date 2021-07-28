import React, {
    useCallback, useContext, useEffect, useState,
} from 'react';
import { useFetch } from "use-http";
import Button from '../../Components/Common/Button';
import Header from '../../Components/Header';
import Main from '../../Components/Main';
import RoomsListItem from './RoomsListItem';
import { deleteRoomAPI, getRoomsAPI, updateRoomAPI } from "../MainPage/api";
import LoaderPage from "../LoaderPage";
import WebviewContext from "../../WebviewContext";
import { LayoutWhite } from "../../Components/Layout";

const RoomsList = ({ rooms = [], onClose, setRooms }) => {
    const { alert, input, confirm } = useContext(WebviewContext);
    const [localRooms, setLocalRooms] = useState(rooms);
    const { request: deleteRequest, deleteError } = useFetch('');
    const { request: addRequest, addError } = useFetch('');
    const { request: roomListRequest, loading } = useFetch('', options => ({
        ...options,
        cachePolicy: 'no-cache',
    }));
    //
    const getRooms = useCallback(async () => {
        try {
            const roomResp = await getRoomsAPI(roomListRequest);
            setLocalRooms((rms) => roomResp?.data?.rooms.map(r => ({
                ...r,
                desc: rms.find(i => i.id === r.id)?.desc || '0 устройств',
            })));
        } catch (e) {
            console.log(e);
        }
    }, [setLocalRooms, roomListRequest])

    const handleDeleteClick = useCallback(async (room) => {
        if (await confirm('Внимание!', `Вы действительно хотите удалить комнату: ${room.title}?`)) {
            try {
                await deleteRoomAPI(deleteRequest, {
                    id: room.id,
                });
                await getRooms();
            } catch {
                alert('Ошибка', 'Не удалось удалить комнату');
            }
        }
    }, [getRooms, localRooms]);

    const handleAddDevice = useCallback(async () => {
        const title = await input({
            inputTitle: "Название",
            title: 'Добавление комнаты',
            placeholder: 'Название комнаты',
            note: () => {},
        });
        if (title) {
            try {
                await updateRoomAPI(addRequest, { title });
                await getRooms();
            } catch (e) {
                alert("Ошибка");
            }
        }
    }, [getRooms]);

    useEffect(() => {
        if (deleteError) {
            alert('Ошибка', 'Не удалось удалить комнату');
        }
    }, [deleteError]);
    useEffect(() => {
        if (addError) {
            alert('Ошибка', 'Не удалось добавить комнату');
        }
    }, [addError]);

    if (loading) {
        return <LoaderPage />;
    }

    return <LayoutWhite isFullHeight fixed>
        <Header onBackClick={() => {
            setRooms(localRooms);
            onClose();
        }}>
            Комнаты
        </Header>
        <>
            <Main>
                {
                    localRooms.map(item => <RoomsListItem
                        key={item.id}
                        title={item.title}
                        desc={item.desc}
                        onDeleteClick={() => handleDeleteClick(item)}
                    />)
                }
                <Button wide onClick={handleAddDevice} style={{ marginBottom: 10 }}>Добавить комнату</Button>
            </Main>
        </>
    </LayoutWhite>
}

export default RoomsList
