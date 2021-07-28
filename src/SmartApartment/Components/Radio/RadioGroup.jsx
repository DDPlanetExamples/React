import React from 'react';
import styled from 'styled-components'
import RadioBtnCustomHTML from "./RadioBtnCustom";

const StyledRadioGroup = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 5px 4px;
  display: flex;
  background: #FFFFFF;
  box-shadow: 0 1px 24px rgba(0, 0, 0, 0.14);
  border-radius: 14px;
  margin-top: 16px;
`

/**
 * @param [{name: string, text: string, key: string, id: string, checked: boolean, onChange: Function}] list
 */
const RadioGroup = ({ list }) => (
    <StyledRadioGroup>
        {list.map(radioItem => <RadioBtnCustomHTML key={radioItem.key} {...radioItem} />)}
    </StyledRadioGroup>
);

export default RadioGroup;
