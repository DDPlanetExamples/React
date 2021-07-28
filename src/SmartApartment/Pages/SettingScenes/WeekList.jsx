import React, { useCallback, useEffect, useState } from 'react';
import styled from "styled-components";
import CheckboxCustom from '../../Components/Common/CheckboxCustom';

const week = [{ Пн: 0 }, { Вт: 0 }, { Ср: 0 }, { Чт: 0 }, { Пт: 0 }, { Сб: 0 }, { Вс: 0 }]

const WeekListHTML = ({
    onWeekChange = () => {
    },
    initialValues = [],
}) => {
    const [weekDays, setWeekDays] = useState([]);

    const handleChange = useCallback((key) => (e) => {
        const newState = weekDays.map(i => {
            const k = Object.keys(i)[0];
            if (k === key) {
                return {
                    [k]: Number(e.target.checked),
                }
            }
            return i;
        })
        setWeekDays(newState);
        onWeekChange(newState.map(i => Object.values(i)[0]));
    }, [onWeekChange, weekDays, initialValues]);

    useEffect(() => {
        if (initialValues.length) {
            setWeekDays(week.map((item, index) => ({
                [Object.keys(item)[0]]: initialValues[index] || 0,
            })));
        }
    }, [initialValues]);
    return <WeekList>
        {
            weekDays.map((item) => Object.entries(item).map(([key, value]) => <CheckboxCustom
                key={key} id={key} title={key} checked={value}
                onChange={handleChange(key)}
            />)[0])
        }
    </WeekList>;
}

const WeekList = styled.div`
    display: flex;
    justify-content: space-between;
    overflow-x: auto; 
    &::-webkit-scrollbar {
        display: none;
    }
`;

export default WeekListHTML
