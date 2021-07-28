import React from 'react';
import styled from "styled-components";
import SvgIcon from '../../Components/Common/SvgIcon';

const IconsListItemHTML = (props) => (
    <IconsListItem active={props.active} onClick={props.onClick}>
        <SvgIcon name={props.name} fill="#424242" />
    </IconsListItem>
)

const IconsListItem = styled.div`
    width: 56px;
    height: 56px;
    padding: 14px;
    margin-right: 10.75px;
    margin-bottom: 16px;
    background: #F0F2F4;
    border-radius: 50%;
    border: ${props => (props.active ? '2px solid #4CAF50' : '2px solid #F0F2F4')};

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        max-height: 32px;
    }
`;

export default IconsListItemHTML
