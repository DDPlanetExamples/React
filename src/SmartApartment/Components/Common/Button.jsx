import styled from "styled-components";

const Button = styled.button`
    background: rgba(198,40,40, 0.1);
    border: none;
    padding: 7px 10px;
    border-radius: 8px;
    
    color: #C62828;
    font-size: 16px;
    line-height: 1.4;
    letter-spacing: -0.011em;
    font-weight: 500;
    width: ${props => (props.wide ? '100%' : 'auto')};

    cursor: pointer;
  
    &:not(.action-button) + & {
      margin-top: 16px;
    }
    
    :disabled {
      opacity: 0.5;
    }
`

export default Button
