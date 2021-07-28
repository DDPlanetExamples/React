import { allPostRequestsDecoratorAPI } from "../../globalHelpers";

export const getMainPageAPI = allPostRequestsDecoratorAPI('/api/api/IoTSmartFlat/GetSmartFlatHome');
export const getRoomsAPI = allPostRequestsDecoratorAPI('/api/api/IoTSmartFlat/GetSmartFlatRooms');
export const deleteRoomAPI = allPostRequestsDecoratorAPI('/api/api/IoTSmartFlat/DeleteSmartFlatRoom');
export const updateRoomAPI = allPostRequestsDecoratorAPI('/api/api/IoTSmartFlat/UpdateSmartFlatRoom');

export const activateScenarioAPI = allPostRequestsDecoratorAPI('/api/api/IoTSmartFlat/ActivateSmartFlatScenario');
