import React from 'react';
import styled from "styled-components";
import SvgIcon from './Common/SvgIcon';

const ButtonBack = styled.span`
    position: absolute;
    left: 0;
    user-select: none;
    display: flex;
    align-self: center;
    padding: 14px 17px;
    height: 42px;
    font-size: 15px;
    line-height: 1;
    font-weight: 400;
    text-align: center;
    text-decoration: none !important;        
    border: none;   
    border-radius: 6px; 
    cursor: pointer;
    outline: none;
    vertical-align: middle; 
    fill: #c62828;
    margin-right:5px;
`;

const ButtonBackHTML = ({ onClick }) => (
    <ButtonBack onClick={onClick}>
        <SvgIcon name="webview-back" width="8" height="14" fill="#c62828" />
    </ButtonBack>
)

export default ButtonBackHTML
