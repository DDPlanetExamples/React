import ButtonToggle from "../../Components/Common/ButtonToggle";
import Indicator from "../../Components/Indicator";
import { updateSignalName } from "./api";
import { WIFI_SIGNAL_LEVELS } from "./DEVICE_CONSTANTS";

export const getDeviceComponentByType = (type) => {
    switch (type) {
        case 'switch':
            return ButtonToggle;
        case 'numerical':
            return Indicator;
        default:
            return () => null;
    }
}

export const getDeviceOnControlClickByType = (type) => {
    switch (type) {
        case 'switch':
            return (setState, item, value) => {
                setState(devices => devices.map(i => {
                    if ((i.id === item.id)
                        && (i.signal === item.signal)) {
                        return {
                            ...i,
                            controls: i.controls.map(c => ({
                                ...c,
                                value,
                            })),
                        }
                    }
                    return i;
                }));
            };
        case 'numerical':
            return () => {};
        default:
            return () => {};
    }
}

export const getAdditionalControlView = (ac) => {
    switch (ac.type) {
        case 'term':
        case 'term-sex':
            return `${ac.value}°`;
        case 'hum':
            return `${ac.value}%`;
        default:
            return ac.value;
    }
}

export const mapToSettings = (settingsItem, meta, request) => ({
    label: settingsItem.label.title,
    title: settingsItem.label.title,
    value: settingsItem.state.value,
    readOnly: settingsItem.state.readonly,
    readOnlyLabel: settingsItem.label.readonly,
    name: settingsItem.name,
    serialNumber: meta.serialnumber,
    measure: settingsItem.state.measure,
    id: settingsItem.id,
    type: settingsItem.control.type,
    control: settingsItem.control,
    updateNameApi: async (model) => await updateSignalName(request, model),
    list: settingsItem.list,
    canAdjustButton: !!settingsItem.showCb,
    hasGraph: !!settingsItem.control.graph,
})

export const getWifiLevel = (signal) => {
    const value = +signal?.state?.value
    if (value > 75) return WIFI_SIGNAL_LEVELS.FULL
    if (value > 50) return WIFI_SIGNAL_LEVELS.LEVEL_3
    if (value > 25) return WIFI_SIGNAL_LEVELS.LEVEL_2
    if (value > 0) return WIFI_SIGNAL_LEVELS.LEVEL_1

    return WIFI_SIGNAL_LEVELS.NO
}
