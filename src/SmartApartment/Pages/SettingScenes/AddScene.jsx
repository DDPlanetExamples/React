import React from 'react';
import FooterEditHTML from '../../Components/FooterEdit';
import Header from '../../Components/Header';
import Layout from '../../Components/Layout';
import LayoutWhite from '../../Components/LayoutWhite';
import AddSceneHeader from './AddSceneHeader';
import AddSceneSetting from './AddSceneSetting';
import AddSceneSettingItemHTML from './AddSceneSettingItem';

const settingList = [
    {
        id: '1',
        title: 'Умная розетка',
        active: true,
    }, {
        id: '2',
        title: 'Освещение всей квартиры',
        active: true,
    }, {
        id: '3',
        title: 'Контроллер протечек',
        active: false,
    },
]

const AddScene = () => (

    <Layout>

        <Header>
            Новый сценарий
        </Header>

        <LayoutWhite>

            <AddSceneHeader svgName='day' title='Уютный вечер' active={true}/>

            <AddSceneSetting title='Устройства'>
                {
                    settingList.map(item => <AddSceneSettingItemHTML
                        key={item.id}
                        title={item.title}
                        active={item.active}/>)
                }
            </AddSceneSetting>

        </LayoutWhite>

        <FooterEditHTML text = 'Добавить'/>

    </Layout>
)

export default AddScene
