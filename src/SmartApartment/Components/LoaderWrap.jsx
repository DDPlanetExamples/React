import React from 'react';
import styled from "styled-components";
import Loader from './Loader/Loader';

const LoaderWrapHTML = ({ onClick = () => {} }) => (
    <LoaderWrap onClick={onClick}>
        <Loader />
    </LoaderWrap>
)

const LoaderWrap = styled.div`        
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    z-index: 1;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow:hidden;

    background: rgba(0, 0, 0, 0.4);

    .loader {
        filter: brightness(2);
    }
`

export default LoaderWrapHTML
