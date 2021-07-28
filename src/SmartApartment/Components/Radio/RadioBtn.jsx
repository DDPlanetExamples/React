import React from 'react';
import styled from "styled-components";

const ControlHTML = ({
    title,
    ...props
}) => (
    <RadioBtnWrap>
        <RadioBtn>

            <label htmlFor={props.id}>
                {title}
            </label>
            <input {...props} />
            <span className='btn'/>

        </RadioBtn>
    </RadioBtnWrap>
)

const RadioBtnWrap = styled.div`
  padding: 0 11px 0 16px;
`

const RadioBtn = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 0.5px solid #D9D9D9;

  input {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    opacity: 0;
    height: 22px;
    width: 22px;
    flex-shrink: 0;
  }

  label {
    flex-grow: 1;
    font-size: 17px;
    line-height: 1.5;
    padding: 9px 0;
    word-break: break-word;
  }

  .btn {
    display: inline-block;
    border: 1px solid #999999;
    background: #FFFFFF;
    box-sizing: border-box;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    transition: background-color 0.15s;
    flex-shrink: 0;
  }

  input[type=radio]:checked + .btn {
    border: 6px solid #C62828;
  }

  input[type=checkbox]:checked + .btn {
    background: #C62828 url("/src/Icons/aprove-path.svg") center center no-repeat;
  }

`;

export default ControlHTML
