import React from 'react';
import styled from "styled-components";

const PopupHTML = ({
    title,
    text,
    buttons = [],
    onClose,
}) => (
    <Popup>
        <PopupContent>
            <div className="title">
                {title}
            </div>
            <div className="text">
                {text}
            </div>
        </PopupContent>
        <PopupFooter>
            <div className="action">
                {
                    buttons.map(({ text, action }, index) => <button
                        key={index}
                        onClick={() => action(onClose)}
                        className="action-btn"
                    >
                        {text}
                    </button>)
                }
            </div>
        </PopupFooter>
    </Popup>)

const Popup = styled.div`

    width: calc(100% - 64px);
    max-width: 580px;
    background: #fff;
    align-items: center;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 10px;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const PopupContent = styled.div`

    padding: 24px 16px 16px;

    .title {
        text-align: center;
        margin-bottom: 4px;
        font-size: 17px;
        line-height: 1.5;
        font-weight: 500;
    }

    .text {
        font-size: 14px;
        line-height: 1.25;
        text-align: center;
        padding: 0 5px;
    }
`
const PopupFooter = styled.div`

    width: 100%;
    border-top: 1px solid #D9D9D9;

    .action {
        width: 100%;
        display: flex;
    }

    .action-btn {
        flex-grow: 1;
        padding: 11px;
        text-align: center;
        border: none;
        background: #fff;
        border-right: 1px solid #C2C2C2;

        font-size: 18px;
        line-height: 1.5;
        font-weight: 500;
        letter-spacing: -0.014em;
        color: #BA1723;

        cursor: pointer;
    }

    .action-btn:last-child {
        border-right: none;
    }
`

export default PopupHTML
