import React from 'react';
import styled from 'styled-components';

const StubApartmentHTML = ({
   title = 'Пакет не подключен',
   subtitle = 'По данному адресу не активирован пакет\n' +
   '                «Умная квартира» на платформе Вместе.ру :(',
}) => (
    <StubApartment>
        <div className="wrapper">
            <img src="/images/ui/stub.png"/>
            <p>
                {title}
            </p>
            <p className="grey">
                {subtitle}
            </p>
        </div>
    </StubApartment>
)

const StubApartment = styled.div`
    width: 100%;
    height: 100%;
    padding: 30px;
    background: #FFF;
    

    p {
        text-align: center;
        font-size: 16px;
        line-height: 1.5;
        letter-spacing: -0.011em;
        color: #4D4D4D;
        margin-bottom: 5px;
    }

    .grey {
        font-size: 14px;
        line-height: 1.25;
        letter-spacing: -0.009em;
        color: #838383;
    }

    .wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

export default StubApartmentHTML
