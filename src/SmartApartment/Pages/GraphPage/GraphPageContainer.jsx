import { debounce, size } from "lodash";
import React, {
    useCallback, useEffect, useMemo, useState,
} from "react";
import { useParams } from "react-router";
import styled, { css } from "styled-components";
import { useFetch } from "use-http";
import SvgIcon from "../../Components/Common/SvgIcon";
import Header from "../../Components/Header";
import LayoutWhite from "../../Components/LayoutWhite";
import Main from "../../Components/Main";
import { getSmartFlatArchiveUniversalAPI } from "../DevicePage/api";
import GraphPage from "./GraphPage";
import {
    DATE_FILTER_COUNT,
    timeTabs, WEB_VIEW_DATE_DATE_TRANSFORMER, WEB_VIEW_DATE_FILTER_KEYS,
} from "./Constants";
import Layout from "../../Components/Layout";
import useDatePicker from "../../hooks/useDatePicker";

const GraphPageContainer = ({ name }) => {
    const {
        request,
        loading,
    } = useFetch({
        cachePolicy: "no-cache",
    });
    const {
        serialNumber,
        signalName,
    } = useParams();
    const [activeDateTab, setActiveDateTab] = useState(WEB_VIEW_DATE_FILTER_KEYS.day);
    const [data, setData] = useState([]);

    const [dateFrom,
        dateTo,
        onPrevDateClick,
        onNextDateClick] = useDatePicker(activeDateTab, WEB_VIEW_DATE_FILTER_KEYS);

    const currentDateInterval = useMemo(() => {
        if (activeDateTab === WEB_VIEW_DATE_FILTER_KEYS.day) {
            return dateFrom.format("DD MMMM YYYY");
        }
        const monthDifference = dateFrom.format(dateTo.format("MM")) - dateFrom.format("MM");
        return `${dateFrom.format(monthDifference > 0 ? "DD MMM" : "DD")}—${dateTo.format("DD MMM YYYY")}`;
    }, [dateFrom, dateTo, activeDateTab]);

    const debouncedFunc = useCallback(debounce((activeDateTab, dateFrom, dateTo) => {
        getSmartFlatArchiveUniversalAPI(request, {
            archive: signalName,
            signal: signalName,
            archiveCount: DATE_FILTER_COUNT[activeDateTab],
            showPoints: true,
            dateStart: dateFrom.unix(),
            dateEnd: dateTo.unix(),
            serialNumber,
            hideNull: true,
        })
            .then(data => {
                setData(data.data[0]);
            });
    }, 500), []);

    useEffect(() => {
        debouncedFunc(activeDateTab, dateFrom, dateTo);
    }, [activeDateTab, dateFrom, dateTo]);

    return (
        <Layout fixed isFullHeight>
            <Header>
                {name}
            </Header>
            <Main style={{ marginTop: 42 }}>
                <LayoutWhite>
                    <SelectButtonContainer>
                        {timeTabs.map(el => (
                            <SelectButton
                                key={el.id}
                                onClick={() => setActiveDateTab(el.id)}
                                active={el.id === activeDateTab}
                            >
                                {el.name}
                            </SelectButton>
                        ))}
                    </SelectButtonContainer>
                    <StyledGraphPageContainer>
                        {loading
                            ? "Загрузка..."
                            : !size(data.archive)
                                ? "Данные за выбранный период отсутствуют"
                                : (
                                    <GraphPage
                                        data={data}
                                        transformX={WEB_VIEW_DATE_DATE_TRANSFORMER[activeDateTab]}
                                    />
                                )}
                    </StyledGraphPageContainer>
                    <DatePickerContainer>
                        <DatePickerButton onClick={onPrevDateClick}>
                            <SvgIcon name="webview-back" width="14" height="12"/>
                        </DatePickerButton>
                        {currentDateInterval}
                        <DatePickerButton onClick={onNextDateClick} right>
                            <SvgIcon name="webview-back" width="14" height="12"/>
                        </DatePickerButton>
                    </DatePickerContainer>
                </LayoutWhite>
            </Main>
        </Layout>
    );
};

const StyledGraphPageContainer = styled.div`
  overflow: hidden;
`;

export const DatePickerContainer = styled.div`
  display: flex;
  height: 35px;
  margin: 30px auto 0;
  border: 1px solid #D9D9D9;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  max-width: 259px;
`;

export const DatePickerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  background: none;
  border: none;
  border-right: 1px solid #D9D9D9;
  color: black;
  font-weight: 500;
  height: 100%;
  width: 36px;

  ${props => props.right && css`
    transform: rotate(180deg);
  `}
`;

export const SelectButtonContainer = styled.div`
  align-self: center;
  display: flex;
  justify-content: center
`;

export const SelectButton = styled.div`
  font-size: 16px;
  min-width: 55px;
  cursor: pointer;
  font-weight: 500;
  margin: 16px 5px 10px;
  line-height: 1.5;
  text-align: center;
  padding: 8px;
  border-radius: 100px;
  align-self: center;
  background-color: #F0F2F4;
  color: #000;

  ${props => props.active && css`
    background-color: #283593;
    color: #fff;
  `}
`;

export default GraphPageContainer;
