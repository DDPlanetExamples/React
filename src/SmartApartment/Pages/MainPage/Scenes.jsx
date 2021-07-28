import React, {
    useCallback, useContext, useEffect, useState,
} from 'react';
import styled from "styled-components";
import { useHistory, useParams } from "react-router";
import ButtonIcon from '../../Components/Common/ButtonIcon';
import SvgIcon from '../../Components/Common/SvgIcon';
import RadioGroup from "../../Components/Radio/RadioGroup";
import ScenesListItem from '../../Components/ScenesListItem';
import { activateScenarioAPI } from "./api";
import WebviewContext from "../../WebviewContext";

const onActiveScenarioMapper = (item) => i => {
    if (i.main.id === item.main.id) {
        return {
            ...i,
            main: {
                ...i.main,
                active: 1,
            },
        }
    }
    return {
        ...i,
        main: {
            ...i.main,
            active: 0,
        },
    };
};

const ScenesHTML = ({
    scenarios = [], reloadMainPage, request,
}) => {
    const history = useHistory();
    const { ownerId } = useParams();
    const { alert } = useContext(WebviewContext);
    const [primeScenarios, setPrimeScenarios] = useState([]);
    const [regularScenarios, setRegularScenarios] = useState([]);
    const handleScenarioClick = useCallback((setState, item) => async () => {
        if (!item.main.active) {
            try {
                setState(state => state.map(onActiveScenarioMapper(item)));
                await activateScenarioAPI(request, { scriptId: item.main.id });
            } catch {
                alert('Ошибка', 'Не удалось активировать сценарий');
                return;
            }
            reloadMainPage();
        }
    }, [reloadMainPage, scenarios])

    useEffect(() => {
        setPrimeScenarios(scenarios.filter((i) => (!!i?.main?.primary && !!i?.main?.secur)));
    }, [scenarios]);

    useEffect(() => {
        const parent = primeScenarios.find(ii => ii.main?.active);
        const Regular = scenarios.filter((i) => !(!!i?.main?.primary && !!i?.main?.secur))
        const filteredRegular = Regular
            .filter(i => Number(i?.main?.parent) === parent?.main?.id);
        setRegularScenarios(filteredRegular);
    }, [primeScenarios]);

    return (
        <StyledScenes>
            <div className="scenes__title">
                <h2>
                    Сценарии
                </h2>
                <ButtonIcon onClick={() => history.push(`/smartapartment/${ownerId}/scenarios`)}>
                    <SvgIcon
                        name="webview-edit"
                        width="16"
                        height="16"
                        fill="#283593"/>
                </ButtonIcon>
            </div>

            <RadioGroup list={primeScenarios.map(s => ({
                name: 'scenario',
                text: s?.main?.title,
                key: s?.main?.id,
                id: `radio-${s?.main?.id}`,
                checked: !!s?.main?.active,
                onChange: handleScenarioClick(setPrimeScenarios, s),
            }))} />

            {
                !!regularScenarios?.length && <div className="scenes-list">
                    {
                        regularScenarios.map(item => <ScenesListItem
                            className={!!item?.main?.active && 'active'}
                            title={item?.main?.title}
                            svgName={item?.main?.img}
                            key={item?.main?.id}
                            onClick={handleScenarioClick(setRegularScenarios, item)}
                        />)
                    }
                </div>
            }
        </StyledScenes>
    )
}

const StyledScenes = styled.div`
    padding: 20px 16px 0;
    user-select: none;

    .scenes__title {
        display: flex;
        justify-content: space-between; 
        align-items: baseline;
    }
    
    .scenes__title h2 {
        font-size: 20px;
        line-height: 1.4;
        font-weight: 700;
        letter-spacing: -0.017em;
    }

    .scenes-list {
        display: flex;
        overflow: auto;
        padding: 20px 0;
        margin: 0 -16px 0;
    }

    .scenes-list::-webkit-scrollbar {
        display: none;
    }
`

export default ScenesHTML
