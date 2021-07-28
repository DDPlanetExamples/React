import styled, { css } from "styled-components";

const ButtonIcon = styled.span`
    display: inline-flex;     
    user-select: none; 
    align-items: center;
    justify-content: center;
    font-size: 15px;
    line-height: 1;
    text-align: center;
    text-decoration: none !important;    
    border: none;
    border-radius: 6px;
    cursor: pointer;
    outline: none;
    min-width: ${props => props.width || '34px'};
    min-height: ${props => props.height || '34px'};
    ${props => props.alignRight && css`
        position: absolute;
        right: 8px;
    `}
`;

export default ButtonIcon
