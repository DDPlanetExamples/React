import React, { useMemo } from 'react';
import styled from "styled-components";

const InputRange = (props) => {
    const stepInterval = useMemo(() => (100 / (props.max - props.min)), [])

    return <StyledInputRangeWrapper>
        <div className="input-range-wrapper">
            <StyledInputRange type='range' {...props} />
            <div className="input-range__track" style={{ width: `${(props.value - props.min) * stepInterval}%` }}/>
        </div>
    </StyledInputRangeWrapper>
}

const StyledInputRangeWrapper = styled.div`
   
   & .input-range-wrapper {
      position:relative;
     }
     & .input-range-wrapper:before {
        content:"";
        position:absolute;
        height:2px;
        background:#e2e2e2;
        left:0;
        right:0;
        top:50%; 
        margin-top:-1px;
        z-index: 1;     
        border-radius:5px;   
     }
     & .input-range__track {
        position:absolute;
        height:2px;
        background:#283593;
        left:0;
        top:50%; 
        margin-top:-1px;
        z-index: 2;
        border-radius:5px;
       }

`;

const StyledInputRange = styled.input`

  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  border: none;
  background-color: transparent;
  z-index: 3;
  position: relative;


  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 0px;
    cursor: pointer;
    border-radius: 25px;
    border: none        
  }

  &::-webkit-slider-thumb {
    box-shadow: 0 5px 6px rgba(0, 0, 0, 0.15);
    border: 1px solid #e7e7e7;
    height: 27px;
    width: 27px;
    border-radius: 27px;
    background: white;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -13px;
  }

  &::-webkit-progress-value {
    background-color: #ba1723;
  }

  &::-moz-range-track {
    width: 100%;
    height: 1px;
    cursor: pointer;
    border-radius: 25px;
    border: solid #939ac9;
    border-width: 1px 0;
    background-color: #283593;
  }

  &::-moz-range-thumb {
    box-shadow: 0 5px 6px rgba(0, 0, 0, 0.15);
    border: 1px solid #e7e7e7;
    height: 27px;
    width: 27px;
    border-radius: 27px;
    background: white;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -14px;
  }

  &::-ms-track {
    width: 100%;
    height: 1px;
    cursor: pointer;
    border-radius: 25px;
    border: solid #939ac9;
    border-width: 1px 0;
    background-color: #283593;
  }

  &::-ms-fill-lower {
    background-color: #ba1723;
  }

  &::-ms-fill-upper {
    background-color: #ba1723;
  }

  &::-ms-thumb {
    box-shadow: 0 5px 6px rgba(0, 0, 0, 0.15);
    border: 1px solid #e7e7e7;
    height: 27px;
    width: 27px;
    border-radius: 27px;
    background: white;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -10px;
    
  }

  &:disabled::-webkit-slider-thumb {
    background: #d3d3d4 !important;
    border-color: #d3d3d4;
    box-shadow: none;
  }

  &:disabled::-ms-thumb {
    background: #d3d3d4 !important;
    border-color: #d3d3d4;
    box-shadow: none;
  }

  &:disabled::-moz-range-thumb {
    background: #d3d3d4 !important;
    border-color: #d3d3d4;
    box-shadow: none;
  }

  &:focus::-ms-fill-lower {
    background: #ba1723;
  }

  &:focus::-ms-fill-upper {
    background: #ba1723;
  }

`

export default InputRange
