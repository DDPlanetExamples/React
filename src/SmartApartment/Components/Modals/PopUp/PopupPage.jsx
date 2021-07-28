import React from 'react';
import styled from "styled-components";
import RoundButtonClose from '../../RoundButtonClose';
import Popup from './Popup';

const PopupPageHTML = ({
    onClose,
    title, text, buttons,
}) => (

    <PopupPage>

        <Popup
            title={title}
            text={text}
            buttons={buttons}
            onClose={onClose}
        />
        <RoundButtonClose
            onClick={onClose}
        />

    </PopupPage>)

const PopupPage = styled.div`
        height: 100%;
        min-height: 100vh;
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        position: fixed;

        background: rgba(0, 0, 0, 0.4);
        margin: 0 auto;
`;

export default PopupPageHTML
