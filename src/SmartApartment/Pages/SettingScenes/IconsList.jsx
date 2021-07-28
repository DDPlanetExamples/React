import React from 'react';
import styled from "styled-components";

const IconsListHTML = (props) => (
    <IconsList>
        <h2>{props.title}</h2>
        {props.children}
    </IconsList>
)

const IconsList = styled.div`
    display: flex;
    padding: 0 5.15px 0 16px;
    flex-wrap: wrap;

    h2 {
        width: 100%;
        margin-bottom: 12px;
        color: #C62828;
        font-weight: 500;
        font-size: 15px;
        line-height: 1.3;
        letter-spacing: -0.009em;
    }
`;

export default IconsListHTML
