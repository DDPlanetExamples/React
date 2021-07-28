import React from 'react';
import styled from "styled-components";
import ButtonIcon from '../../Components/Common/ButtonIcon';
import SvgIcon from '../../Components/Common/SvgIcon';

const SceneHeaderHTML = (props) => (
    <SceneHeader>
        <div className="avatar">
            <SvgIcon name = {props.svgName}/>
        </div>
        <div className="content">
            <div className="content__desc">
                Сценарий
            </div>
            <div className="content__title">
                {props.title}
            </div>
        </div>
        <ButtonIcon onClick={props.onEditClick}>
            <SvgIcon name="webview-edit" width="16px" height="16px" fill="#9E9E9E"/>
        </ButtonIcon>
    </SceneHeader>
)

const SceneHeader = styled.div`
    padding: 11px 16px;
    display: flex;
    align-items: center;

    .avatar {
        background: #F0F2F4;
        border-radius: 50%;
        padding: 16px;

        display: flex;
        justify-content: center;
        align-items: center;

        width: 64px;
        height: 64px;
        margin-right: 11px;
    }

    .avatar svg {
        max-width: 32px;
        max-height: 32px;
        fill: #000;
    }

    .content {
        flex-grow: 1;
    }

    .content__desc {
        font-size: 14px;
        line-height: 1.25;
        color: #4D4D4D;
        letter-spacing: -0.009em;
    }

    .content__title {
        font-size: 17px;
        line-height: 1.5;
        letter-spacing: -0.013em;
    }
`;

export default SceneHeaderHTML
