import styled from "styled-components";

const ButtonBadge = styled.span`
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 5px 8px;     
    text-align: center;
    text-decoration: none !important;    
    border: none;
    border-radius: 16px;    
    cursor: pointer;
    outline: none;
    margin:0 8px;
    min-height:26px;
    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
    
    
    font-size: 14px;
    line-height:1;
    
    img, svg {
        margin-right:5px;
    }
`;

export default ButtonBadge
