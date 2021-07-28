import React from 'react';
import styled from "styled-components";
import PopupActionItem from './PopupActionItem';

const PopupActionHTML = ({
    list,
    onCancelClick,
    onActionClick,
}) => (
    <PopupAction>
        <PopupActionList>
            {
                list.map(({
                    text, value,
                }, index) => <PopupActionItem key={index} text={text} onClick={() => onActionClick(value)}/>)
            }
        </PopupActionList>
        <CancelBtn onClick={onCancelClick}>Отменить</CancelBtn>
    </PopupAction>)

const PopupAction = styled.div`
    width: calc(100% - 32px);
    max-width: 580px;
    padding: 16px 0;
`;

const PopupActionList = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 14px;
    margin-bottom: 8px;
`

const CancelBtn = styled.button`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    background: #fff;
    padding: 16px;
    border-radius: 14px;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.01em;
    color: #BA1723;

`

export default PopupActionHTML
