import React from 'react';
import styled from "styled-components";
import ButtonToggle from '../../Components/Common/ButtonToggle';
import SettingsListItemLayout from '../../Components/SettingsList/SettingsListItemLayout';
import SceneHeader from './SceneHeader';
import WeekList from './WeekList';

const AddSceneHeaderHTML = (props) => (
    <AddSceneHeader>
        <SceneHeader svgName={props.svgName} title={props.title}/>
        <div className="activation">
            <p>
                Автоматическая активация сценария
            </p>
            <ButtonToggle active={props.active}/>
        </div>

        { props.active ? <>
                <WeekList />
                <SettingsListItemLayout
                    title = '21:00'
                    text = 'Время активации'
                    changes = {true} />
            </>
            : <></>
        }
    </AddSceneHeader>
)

const AddSceneHeader = styled.div`
    .activation {
        display: flex;
        justify-content: space-between;
        padding: 12px 16px;
        
        p {
            padding-right: 10px;
        }
    }
`;

export default AddSceneHeaderHTML
