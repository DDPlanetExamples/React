import moment from 'moment'

export const WEB_VIEW_DATE_FILTER_KEYS = {
    day: 1,
    weak: 2,
    month: 3,
};

export const DATE_FILTER_COUNT = {
    [WEB_VIEW_DATE_FILTER_KEYS.day]: '1000',
    [WEB_VIEW_DATE_FILTER_KEYS.weak]: '1000',
    [WEB_VIEW_DATE_FILTER_KEYS.month]: '1000',
}

export const WEB_VIEW_DATE_FILTER_VALUES = {
    [WEB_VIEW_DATE_FILTER_KEYS.day]: 'Дни',
    [WEB_VIEW_DATE_FILTER_KEYS.weak]: 'Недели',
    [WEB_VIEW_DATE_FILTER_KEYS.month]: 'Месяцы',
}

export const WEB_VIEW_DATE_DATE_TRANSFORMER = {
    [WEB_VIEW_DATE_FILTER_KEYS.day]: date => moment.unix(date).format('HH:mm'),
    [WEB_VIEW_DATE_FILTER_KEYS.weak]: date => moment.unix(date).format('dddd'),
    [WEB_VIEW_DATE_FILTER_KEYS.month]: date => moment.unix(date).date(),
}

export const timeTabs = [
    {
        name: WEB_VIEW_DATE_FILTER_VALUES[WEB_VIEW_DATE_FILTER_KEYS.day],
        id: WEB_VIEW_DATE_FILTER_KEYS.day,
    },
    {
        id: WEB_VIEW_DATE_FILTER_KEYS.weak,
        name: WEB_VIEW_DATE_FILTER_VALUES[WEB_VIEW_DATE_FILTER_KEYS.weak],
    },
    {
        id: WEB_VIEW_DATE_FILTER_KEYS.month,
        name: WEB_VIEW_DATE_FILTER_VALUES[WEB_VIEW_DATE_FILTER_KEYS.month],
    },
];
