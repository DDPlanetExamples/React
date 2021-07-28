import { allPostRequestsDecoratorAPI } from "../../../globalHelpers";

export const createScenarioAPI = allPostRequestsDecoratorAPI('/api/api/IoTSmartFlat/CreateSmartFlatScenario');
export const updateScenarioAPI = allPostRequestsDecoratorAPI('/api/api/IoTSmartFlat/UpdateSmartFlatScenario');
export const deleteScenarioAPI = allPostRequestsDecoratorAPI('/api/api/IoTSmartFlat/DeleteSmartFlatScenario');

export const updateScenarioSettingsAPI = allPostRequestsDecoratorAPI(
    '/api/api/IoTSmartFlat/UpdateSmartFlatScenarioSettings',
);
