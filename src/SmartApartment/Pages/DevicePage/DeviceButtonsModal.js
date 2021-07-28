import React, {
    useCallback, useContext, useEffect, useState,
} from "react";
import { useFetch } from "use-http";
import {
    defer, from, fromEvent,
} from "rxjs";
import {
    delay, takeUntil, takeWhile, repeat, takeLast,
} from "rxjs/operators";
import Header from "../../Components/Header";
import Main from "../../Components/Main";
import { LayoutWhite } from "../../Components/Layout";
import {
    addConnectionsTriggerAPI,
    getTriggerButtonListAPI,
    getTriggerConnectionsAPI,
    removeConnectionsTriggerAPI, updateConnectionsTriggerAPI,
} from "./api";
import Button from "../../Components/Common/Button";
import RoomsListItem from "../RoomsList/RoomsListItem";
import WebviewContext from "../../WebviewContext";
import LoaderWrap from "../../Components/LoaderWrap";

const buttonActionsVariants = [
    {
        text: 'Включить',
        value: 1,
    },
    {
        text: 'Выключить',
        value: 0,
    },
    {
        text: 'Инвертировать',
        value: -1,
    },
]
const clicks = fromEvent(document, 'click')
// eslint-disable-next-line no-unused-vars
const DeviceButtonsModal = ({ onSave, onClose, signalId }) => {
    // eslint-disable-next-line no-unused-vars
    const { actionPopup, alert, confirm } = useContext(WebviewContext);
    const {
        request,
        loading,
    } = useFetch({
        cachePolicy: 'no-cache',
    });
    const [isSearchTrigger, setIsSearchTrigger] = useState(false);
    const [connections, setConnections] = useState([]);
    const [isEmptyList, setIsEmptyList] = useState(false);
    const [isRejected, setIsRejected] = useState(false);

    const getCurrentConnections = useCallback(async () => {
        try {
            const connects = await getTriggerConnectionsAPI(request, {
                managementSignalId: signalId,
            })
            if (!connects.StatusCode) {
                console.log(connects.data);
                setConnections(connects.data);
                setIsEmptyList(false);
                return;
            }
            setIsEmptyList(true);
        } catch (e) {
            console.log(e)
        }
    }, [signalId, request])

    const handleAddButtonClick = useCallback(async () => {
        const type = await actionPopup(buttonActionsVariants);
        if (type !== null) {
            setIsSearchTrigger(true);
            setIsRejected(false);
            const obsetvable = defer(() => from(getTriggerButtonListAPI(request)))
                .pipe(
                    delay(2000),
                    repeat(5),
                    takeUntil(clicks),
                    takeWhile((a) => {
                        if (!a?.StatusCode) {
                            addConnectionsTriggerAPI(request, {
                                managementSignalId: signalId,
                                buttonSignalId: a?.data[0]?.signalId,
                                managementValue: type,
                            }).then(() => {
                                getCurrentConnections();
                            })
                        }
                        return a?.StatusCode;
                    }, true),
                    takeLast(1),
                );

            obsetvable.subscribe(() => {
                setIsSearchTrigger(false);
            })
        }
    }, [request, isRejected]);

    const handleDeleteButtonClick = useCallback(async (trigger) => {
        if (await confirm('Внимание!', 'Вы действительно хотите удалить кнопку?')) {
            try {
                await removeConnectionsTriggerAPI(request, {
                    managementSignalId: signalId,
                    buttonSignalId: trigger.signalId,
                })
                await getCurrentConnections();
            } catch {
                alert('Ошибка');
            }
        }
    }, [signalId, request]);

    const handleEditButtonClick = useCallback(async (trigger) => {
        const newValue = await actionPopup(buttonActionsVariants);
        if (newValue !== null) {
            try {
                await updateConnectionsTriggerAPI(request, {
                    managementSignalId: signalId,
                    managementValue: newValue,
                    buttonSignalId: trigger.signalId,
                })
                await getCurrentConnections();
            } catch {
                alert('Ошибка');
            }
        }
    }, [request, signalId]);

    useEffect(() => {
        getCurrentConnections();
    }, [])

    return (
        <LayoutWhite fixed>
            {
                (loading || isSearchTrigger)
                    ? <LoaderWrap onClick={() => setIsRejected(true)} />
                    : <>
                        <Header onBackClick={onClose}>Кнопка</Header>
                        <Main>
                            {
                                isEmptyList
                                    ? <div
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: '50px 0',
                                        }}>
                                        У вас еще нет кнопок
                                    </div>
                                    : !!connections.length && connections.map(con => <RoomsListItem
                                        key={con.signalId}
                                        title={buttonActionsVariants.find(i => i.value === con.newValue).text}
                                        desc={`${con.model}
                                        ${con.buttonName}`}
                                        onDeleteClick={() => handleDeleteButtonClick(con)}
                                        onEditClick={() => handleEditButtonClick(con)}
                                    />)
                            }
                            <Button wide
                                onClick={handleAddButtonClick}
                                style={{ marginBottom: 10 }}>Добавить кнопку</Button>
                        </Main>
                    </>
            }
        </LayoutWhite>
    );
}

export default DeviceButtonsModal;
