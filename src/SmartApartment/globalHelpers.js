import {
    isArray, transform, camelCase, isObject,
} from "lodash";
import moment from "moment";

export const allPostRequestsDecoratorAPI = (url) => async (request, model) => {
    const resp = await request.post(
        url,
        model,
    );
    if (!request.error && (!resp?.StatusCode || (resp?.StatusCode === 204))) return resp;
    throw resp;
};

export const camelize = obj => transform(obj, (acc, value, key, target) => {
    const camelKey = isArray(target) ? key : camelCase(key);

    acc[camelKey] = isObject(value) ? camelize(value) : value;
})

export const installMoment = () => {
    moment.updateLocale('ru', {
        monthsShort: [
            "янв", "фев", "мар", "апр", "май", "июн",
            "июл", "авг", "сен", "окт", "нов", "дек",
        ],
    });

    moment.locale('ru')
}
