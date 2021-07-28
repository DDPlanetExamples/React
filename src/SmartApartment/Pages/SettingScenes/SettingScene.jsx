import React, { useState } from 'react';
import FooterEditHTML from '../../Components/FooterEdit';
import FormGroup from '../../Components/FormGroup';
import Header from '../../Components/Header';
import { LayoutWhite } from '../../Components/Layout';
import IconsList from './IconsList';
import IconsListItem from './IconsListItem';

const icons = [
    {
        id: '1',
        name: 'day',
    }, {
        id: '2',
        name: 'sun_rise',
    }, {
        id: '3',
        name: 'coming_home',
    }, {
        id: '4',
        name: 'ghost',
    }, {
        id: '5',
        name: 'party',
    }, {
        id: '6',
        name: 'partyDancer',
    }, {
        id: '7',
        name: 'dumbbell',
    }, {
        id: '8',
        name: 'adult_content',
    }, {
        id: '9',
        name: 'night',
    }, {
        id: '10',
        name: 'korm',
    }, {
        id: '11',
        name: 'shower',
    }, {
        id: '12',
        name: 'snow',
    }, {
        id: '13',
        name: 'sun_down',
    },
]

const SettingScene = ({
    onClose, initialTitle, onSave, initialSvg, loading,
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [svg, setSvg] = useState(initialSvg);
    return <LayoutWhite fixed style={{ zIndex: 2 }}>
        <Header onBackClick={onClose}>
                Сценарий
        </Header>
        <FormGroup title='Название' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <IconsList title='Иконки'>
            {
                icons.map(item => <IconsListItem
                    name={item.name}
                    key={item.name}
                    active={item.name === svg}
                    onClick={() => setSvg(item.name)}
                />)
            }
        </IconsList>

        <FooterEditHTML text='Сохранить' disable={loading} fixed onClick={() => onSave({ title, svg })}/>

    </LayoutWhite>
}

export default SettingScene
