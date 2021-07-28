import styled from "styled-components";

const ButtonRed = styled.button`
    background: #C62828;
    border: none;
    padding: 7px 10px;
    border-radius: 8px;

    color: #fff;
    font-size: 16px;
    line-height: 1.4;
    letter-spacing: -0.011em;
    font-weight: 500;
    

    &[disabled] {
        background: #B88788;
    }

    cursor:pointer;
`

export default ButtonRed
