import { allPostRequestsDecoratorAPI } from "../../globalHelpers";

export const getDeviceInfoAPI = allPostRequestsDecoratorAPI(
    '/api/api/IoTSmartFlat/GetSmartFlatDeviceInfo',
);

export const removeDeviceApi = allPostRequestsDecoratorAPI(
    '/api/api/IoTSmartFlat/RemoveDevice',
);

export const sendSignalAPI = allPostRequestsDecoratorAPI(
    '/api/api/IoTSmartFlat/SendSignal',
);

export const updateSignalName = allPostRequestsDecoratorAPI(
    '/api/api/IoTSmartFlat/UpdateSignalName',
);

export const updateDeviceName = allPostRequestsDecoratorAPI(
    '/api/api/IoTSmartFlat/UpdateDeviceName',
);

export const updateDeviceRoomAPI = allPostRequestsDecoratorAPI(
    '/api/api/IoTSmartFlat/UpdateSmartFlatDeviceRoom',
);

export const resetWifiAPI = allPostRequestsDecoratorAPI(
    '/api/api/IoTSmartFlat/ResetWifi',
);

export const getTriggerConnectionsAPI = allPostRequestsDecoratorAPI(
    '/api/api/IoTSmartFlat/GetTriggerConnections',
);

export const getSmartFlatMeasuresAPI = allPostRequestsDecoratorAPI(
    '/api/api/IoTSmartFlat/GetSmartFlatMeasures',
);

export const getSmartFlatArchiveUniversalAPI = allPostRequestsDecoratorAPI(
    '/api/api/IoTSmartFlat/GetSmartFlatArchiveUniversal',
);

export const getTriggerButtonListAPI = allPostRequestsDecoratorAPI(
    '/api/api/IoTSmartFlat/GetTriggerButtonsList',
);

export const addConnectionsTriggerAPI = allPostRequestsDecoratorAPI(
    '/api/api/IoTSmartFlat/AddConnectionsTrigger',
);

export const removeConnectionsTriggerAPI = allPostRequestsDecoratorAPI(
    '/api/api/IoTSmartFlat/RemoveConnectionsTrigger',
);

export const updateConnectionsTriggerAPI = allPostRequestsDecoratorAPI(
    '/api/api/IoTSmartFlat/UpdateConnectionsTrigger',
);

export const changeTimeTriggerAPI = allPostRequestsDecoratorAPI(
    '/api/api/IoTSmartFlat/ChangeTimeTrigger',
);
