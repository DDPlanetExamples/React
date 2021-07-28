import React, { useState } from 'react';
import FooterEditHTML from '../FooterEdit';
import FormGroup from "../FormGroup";
import Header from '../Header';
import { LayoutWhite } from '../Layout';

const InputModal = ({
    onClose, onSave, initialValue, title, note, placeholder, inputTitle = 'Значение', index,
}) => {
    const [value, setValue] = useState(initialValue);

    return (
        <LayoutWhite fixed isFullHeight index={index}>

            <Header onBackClick={onClose}>
                {title}
            </Header>
            {note()}
            <FormGroup
                title={inputTitle}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                placeholder={placeholder}
                value={value}
            />

            <FooterEditHTML fixed onClick={() => onSave(value)} text='Сохранить'/>

        </LayoutWhite>
    )
}

export default InputModal
