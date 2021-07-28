import React from 'react';
import styled from "styled-components";

const RadioBtnCustomHTML = ({
    text,
    ...props
}) => (
    <RadioBtnCustom>
        <input
            type="radio"
            {...props}
        />
        <label htmlFor={props.id} className="scenes__radio-label">
            {text}
        </label>
    </RadioBtnCustom>

)

const RadioBtnCustom = styled.div`
    flex-grow: 1;

    input {
        position: absolute;
        width: 0;
        height: 0;
        visibility: hidden;
    }

    .scenes__radio-label {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 8px 9px 0;
        border-radius: 10px;

        font-size: 16px;
        line-height: 1.2;
        transition: background-color 0.15s ease-in-out, color 0.15s ease-in;
    }

    input:checked + .scenes__radio-label {
        background: #4CAF50;
        color: #fff;
    }
`

export default RadioBtnCustomHTML
