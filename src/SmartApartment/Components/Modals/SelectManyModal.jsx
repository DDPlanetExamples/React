import React, { useState } from 'react';
import { map, xor, includes } from 'lodash';
import FooterEditHTML from '../FooterEdit';
import Header from '../Header';
import Layout from '../Layout';
import LayoutWhite from '../LayoutWhite';
import ControlHTML from '../Radio/RadioBtn';

const SelectManyModal = ({
    title,
    onClose,
    onSave,
    list = [],
    initialSelectedId = [],
    index,
}) => {
    const [selectedId, setSelectedId] = useState(initialSelectedId);

    return (
        <Layout fixed index={index}>
            <Header onBackClick={() => onClose(initialSelectedId)}>
                {title}
            </Header>
            <LayoutWhite>
                {map(list, ({ title, id }) => (
                    <ControlHTML
                        key={id}
                        id={id}
                        title={title}
                        type='checkbox'
                        name={`select-many`}
                        value={id}
                        checked={includes(selectedId, id)}
                        onChange={(e) => {
                            const { value } = e.target
                            setSelectedId(ids => xor(ids, [value]));
                        }}
                    />
                ))}
            </LayoutWhite>
            <FooterEditHTML text='Сохранить' disabled={false} onClick={() => onSave(selectedId)}/>
        </Layout>
    )
}

export default SelectManyModal
