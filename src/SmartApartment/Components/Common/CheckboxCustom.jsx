import React from 'react';
import styled from "styled-components";

const CheckboxCustom = ({ title, ...props }) => (
    <StyledCheckboxCustom>
        <input type='checkbox' {...props}/>
        <label htmlFor={props.id}>
            {title}
        </label>
    </StyledCheckboxCustom>
)

const StyledCheckboxCustom = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        opacity: 0;
        height: 100%;
        width: 100%;
    }

    label {
        border: 2px solid #F0F2F4;
        padding: 8px 12px;
        border-radius: 100px;

        font-weight: 500;
        font-size: 16px;
        line-height: 1.5;
        letter-spacing: -0.011em;
        transition: border-color 0.15s;
    }


    input:checked + label {
        border: 2px solid #4CAF50;
    }

`;

export default CheckboxCustom
