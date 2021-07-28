import React, { useCallback, useContext, useEffect } from 'react';
import { useFetch } from "use-http";
import { useHistory, useParams } from "react-router";
import ButtonWhite from "../../Components/Common/ButtonWhite";
import Header from "../../Components/Header";
import Layout from "../../Components/Layout";
import Main from "../../Components/Main";
import DeviceForm from "./DeviceForm";
import DeviceSettingsMenu from "./DeviceSettingsMenu";
import WebviewContext from "../../WebviewContext";
import { removeDeviceApi, resetWifiAPI, sendSignalAPI } from "./api";
import LoaderPage from "../LoaderPage";
import Button from "../../Components/Common/Button";
import ButtonBox from "../../Components/Common/ButtonBox";

const DeviceEditModal = ({ metaData, originalData }) => {
    const { ownerId, serialNumber } = useParams();
    const history = useHistory();
    const { alert, confirm } = useContext(WebviewContext);
    const { request, error, loading } = useFetch('');
    const { request: requestReset, error: errorReset, loading: loadingReset } = useFetch('');

    const handleDelete = useCallback(async (serialNumber) => {
        if (await confirm('Внимание!', `Вы действительно хотите удалить устройство: ${metaData?.title}?`)) {
            try {
                await removeDeviceApi(request, { serialNumber });
                history.push(`/smartapartment/${ownerId}?force=1`);
            } catch {
                alert('Ошибка');
            }
        }
    }, []);

    const handleResetWiFi = useCallback(serialNumber => async () => {
        if (await confirm('Внимание!', `Вы действительно хотите сбросить Wi-Fi настройки?`)) {
            try {
                await resetWifiAPI(requestReset, { serialNumber });
            } catch (e) {
                alert('Ошибка');
            }
        }
    }, []);

    const handleResetDevice = useCallback(serialNumber => async () => {
        if (await confirm('Внимание!', `Вы действительно хотите перезагрузить устройство?`)) {
            try {
                await sendSignalAPI(requestReset, {
                    serialNumber,
                    signal: 'restart',
                    state: 1,
                });
            } catch {
                alert('Ошибка');
            }
        }
    }, []);

    useEffect(() => {
        if (error) {
            alert('Ошибка!', 'Не удалось удалить устройство');
        }
    }, [error])

    useEffect(() => {
        if (errorReset) {
            alert('Ошибка!');
        }
    }, [errorReset])

    if (loading || loadingReset) {
        return <LoaderPage style={{ zIndex: 10 }} />;
    }

    return (
        <Layout fixed isFullHeight>
            <Header
                onBackClick={() => {
                    const signalArr = originalData.signals.find(e => e.main);
                    const typeValue = signalArr?.control.type;
                    if (signalArr && (typeValue === "frame")) {
                        const event = new CustomEvent('redirect_to_native_screen', {
                            detail: JSON.stringify({
                                ownerId,
                                serialNumber,
                            }),
                        });
                        console.log(JSON.stringify({
                            ownerId,
                            serialNumber,
                        }))
                        document.dispatchEvent(event);
                        return;
                    }
                    history.push(`/smartapartment/${ownerId}/device/${serialNumber}`);
                }}
            >Редактирование устройства</Header>
            <Main style={{ marginTop: 42 }}>
                <DeviceForm
                    settings={metaData?.deviceEditBlock}
                    online={metaData.online}
                />
            </Main>
            <Main>
                <DeviceSettingsMenu settingsList={metaData?.settings}/>
                <ButtonBox>
                    {
                        metaData?.canRestart
                        && <Button wide onClick={handleResetDevice(metaData.serialNumber)}>
                            Перезагрузка устройства
                        </Button>
                    }
                    {metaData?.canResetWifi && (
                        <Button
                            wide
                            onClick={handleResetWiFi(metaData.serialNumber)}>
                            Сбросить WiFi настройки
                        </Button>
                    )}
                </ButtonBox>
            </Main>
            <ButtonWhite onClick={() => {
                handleDelete(metaData.serialNumber);
            }}>
                Удалить устройство
            </ButtonWhite>
        </Layout>
    )
};

export default DeviceEditModal;
