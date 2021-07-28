import React from 'react';
import styled from "styled-components";
import PopupAction from './PopupAction';

const PopupActionModal = ({
    onClose,
    actionList = [],
    onActionClick = () => {},
}) => (
    <PopupActionStyle>
        <PopupAction list={actionList} onCancelClick={onClose} onActionClick={onActionClick} />
    </PopupActionStyle>)

const PopupActionStyle = styled.div`
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: flex-end;

        position: relative;

        background: rgba(0, 0, 0, 0.4);
        margin: 0 auto;
        z-index: 1111111111;
`;

export default PopupActionModal
