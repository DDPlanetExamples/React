const DEVICE_CONTROL_SYSTEM_TYPES = {
    TEXT: 'text',
    COUNTER: 'counter',
    TOGGLE: 'toggle',
    SWITCH: 'switch',
    LIST: 'list',
    COMBOLIST: 'combolist',
    JALOUSIE_MAIN: 'jalousie_main',
    ACTION_TIME: 'action_time',
    TIME: 'time',
    ACTION_SUN: 'action_sun',
    UNIREMOTE: 'uniremote',
}

const DEVICE_CONTROL_CUSTOM_TYPES = {
    CUSTOM: 'custom',
    ROOM: 'room',
}

export const DEVICE_CONTROL_ALL_TYPES = {
    ...DEVICE_CONTROL_SYSTEM_TYPES,
    ...DEVICE_CONTROL_CUSTOM_TYPES,
}

export const WIFI_SIGNAL_LEVELS = {
    FULL: 4,
    LEVEL_3: 3,
    LEVEL_2: 2,
    LEVEL_1: 1,
    NO: 0,
}
