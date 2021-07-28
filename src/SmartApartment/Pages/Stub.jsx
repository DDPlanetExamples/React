import React from 'react';
import Layout from '../Components/Layout';
import StubApartmentHTML from '../Components/StubSmartApartment';

export const Stub = ({
    title = "Пакет не подключен",
    subtitle = "По данному адресу не активирован пакет\n"
    + "                «Умная квартира» на платформе Вместе.ру :(",
}) => (
    <Layout>
        <StubApartmentHTML
            title={title}
            subtitle={subtitle}
        />
    </Layout>
)
