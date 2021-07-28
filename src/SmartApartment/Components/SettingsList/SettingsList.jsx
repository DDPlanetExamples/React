import React from 'react';
import styled from "styled-components";
import SettingsListItemLayout from './SettingsListItemLayout';

const settingsContent = [
    {
        id: '1',
        title: 'Устройство',
        value: 'Реле двухканальное Wi-Fi  UJIN',
        changes: false,
    }, {
        id: '2',
        title: 'Название устройства',
        value: 'Реле',
        changes: true,
    }, {
        id: '3',
        title: 'Помещение устройства',
        value: 'Гостинная',
        changes: true,
    },
]

const SettingsListHTML = () => (<>
  <SettingsList>
      {
          settingsContent.map(item => <SettingsListItemLayout
              key = {item.id} title = {item.title} value = {item.text} changes = {item.changes}
          />)
      }
  </SettingsList>
</>)

const SettingsList = styled.div`    

  & {   margin-bottom: 10px;
        background: #fff;
    }     

`;

export default SettingsListHTML
