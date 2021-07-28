import React, { useContext } from 'react';
import styled from "styled-components";
import ButtonToggle from '../../Components/Common/ButtonToggle';
import SettingsListItemButton from "../../Components/SettingsList/SettingsListItemButton";
import { StyledSettingsListItem } from "../../Components/SettingsList/styled";
import WebviewContext from "../../WebviewContext";

const signalActions = [{
    title: 'Выключить',
    id: 0,
}, {
    title: 'Включить',
    id: 1,
}];

const AddSceneSettingItemHTML = ({ item, onSignalChange, onValueChange }) => {
    const { select } = useContext(WebviewContext);

    return <AddSceneSettingItem active={!!item.enabled}>
        <AddSceneSettingItemWrap>
            <div className="setting-title">{item?.title}</div>
            <ButtonToggle checked={!!item.enabled} id={item.path} onChange={(e) => {
                onSignalChange(item, Number(e.target.checked));
            }}/>
        </AddSceneSettingItemWrap>
        <div className="setting-desc">
            <StyledSettingsListItem>
                <div className="settings-list__content">
                    <div className="settings-list__title">
                            Действие
                    </div>
                    <div className="settings-list__desc">
                        {
                            (item?.max > 1)
                                ? item.value
                                : signalActions.find(i => `${i.id}` === `${item.value}`)?.title
                        }
                    </div>
                </div>
                <SettingsListItemButton onClick={async () => {
                    if (item.enabled) {
                        const newValue = await select({
                            list: (item?.max > 1)
                                ? new Array((item.max - item.min) + 1).fill()
                                    .map((_, index) => ({
                                        title: item.min + index,
                                        id: item.min + index,
                                    }))
                                : signalActions,
                            initialSelectedId: item.value,
                            title: 'Действие',
                        });
                        onValueChange(item, newValue);
                    }
                }} readOnly={false} type='edit'/>
            </StyledSettingsListItem>
        </div>
    </AddSceneSettingItem>;
}

const AddSceneSettingItemWrap = styled.div`
    display: flex;
    justify-content: center;
    padding: 12px 0;
`

const AddSceneSettingItem = styled.div`

    border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
    
    .setting-title {
        flex-grow: 1;
        font-size: 17px;
        line-height: 1.5;
        letter-spacing: -0.013em;
        word-break: break-word;
    }

    .setting-desc {
        height: auto;
        opacity: ${props => (props.active ? '1' : '0.5')};
        transition: all 0.15s ease-in;
    }
  

    .setting-desc > div {
        padding: 0;
    }

    &:last-child {
        border: none;
    }
`;

export default AddSceneSettingItemHTML
