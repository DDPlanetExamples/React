import React from 'react';
import styled from 'styled-components';
import SvgIcon from './Common/SvgIcon';

const DevicesFilterHTML = (props) => (
    <DevicesFilter state={props.state}>
        <div className="devices-list__item" onClick={props.onClick}>
            {props.edit && <SvgIcon name='webview-edit' fill="#9e9e9e" width="16px" height="16px"/>}
            <p>{props.text}</p>
        </div>

    </DevicesFilter>
)

const DevicesFilter = styled.div`
    margin-right: 8px; 
    font-weight: 500;
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: -0.011em;

    &:first-child { padding-left: 16px; }
    &:last-child { padding-right: 16px; }

    .devices-list__item {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        white-space: pre;
        background: ${props => (props.state === 'active' ? '#283593'
        : props.state === 'disabled' ? '#fff'
            : '#F0F2F4')};
        border-radius: 100px;
        border: ${props => (props.state === 'disabled' ? '1px solid #9E9E9E' : '')};
        color: ${props => (props.state === 'active' ? '#fff'
        : props.state === 'disabled' ? '#9E9E9E'
            : '#000000')};
    }

    .devices-list__item svg {
        margin-right: 8px;
    }
    
`

export default DevicesFilterHTML
