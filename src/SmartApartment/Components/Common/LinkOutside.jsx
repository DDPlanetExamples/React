import React from 'react';
import styled from "styled-components";

import SvgIcon from './SvgIcon';

const StyledLink = styled.a`
    color:#283593;
    text-decoration:none;   
    cursor:pointer; 

    & > svg {
        margin-left:5px;
        fill: #283593;
    }
`;

const LinkOutsideHTML = ({
    children,
    ...rest
}) => (
    <StyledLink {...rest}>
        {children}
        <SvgIcon
            name="webview-outside"
            width="12"
            height="12"
            fill="#62b966"
        />
    </StyledLink>
)

export default LinkOutsideHTML
