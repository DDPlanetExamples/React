import React from 'react';
import styled from "styled-components";
import ButtonRed from './Common/ButtonRed';

const FooterEditHTML = (props) => (
    <FooterEdit fixed={props.fixed}>
        <ButtonRed onClick={props.onClick} disabled={props.disabled ? 'disabled' : ''}>{props.text}</ButtonRed>
    </FooterEdit>
)

const FooterEdit = styled.div`        
    background: #F8F8F8;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    padding: 14px 16px;
    margin-top: auto;
    width: 100%;
    position: ${props => (props.fixed ? 'fixed' : 'static')};
    bottom: ${props => (props.fixed ? '0' : 'auto')};

    button {
        width: 100%;
    }
`

export default FooterEditHTML
