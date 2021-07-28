import React from 'react';
import styled from "styled-components";
import SvgIcon from './Common/SvgIcon';

const NoteHTML = (props) => (
    <Note className={props.type === 'warning' ? 'warning'
        : props.type === 'info' ? 'info' : ''}>
        <SvgIcon name={props.type === 'warning' ? 'src-warning'
            : props.type === 'info' ? 'src-info' : ''} width='14px' height='14px'/>
        {props.text}
    </Note>
)

const Note = styled.div`        
    margin: 12px 16px 0;
    padding: 8px;
    padding-left: 11px;
    
    font-weight: 500;
    font-size: 15px;
    line-height: 1.3;
    letter-spacing: -0.009em;
    

    border-radius: 8px;

    svg {
        margin-right: 7px;
    }

    &.warning {
        color: #BF360C;
        border: 0.5px solid #E65100;
        background: #FFFBED;
    }

    &.warning svg {
        stroke: #BF360C;
        fill: transparent;
    }

    &.info {
        color: #0D47A1;
        border: 0.5px solid #1565C0;
        background: #F0F9FF;
    }

    &.info svg {
        fill:#0D47A1;
    }
`

export default NoteHTML
