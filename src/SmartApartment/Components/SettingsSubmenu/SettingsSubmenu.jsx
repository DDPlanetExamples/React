import React from 'react';
import { map } from "lodash";
import styled from "styled-components";
import SettingsSubmenuItem from './SettingsSubmenuItem';

const StyledSettingsSubmenu = styled.div`    
    background: #fff;
`;

const SettingsSubmenu = ({ settingsList }) => (
    <StyledSettingsSubmenu>
        {map(settingsList, item => (
            <SettingsSubmenuItem
                {...item}
                key={item.id}
            />
        ))}
    </StyledSettingsSubmenu>
)

export default SettingsSubmenu
