import moment from "moment";
import {
    useCallback,
    useContext, useMemo, useState,
} from "react";
import { useHistory, useParams } from "react-router";
import { useFetch } from "use-http";
import {
    map, toNumber, toString, debounce,
} from 'lodash'
import WebviewContext from "../../../WebviewContext";
import { changeTimeTriggerAPI, sendSignalAPI, updateDeviceRoomAPI } from "../api";
import { DEVICE_CONTROL_ALL_TYPES } from "../DEVICE_CONSTANTS";
import useRoomSelector from "./useRoomSelector";
import useButtonSelector from "./useButtonSelector";

export default (item) => {
    const [settingsItem, setSettingsItem] = useState(item)
    const { request, loading } = useFetch({
        cachePolicy: 'no-cache',
    })
    const { push } = useHistory()
    const { ownerId } = useParams()
    const {
        input, select, selectMany, alert,
    } = useContext(WebviewContext)
    const selectRoom = useRoomSelector()
    const buttonSelector = useButtonSelector(item.id)

    const {
        value, serialNumber, name, title, list,
    } = settingsItem

    const callErrorAlert = () => alert('Ошибка', 'При изменении сигнала произошла ошибка')

    const handleChange = async (apiFunc, key, prev, next) => {
        setSettingsItem(i => ({ ...i, [key]: next }))
        try {
            await apiFunc()
        } catch {
            setSettingsItem(i => ({ ...i, [key]: prev }))
            callErrorAlert()
        }
    }

    const debouncedFunc = useCallback(debounce(async (apiFunc, prevValue, onError) => {
        try {
            await apiFunc()
        } catch {
            onError(prevValue)
            callErrorAlert()
        }
    }, 300), [])

    const onChange = useMemo(() => {
        switch (item.type) {
            case DEVICE_CONTROL_ALL_TYPES.TOGGLE: {
                return async (e) => {
                    const newValue = e.target.checked ? '1' : '0';
                    setSettingsItem(i => ({ ...i, value: newValue }))

                    handleChange(async () => await sendSignalAPI(request, {
                        serialNumber,
                        state: newValue,
                        signal: name,
                    }), 'value', value, newValue)
                }
            }
            case DEVICE_CONTROL_ALL_TYPES.ACTION_TIME: {
                return async (e) => {
                    const newValue = e.target.checked ? '1' : '0';
                    setSettingsItem(i => ({ ...i, value: newValue }))

                    handleChange(async () => await changeTimeTriggerAPI(request, {
                        fullUrl: `${item.control?.params[0]?.action?.url}&enabled=${newValue}`,
                    }), 'value', value, newValue)
                }
            }

            case DEVICE_CONTROL_ALL_TYPES.ACTION_SUN: {
                return async (e) => {
                    const newValue = e.target.checked ? '1' : '0';
                    setSettingsItem(i => ({ ...i, value: newValue }))

                    handleChange(async () => await changeTimeTriggerAPI(request, {
                        fullUrl: `${item.control?.params[1]?.action?.url}&enabled=${newValue}`,
                    }), 'value', value, newValue)
                }
            }

            case DEVICE_CONTROL_ALL_TYPES.COUNTER: {
                return async (e) => {
                    const newValue = e.target.value;
                    setSettingsItem(i => ({ ...i, value: newValue }))
                    debouncedFunc(async () => await sendSignalAPI(request, {
                        serialnumber: serialNumber,
                        state: newValue,
                        signal: name,
                    }), value, prevValue => setSettingsItem(i => ({ ...i, value: prevValue })))
                }
            }

            case DEVICE_CONTROL_ALL_TYPES.TEXT: {
                return async () => {
                    const newValue = await input({
                        inputTitle: `Введите значение`,
                        placeholder: '',
                        title: 'Новое значение',
                        initialValue: value,
                    });

                    handleChange(async () => await sendSignalAPI(request, {
                        serialnumber: serialNumber,
                        state: newValue,
                        signal: name,
                    }), 'value', value, newValue)
                }
            }

            case DEVICE_CONTROL_ALL_TYPES.LIST: {
                return async () => {
                    const newValue = await select({
                        title,
                        list,
                        initialSelectedId: value,
                    });

                    handleChange(async () => await sendSignalAPI(request, {
                        serialNumber,
                        state: newValue,
                        signal: name,
                    }), 'value', value, newValue)
                }
            }

            case DEVICE_CONTROL_ALL_TYPES.COMBOLIST: {
                const parsedValue = value ? map(JSON.parse(value), toString) : []
                return async () => {
                    const newValue = await selectMany({
                        title,
                        list,
                        initialSelectedId: parsedValue,
                    });

                    const jsonValue = JSON.stringify(map(newValue, toNumber))

                    handleChange(async () => await sendSignalAPI(request, {
                        serialNumber,
                        state: jsonValue,
                        signal: name,
                    }), 'value', value, jsonValue)
                }
            }

            case DEVICE_CONTROL_ALL_TYPES.ROOM: {
                return async () => {
                    const newValue = await selectRoom({
                        initialSelectedId: `${value}`,
                    });
                    if (newValue) {
                        setSettingsItem(i => ({ ...i, title: newValue.title, value: newValue.id }))

                        await updateDeviceRoomAPI(request, {
                            serialNumber,
                            room: newValue.id,
                        })
                    }
                }
            }

            case DEVICE_CONTROL_ALL_TYPES.JALOUSIE_MAIN: {
                return async (url) => {
                    await sendSignalAPI(request, {
                        fullUrl: url,
                    })
                }
            }

            case DEVICE_CONTROL_ALL_TYPES.TIME: {
                return async e => {
                    const newValue = moment.duration(e.target.value).asSeconds()
                    if (e.type === 'change') {
                        setSettingsItem(i => ({ ...i, value: newValue }))
                        handleChange(async () => await sendSignalAPI(request, {
                            serialNumber,
                            state: `${newValue}`,
                            signal: name,
                        }), 'value', value, newValue)
                    }
                }
            }

            default: {
                return () => null
            }
        }
    }, [value])

    const handleChangeName = useMemo(() => {
        switch (item.type) {
            default:
                return (key) => async () => {
                    const ModalTitle = item.type === DEVICE_CONTROL_ALL_TYPES.CUSTOM ? 'Название устройства' : 'Название сигнала'

                    const newValue = await input({
                        inputTitle: `Введите название`,
                        placeholder: '',
                        title: ModalTitle,
                        initialValue: title,
                    });

                    setSettingsItem(i => ({ ...i, [key]: newValue }))

                    await item.updateNameApi({
                        serialNumber,
                        title: newValue,
                        signalName: name,
                    })
                }
        }
    }, [value, title, value, setSettingsItem])

    const handleParamsChange = useMemo(() => {
        switch (item.type) {
            case DEVICE_CONTROL_ALL_TYPES.ACTION_TIME: {
                return async e => {
                    if (e.type === 'change') {
                        const newValue = e.target.value
                        setSettingsItem(i => ({
                            ...i,
                            control: {
                                ...i.control,
                                params: map(i.control.params, p => ({ ...p, value: newValue })),
                            },
                        }))
                        await changeTimeTriggerAPI(request, {
                            fullUrl: `${item.control?.params[0]?.action?.url}&value=${newValue}`,
                        })
                    }
                }
            }
            case DEVICE_CONTROL_ALL_TYPES.ACTION_SUN: {
                return async e => {
                    const newValue = e.target.value;
                    const currentValue = settingsItem.control.params[0].value
                    const { url } = settingsItem.control.params[0].action

                    const updateFunction = (nextValue) => i => {
                        const [marginParam, ...rest] = i.control.params

                        return ({
                            ...i,
                            control: {
                                ...i.control,
                                params: [
                                    { ...marginParam, value: nextValue },
                                    ...rest,
                                ],
                            },
                        });
                    }

                    debouncedFunc(
                        async () => await sendSignalAPI(request, {
                            fullUrl: `${url}&value=${newValue}&`,
                        }),
                        currentValue,
                        prevValue => setSettingsItem(updateFunction(prevValue)),
                    )

                    setSettingsItem(updateFunction(newValue))
                }
            }

            default:
                return () => {}
        }
    }, [settingsItem])

    const goToGraph = useMemo(() => () => push(`/smartapartment/${ownerId}/device/${serialNumber}/graph/${name}`), [])

    return [
        settingsItem,
        onChange,
        handleChangeName,
        handleParamsChange,
        buttonSelector,
        goToGraph,
        loading,
    ]
}
