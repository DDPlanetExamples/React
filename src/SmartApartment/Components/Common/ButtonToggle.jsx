import React from 'react';
import styled from "styled-components";

const ButtonToggle = ({
    id,
    children,
    disable,
    ...props
}) => (
    <StyledButtonToggle onClick={(e) => e.stopPropagation()}>
        <input disabled={disable} type='checkbox' id={id} {...props}/>
        <label htmlFor={id}><span/></label>
    </StyledButtonToggle>
)

const StyledButtonToggle = styled.div`
  display: flex;
  align-items: center;
  
  label {
    display: inline-flex;
    background: #C2C7CC;
    width: 42px;
    height: 24px;
    border-radius: 12px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.15s ease-in;
    margin-left: 14px;
    flex-shrink: 0;
    user-select: none;
  }

  label > span {
    background: #fff;
    margin: 4px;
    width: 16px;
    height: 16px;
    border-radius: 16px;
    position: absolute;
    left: 0;
    transition: left 0.15s ease-in;
  }
  
  input {
    position: absolute;
    width: 0;
    height: 0;
    visibility: hidden;
  }

  input:disabled ~ label > span {
    background: #ccc;
  }
  
  input:checked ~ label {
    background: #4CAF50;
    box-shadow: 0 0 0 1px #ccc;

    span {
      left: calc(100% - 24px);
    }
  }

  input:checked:disabled ~ label {
    background: #757575;
  }
`;

export default ButtonToggle
