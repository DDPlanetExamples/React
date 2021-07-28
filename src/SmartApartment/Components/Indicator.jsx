import styled from "styled-components";

const Indicator = styled.span`

    padding: 3px 8px;
    background: ${props => (props.state ? '#4CAF50' : '#C2C7CC')};
    color: #fff;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.25;
    border-radius: 100px;
    
`
export default Indicator;
