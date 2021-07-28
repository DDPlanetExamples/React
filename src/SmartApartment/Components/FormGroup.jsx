import React from 'react';
import styled from 'styled-components'
import Input from "./Input";
import Label from "./Label";

const StyledFormGroup = styled.div`
  padding: 16px;
  
  background: #fff;
`

const FormGroup = ({ title, ...props }) => (
    <StyledFormGroup>
        <Label>{title}</Label>
        <Input {...props} />
    </StyledFormGroup>
)

export default FormGroup
