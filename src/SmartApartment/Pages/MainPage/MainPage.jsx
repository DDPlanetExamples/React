import React, {
    useCallback, useContext, useEffect, useState,
} from 'react';
import { useFetch } from "use-http";
import {
    Switch, useHistory, useParams,
} from "react-router";
import { Route } from "react-router-dom";
import Layout from '../../Components/Layout';
import Devices from './Devices/Devices';
import Scenes from './Scenes';
import { Stub } from "../Stub";
import { getMainPageAPI, getRoomsAPI } from "./api";
import WebviewContext from "../../WebviewContext";
import ScenarioList from "../AddScenario/ScenarioList";
import AddScenarioContainer from "../AddScenario/AddScenarioContainer";
import LoaderWrap from "../../Components/LoaderWrap";

const MainPage = () => {
    //const [force] = useState(new URLSearchParams(useLocation()?.search).get('force'));
    const {
        request: mainRequest,
        loading,
        error,
    } = useFetch('', options => ({
        ...options,
        cachePolicy: 'no-cache',
    }));
    const {
        request: subRequest,
    } = useFetch('', options => ({
        ...options,
        cachePolicy: 'no-cache',
    }));
    const { ownerId } = useParams();
    const history = useHistory();
    const { alert } = useContext(WebviewContext);
    const [scenarios, setScenarios] = useState([]);
    const [availableRooms, setAvailableRooms] = useState([]);
    const [devices, setDevices] = useState([]);
    const [activeRoom, setActiveRoom] = useState();

    const getMainPage = useCallback(async (req1, req2) => {
        const mainResp = await getMainPageAPI(req1, {
            scenario: true,
            groupScenario: true,
            notification: false,
        });
        setScenarios([...(mainResp.data?.scenario?.block
            .sort((a, b) => Number(b.main.id) - Number(a.main.id)) || [])]);
        setDevices(mainResp.data?.devices[0]?.data || []);
        const roomResp = await getRoomsAPI(req2);
        setAvailableRooms(roomResp?.data?.rooms);
    }, []);

    const reloadMainPage = useCallback(async () => {
        try {
            await getMainPage(mainRequest, subRequest);
        } catch {
            alert('Ошибка');
        }
    }, [mainRequest, subRequest]);

    useEffect(() => {
        reloadMainPage();
    }, []);

    useEffect(() => {
        setAvailableRooms(availableRooms.map(i => {
            if (i.id === activeRoom?.id) {
                return {
                    ...i,
                    enabled: 1,
                }
            }
            return {
                ...i,
                enabled: 0,
            }
        }));
    }, [activeRoom]);

    // if (loading) {
    //     return <LoaderPage />;
    // }
    if (error) {
        return <Stub />;
    }
    return <Switch>
        <Route exact path={`/smartapartment/:ownerId/scenarios`}>
            { loading && <LoaderWrap /> }
            <ScenarioList
                onBack={() => history.push(`/smartapartment/${ownerId}`)}
                scenarios={scenarios}
                onScenarioClick={(id) => history.push(`/smartapartment/${ownerId}/new_scenario/${id}`)}
                onAddScenarioClick={() => history.push(`/smartapartment/${ownerId}/new_scenario`)}
            />
        </Route>
        <Route path={`/smartapartment/:ownerId/new_scenario/:id?`}>
            { loading && <LoaderWrap /> }
            <AddScenarioContainer
                scenarios={scenarios}
                reloadMainPage={reloadMainPage}
            />
        </Route>
        <Route>
            <Layout>
                { loading && <LoaderWrap /> }
                {!!scenarios.length && <Scenes
                    scenarios={scenarios}
                    setScenarios={setScenarios}
                    setAvailableRooms={setAvailableRooms}
                    reloadMainPage={reloadMainPage}
                    request={mainRequest}
                />}
                {!!devices.length && <Devices
                    activeRoom={activeRoom}
                    setActiveRoom={setActiveRoom}
                    availableRooms={availableRooms}
                    setAvailableRooms={setAvailableRooms}
                    devices={devices}
                    setDevices={setDevices}
                />}
            </Layout>
        </Route>
    </Switch>
}

export default MainPage
