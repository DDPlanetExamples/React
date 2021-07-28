import React, {
    useCallback, useContext, useEffect, useState,
} from 'react';
import { useFetch } from "use-http";
import { Switch, useHistory, useParams } from "react-router";
import { Route } from "react-router-dom";
import { LayoutWhite } from '../../Components/Layout';
import Note from '../../Components/Note';
import { getDeviceTypesAPI, getSmartFlatDeviceAPI } from "./api";
import LoaderPage from "../LoaderPage";
import WebviewContext from "../../WebviewContext";
import StubApartmentHTML from "../../Components/StubSmartApartment";
import { MAIN_ROUTE } from "../../Constants/ROUTING_CONSTANTS";
import AddDeviceStep from "./AddDeviceStep";
import AddDeviceForm from "./AddDeviceForm";

const AddDeviceContainer = () => {
    const { request, loading, error } = useFetch('');
    const { input, alert } = useContext(WebviewContext);
    const { ownerId } = useParams();
    const history = useHistory();
    const [types, setTypes] = useState([]);
    const [stepTwoModel, setStepTwoModel] = useState([]);
    const [currentNextStep, setCurrentNextStep] = useState();
    const [currentDevice, setCurrentDevice] = useState(null);
    const getTypes = useCallback(async () => {
        try {
            const resp = await getDeviceTypesAPI(request);
            setTypes(resp?.data?.types);
        } catch (e) {
            console.log(e);
        }
    }, [request]);

    const onTypeClick = useCallback(async (item) => {
        const model = {
            nextStepUrl: item.instruction.nextStep,
        };
        if (item.instruction.type === 'qr') {
            setCurrentNextStep(item.instruction.nextStep);
            setCurrentDevice({
                title: 'Ваше устройство',
                serial: await input({
                    inputTitle: item.instruction.edit.h2,
                    note: () => <Note
                        text={item.instruction.edit.h1}
                        type='info'/>,
                    placeholder: item.instruction.edit.placeholder,
                    title: 'Новое устройство',
                }),
            });
            history.push(`/smartapartment/${ownerId}/add_device/form`);
            return;
        }
        try {
            const resp = await getSmartFlatDeviceAPI(request, model)
            if (!resp?.StatusCode) {
                setStepTwoModel(resp?.data);
                setCurrentNextStep(resp?.data?.nextStep);
                history.push(`/smartapartment/${ownerId}/add_device/2`);
            }
        } catch {
            alert('Ошибка', 'Не удалось добавить устройство.');
        }
    }, []);

    const onDeviceClick = useCallback(async (device) => {
        try {
            setCurrentDevice(device);
            history.push(`/smartapartment/${ownerId}/add_device/form`);
        } catch {
            alert('Ошибка', 'Не удалось добавить устройство.');
        }
    }, []);

    const handleSubmit = useCallback(async (data) => {
        try {
            const model = {
                ...data,
                nextStepUrl: currentNextStep,
            }
            const resp = await getSmartFlatDeviceAPI(request, model);
            console.log(resp.data?.serialNumber);
            history.push(`/smartapartment/${ownerId}`);
        } catch {
            alert('Ошибка', 'Не удалось добавить устройство.');
        }
    }, [currentNextStep]);

    useEffect(() => {
        getTypes();
    }, []);

    if (loading) {
        return <LoaderPage />;
    }

    return <LayoutWhite fixed>
        {
            !error
                ? <Switch>
                    <Route exact path={`${MAIN_ROUTE}/add_device`}>
                        <AddDeviceStep
                            alertText="Убедитесь, что устройство подключено к интернету или домашней сети"
                            types={types}
                            onTypeClick={onTypeClick}
                        />
                    </Route>
                    <Route exact path={`${MAIN_ROUTE}/add_device/form`}>
                        <AddDeviceForm
                            initialValue={currentDevice}
                            onSubmit={handleSubmit}
                        />
                    </Route>
                    <Route path={`${MAIN_ROUTE}/add_device/:step`}>
                        <AddDeviceStep
                            types={stepTwoModel?.devices}
                            onTypeClick={onDeviceClick}
                        />
                    </Route>
                </Switch>
                : <StubApartmentHTML
                    title=''
                    subtitle='Ошибка при запросе типов устройств.'
                />
        }

    </LayoutWhite>;
}

export default AddDeviceContainer
