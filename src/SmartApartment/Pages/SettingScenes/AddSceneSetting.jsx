import React from 'react';
import styled from "styled-components";

const AddSceneSettingHTML = (props) => (
    <AddSceneSetting>
        <div className="title">{props.title}</div>
        {props.children}
    </AddSceneSetting>
)

const AddSceneSetting = styled.div`
    padding: 0 16px;

    .title {
        padding: 22px 16px 6px;
        background: #EBEBEB;
        letter-spacing: -0.0025em;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 13px;
        line-height: 1.25;
        color: #4D4D4D;

        margin: 0 -16px;
    }
`;

export default AddSceneSettingHTML
