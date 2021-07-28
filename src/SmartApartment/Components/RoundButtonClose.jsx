import React from 'react';
import styled from "styled-components";
import SvgIcon from './Common/SvgIcon';

const RoundButtonCloseHTML = (props) => (<>
    <button
        className={props.className ? `round-button button-close ${props.className}` : "round-button button-close"}
        onClick={props.onClick}
    >
        <SvgIcon name="webview-close" width="14" height="14" stroke="#4D4D4D" />
    </button>

    </>
)

const RoundButtonClose = styled(RoundButtonCloseHTML)`
    position: absolute;
    bottom: 60px;
    background: #FFFFFF;;
    border: none;
    padding: 18px;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

export default RoundButtonClose
