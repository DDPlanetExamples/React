import React, { useState } from 'react';
import { map } from 'lodash';
import FooterEditHTML from '../FooterEdit';
import Header from '../Header';
import { LayoutWhite } from '../Layout';
import ControlHTML from '../Radio/RadioBtn';

const SelectModal = ({
    title,
    onClose,
    onSave,
    list = [],
    initialSelectedId,
    control,
    index,
}) => {
    const [selectedId, setSelectedId] = useState(initialSelectedId);

    return (
        <LayoutWhite fixed isFullHeight index={index}>
            <Header onBackClick={() => onClose(initialSelectedId)}>
                {title}
            </Header>
            <div style={{ paddingBottom: 100 }}>
                {
                    // eslint-disable-next-line no-shadow
                    map(list, ({ title, id }) => <ControlHTML
                        key={id}
                        id={id}
                        title={title}
                        type='radio'
                        name={`select-${title}`}
                        value={id}
                        checked={`${selectedId}` === `${id}`}
                        onChange={(e) => {
                            setSelectedId(e.target.value);
                        }}
                    />)
                }
                {control}
            </div>
            <FooterEditHTML fixed text='Сохранить' disabled={false} onClick={() => onSave(selectedId)}/>
        </LayoutWhite>
    )
}

export default SelectModal
