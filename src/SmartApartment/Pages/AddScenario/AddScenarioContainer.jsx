import React, {
    useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useHistory, useParams } from "react-router";
import { useFetch } from "use-http";
import moment from 'moment';
import Header from "../../Components/Header";
import AddSceneSetting from "../SettingScenes/AddSceneSetting";
import { LayoutWhite } from "../../Components/Layout";
import SceneHeader from "../SettingScenes/SceneHeader";
import WebviewContext from "../../WebviewContext";
import SettingScene from "../SettingScenes/SettingScene";
import {
    createScenarioAPI, deleteScenarioAPI, updateScenarioAPI, updateScenarioSettingsAPI,
} from "./api";
import AddSceneSettingItemHTML from "../SettingScenes/AddSceneSettingItem";
import SvgIcon from "../../Components/Common/SvgIcon";
import WeekList from "../SettingScenes/WeekList";
import ButtonToggle from "../../Components/Common/ButtonToggle";
import { StyledSettingsListItem } from "../../Components/SettingsList/styled";
import SettingsListItemButton from "../../Components/SettingsList/SettingsListItemButton";

const AddScenarioContainer = ({ scenarios = [], reloadMainPage }) => {
    const { request, loading, error } = useFetch('');
    const { request: settingsRequest, error: settingsError } = useFetch('');
    const { ownerId, id } = useParams();
    const history = useHistory();
    const initialScenarioInfo = useMemo(() => scenarios
        .find(i => i.main.id === Number(id)), [scenarios, id]);
    const {
        setModal, alert, confirm, select,
    } = useContext(WebviewContext);
    const [scenarioInfo, setScenarioInfo] = useState(initialScenarioInfo);
    const sceneDevices = useMemo(() => (scenarioInfo?.main?.rooms || [])
        .reduce((acc, room) => [
            ...acc,
            ...(room?.devices || []),
        ], []), [scenarioInfo]);

    const createScenario = useCallback(async ({ title, svg, group = 1 }) => {
        try {
            const scenario = await (id ? updateScenarioAPI : createScenarioAPI)(request, {
                id,
                [id ? "title" : "name"]: title,
                img: svg,
                group,
            });
            setModal(null);
            await reloadMainPage();
            if (!id) {
                history.push(`/smartapartment/${ownerId}/new_scenario/${scenario?.data?.id}`);
            }
        } catch {
            alert('Ошибка', 'Не удалось сохранить данные');
        }
    }, [setScenarioInfo, scenarioInfo, request, id]);

    const handleEditClick = useCallback(async () => {
        setModal(<SettingScene
            initialTitle={(scenarioInfo?.main?.title || 'Новый сценарий')}
            initialSvg={(scenarioInfo?.main?.svg || 'day')}
            onClose={() => setModal(null)}
            onSave={createScenario}
        />);
    }, [scenarioInfo, createScenario]);

    const handleDeleteScenario = useCallback(async (scenarioId) => {
        if (await confirm('Внимание', 'Вы действительно хотите удалить сценарий?')) {
            try {
                await deleteScenarioAPI(request, { scenarioId });
                await reloadMainPage();
                history.push(`/smartapartment/${ownerId}/scenarios`);
            } catch {
                alert('Ошибка', 'Не удалось удалить сценарий')
            }
        }
    }, []);

    const handleSendSettings = useCallback(async (model) => {
        try {
            await updateScenarioSettingsAPI(settingsRequest, model);
        } catch {
            alert('Ошибка', 'Не удалось изменить настройки')
        }
    }, []);

    useEffect(() => {
        setScenarioInfo(initialScenarioInfo);
    }, [initialScenarioInfo, id]);

    useEffect(() => {
        if (error) {
            alert('Непредусмотренная ошибка');
        }
    }, [error]);

    useEffect(() => {
        if (settingsError) {
            alert('Ошибка.', 'Не удалось применить настройку');
        }
    }, [settingsError]);

    if (initialScenarioInfo || id) {
        return <LayoutWhite>
            <Header onBackClick={() => history.push(`/smartapartment/${ownerId}/scenarios`)}
                settingsIcon={(id === '1' || id === '2')
                    ? <></> : <SvgIcon
                        name="webview-basket"
                        width="20"
                        height="20"
                        fill="#c62828"/>}
                onSettingsClick={() => {
                    if (id === '1' || id === '2') return;
                    handleDeleteScenario(id);
                }}
            >
                Сценарий
            </Header>
            <>
                <SceneHeader
                    title={(scenarioInfo?.main?.title || 'Новый сценарий')}
                    svgName={(scenarioInfo?.main?.img || 'day')}
                    onEditClick={handleEditClick}
                />
                {
                    (id !== '1' && id !== '2')
                    && <div style={{ padding: '0 16px' }}>
                        <StyledSettingsListItem>
                            <div className="settings-list__content">
                                <div className="settings-list__title">
                                    Родительский сценарий
                                </div>
                                <div className="settings-list__desc">
                                    {scenarios.find(i => `${i.main.id}` === `${scenarioInfo?.main?.parent}`)?.main?.title}
                                </div>
                            </div>
                            <SettingsListItemButton onClick={async () => {
                                const group = await select({
                                    list: scenarios.filter(i => !i.main?.parent)
                                        .map(i => ({
                                            title: i.main.title,
                                            id: i.main.id,
                                        })),
                                    initialSelectedId: scenarioInfo?.main?.parent,
                                    title: 'Родительский сценарий',
                                });
                                await createScenario({
                                    title: scenarioInfo.main?.title,
                                    svg: scenarioInfo?.main?.img,
                                    group,
                                });
                                setScenarioInfo({
                                    ...scenarioInfo,
                                    main: {
                                        ...scenarioInfo.main,
                                        parent: group,
                                    },
                                });
                            }} readOnly={false} type='edit'/>
                        </StyledSettingsListItem>
                    </div>
                }
                <div style={{ padding: '0 16px' }}>
                    <StyledSettingsListItem>
                        <div className="settings-list__content">
                            <div className="settings-list__desc">
                                Автоматическая активация сценария
                            </div>
                        </div>
                        <ButtonToggle onChange={async (e) => {
                            const value = Number(e.target.checked);
                            await handleSendSettings({
                                scenario: scenarioInfo?.main?.id,
                                schedule: scenarioInfo?.main?.id,
                                enabled: value,
                                start: scenarioInfo?.schedule?.start,
                                days: `${scenarioInfo?.schedule?.days}`,
                            })
                            setScenarioInfo({
                                ...scenarioInfo,
                                schedule: {
                                    ...scenarioInfo.schedule,
                                    enabled: value,
                                },
                            });
                        }} checked={!!scenarioInfo?.schedule?.enabled} id="activation" />
                    </StyledSettingsListItem>
                    {
                        !!scenarioInfo?.schedule?.enabled
                            && <>
                                <WeekList
                                    onWeekChange={async (weekArray) => {
                                        await handleSendSettings({
                                            scenario: scenarioInfo?.main?.id,
                                            schedule: scenarioInfo?.main?.id,
                                            enabled: scenarioInfo?.schedule?.enabled,
                                            start: scenarioInfo?.schedule?.start,
                                            days: `${weekArray}`,
                                        })
                                        setScenarioInfo({
                                            ...scenarioInfo,
                                            schedule: {
                                                ...scenarioInfo.schedule,
                                                days: weekArray,
                                            },
                                        });
                                    }}
                                    initialValues={scenarioInfo?.schedule?.days || []}
                                />
                                <StyledSettingsListItem>
                                    <div className="settings-list__content">
                                        <div className="settings-list__title">
                                            Время активации
                                        </div>
                                        <div className="settings-list__desc">
                                            <span>
                                                {
                                                    moment(
                                                        +moment().startOf('day')
                                                        + scenarioInfo?.schedule?.start * 1000,
                                                    ).format('HH:mm')
                                                }
                                            </span>
                                            <input
                                                style={{
                                                    width: 0, height: 0, fontSize: 0, position: 'absolute', zIndex: -1,
                                                }}
                                                type="time"
                                                id='kek'
                                                value={moment(
                                                    +moment().startOf('day')
                                                    + scenarioInfo?.schedule?.start * 1000,
                                                ).format('HH:mm')}
                                                onChange={async (e) => {
                                                    const selectedHours = moment(e.target.value, 'HH:mm');
                                                    const delta = moment.duration(selectedHours)
                                                        .subtract(moment().startOf('day')).asSeconds();
                                                    setScenarioInfo({
                                                        ...scenarioInfo,
                                                        schedule: {
                                                            ...scenarioInfo.schedule,
                                                            start: delta,
                                                        },
                                                    });
                                                    await handleSendSettings({
                                                        scenario: scenarioInfo?.main?.id,
                                                        schedule: scenarioInfo?.main?.id,
                                                        enabled: scenarioInfo?.schedule?.enabled,
                                                        start: delta,
                                                        days: `${scenarioInfo?.schedule?.days}`,
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <SettingsListItemButton readOnly={false} type='edit' as='label' htmlFor='kek' />
                                </StyledSettingsListItem>
                            </>
                    }
                </div>
                <AddSceneSetting title='Устройства'>
                    {
                        sceneDevices.map(item => <AddSceneSettingItemHTML
                            key={item.path}
                            item={item}
                            onSignalChange={async (i, enabled) => {
                                const search = new URLSearchParams(i.path);
                                await updateScenarioSettingsAPI(settingsRequest, {
                                    scenario: scenarioInfo?.main?.id,
                                    signal: search.get('signal'),
                                    enabled,
                                    value: ((scenarioInfo?.main?.rooms || [])
                                        .find(rm => `${rm.id}` === search.get('room'))
                                        .devices || []).find(dev => dev.path === i.path)?.value,
                                });
                                setScenarioInfo({
                                    ...scenarioInfo,
                                    main: {
                                        ...scenarioInfo?.main,
                                        rooms: (scenarioInfo?.main?.rooms || []).map(rm => {
                                            if (`${rm.id}` === search.get('room')) {
                                                return {
                                                    ...rm,
                                                    devices: (rm.devices || []).map(dev => {
                                                        if (dev.path === i.path) {
                                                            return {
                                                                ...dev,
                                                                enabled,
                                                            };
                                                        }
                                                        return dev;
                                                    }),
                                                };
                                            }
                                            return rm;
                                        }),
                                    },
                                });
                            }}
                            onValueChange={async (i, value) => {
                                const search = new URLSearchParams(i.path);
                                await updateScenarioSettingsAPI(settingsRequest, {
                                    scenario: scenarioInfo?.main?.id,
                                    signal: search.get('signal'),
                                    value,
                                    enabled: ((scenarioInfo?.main?.rooms || [])
                                        .find(rm => `${rm.id}` === search.get('room'))
                                        .devices || []).find(dev => dev.path === i.path)?.enabled,
                                });
                                setScenarioInfo({
                                    ...scenarioInfo,
                                    main: {
                                        ...scenarioInfo?.main,
                                        rooms: (scenarioInfo?.main?.rooms || []).map(rm => {
                                            if (`${rm.id}` === search.get('room')) {
                                                return {
                                                    ...rm,
                                                    devices: (rm.devices || []).map(dev => {
                                                        if (dev.path === i.path) {
                                                            return {
                                                                ...dev,
                                                                value,
                                                            };
                                                        }
                                                        return dev;
                                                    }),
                                                };
                                            }
                                            return rm;
                                        }),
                                    },
                                });
                            }}
                        />)
                    }
                </AddSceneSetting>
            </>
        </LayoutWhite>
    }
    return <SettingScene
        initialTitle={'Новый сценарий'}
        initialSvg={'day'}
        onClose={() => history.push(`/smartapartment/${ownerId}/scenarios`)}
        onSave={createScenario}
        loading={loading}
    />
};

export default AddScenarioContainer;
