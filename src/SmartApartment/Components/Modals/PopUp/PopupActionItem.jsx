import React from 'react';
import styled from "styled-components";

const PopupActionItemHTML = (props) => (

    <PopupActionItem onClick={props.onClick}>
        {props.text}
    </PopupActionItem>)

const PopupActionItem = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 14px 16px 12px;

    background: #fff;
    font-size: 20px;
    line-height: 1.5;
    letter-spacing: -0.007em;
    color: #BA1723;
    border: none;

    &:not(:last-child) {
        border-bottom: 1px solid #DCDCDC;
    }
`;

export default PopupActionItemHTML
