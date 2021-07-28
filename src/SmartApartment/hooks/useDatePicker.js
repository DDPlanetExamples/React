import moment from "moment";
import { useCallback, useState } from "react";
import useEffectWithSkipDidMount from "./useEffectWithSkipDidMount";

const useDatePicker = (activeIntervalTab, timeIntervals) => {
    const now = moment().locale('ru');
    const initialDateTo = now;
    const [dateTo, setDateTo] = useState(initialDateTo);
    const [disabled, setDisabled] = useState(true)
    const getInitialDateFrom = useCallback(({ activeTab }) => {
        switch (activeTab) {
            case timeIntervals.day:
                return [moment(initialDateTo.startOf('day')), moment(initialDateTo.endOf('day'))];
            case timeIntervals.weak:
                return [moment(initialDateTo).isoWeekday(1), moment(initialDateTo)];
            case timeIntervals.month:
            default:
                return [moment(initialDateTo).startOf('month'), moment(initialDateTo)];
        }
    }, []);

    const [dateFrom, setDateFrom] = useState(getInitialDateFrom({ activeTab: activeIntervalTab })[0]);

    const getPrevDates = useCallback((activeTab, dateToLocal) => {
        setDisabled(false)
        switch (activeTab) {
            case timeIntervals.day:
                return [moment(dateToLocal).subtract(1, 'days'), moment(dateToLocal).subtract(1, 'days')];
            case timeIntervals.weak:
                return [moment(dateToLocal).subtract(7, 'days').isoWeekday(1), moment(dateToLocal).subtract(7, 'days').endOf('week')];
            case timeIntervals.month:
                return [moment(dateToLocal).subtract(1, 'months').startOf('month'), moment(dateToLocal).subtract(1, 'months').endOf('month')];
            default: return [moment(dateToLocal).subtract(1, 'days'), moment(dateToLocal).subtract(1, 'days')];
        }
    }, [activeIntervalTab]);

    // магические числа означают минимальную разницу между сегодняшней датой и той, которая в dateFrom
    const getDurationByStatusTab = useCallback((activeTab) => {
        switch (activeTab) {
            case timeIntervals.weak:
                return 7;
            case timeIntervals.month:
                return 31;
            case timeIntervals.day:
                return 1;
            default: return 1;
        }
    }, [])

    const getNextDates = useCallback((activeTab, dateFromLocal) => {
        const duration = moment.duration(now.diff(moment(dateTo)));
        if (Math.floor(duration.asDays()) < getDurationByStatusTab(activeTab)) {
            setDisabled(true);
            const [initialDateFromLocal, initialDateToLocal] = getInitialDateFrom({ activeTab });
            return [initialDateFromLocal, initialDateToLocal]
        }

        const futureWeek = moment(dateFromLocal).add(7, 'days').startOf('week');
        const futureWeekEnd = moment(futureWeek).endOf('week');

        const futureMonth = moment(dateFromLocal).add(1, 'months');
        const futureMonthEnd = moment(futureMonth).endOf('month');

        const futureDay = moment(dateFromLocal).add(1, 'days')

        switch (activeTab) {
            case timeIntervals.day:
                return [futureDay, futureDay];
            case timeIntervals.weak:
                return [futureWeek, futureWeekEnd];
            case timeIntervals.month:
                return [futureMonth, futureMonthEnd];
            default: return [futureDay, futureDay];
        }
    }, [dateFrom, activeIntervalTab, dateTo]);

    const onPrevDateClick = useCallback(() => {
        const [currentDateFrom, currentDateTo] = getPrevDates(activeIntervalTab, dateTo);
        setDateFrom(currentDateFrom);
        setDateTo(currentDateTo);
    }, [activeIntervalTab, dateTo]);

    const onNextDateClick = useCallback(() => {
        const [currentDateFrom, currentDateTo] = getNextDates(activeIntervalTab, dateFrom);
        setDateFrom(currentDateFrom);
        setDateTo(currentDateTo)
    }, [activeIntervalTab, dateFrom]);

    useEffectWithSkipDidMount(() => {
        const [currentDateFrom, setCurrentDateTO] = getInitialDateFrom({ activeTab: activeIntervalTab });
        setDateFrom(currentDateFrom);
        setDateTo(setCurrentDateTO);
    }, [activeIntervalTab]);

    return [dateFrom, dateTo, onPrevDateClick, onNextDateClick, disabled]
};

export default useDatePicker;
