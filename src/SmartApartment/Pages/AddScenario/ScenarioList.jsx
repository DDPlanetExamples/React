/* eslint-disable */
import React from 'react';
import SettingsSubmenuItem from "../../Components/SettingsSubmenu/SettingsSubmenuItem";
import Header from "../../Components/Header";
import { LayoutWhite } from "../../Components/Layout";
import Button from "../../Components/Common/Button";

const ScenarioList = ({ scenarios, onScenarioClick, onAddScenarioClick, onBack }) => <LayoutWhite>
        <Header onBackClick={onBack}>
            Сценарии
        </Header>
        <>
            <div style={{ marginLeft: 15, marginRight: 15 }}>
                {
                    (scenarios || []).map(item => <SettingsSubmenuItem
                        title={item.main.title}
                        key={item.main.id}
                        onClick={() => onScenarioClick(item.main.id)}
                    />)
                }
            </div>
            <div style={{padding: '15px 16px'}}>
                <Button wide onClick={() => onAddScenarioClick()}>Добавить сценарий</Button>
            </div>
        </>
    </LayoutWhite>;

export default ScenarioList;
