import React, { useMemo } from 'react';
import styled from 'styled-components'
import ButtonBadge from "../../Components/ButtonBadge";
import SvgIcon from "../../Components/Common/SvgIcon";

const DeviceBadges = ({ online, wifiLevel }) => {
    const iconName = useMemo(() => `/webview/Icons/webview-wifi-level-${wifiLevel}.svg`, [])

    return (
        <StyledDeviceBadges>
            <ButtonBadge>
                <img src={iconName} alt="" width={16} height={14}/>
                WI-FI
            </ButtonBadge>
            {online ? (
                <ButtonBadge>
                    <SvgIcon
                        name="webview-online"
                        width="16"
                        height="12"
                        fill="#62b966"
                    />
                    В сети
                </ButtonBadge>
            ) : (
                <ButtonBadge>
                    <SvgIcon
                        name='webview-offline'
                        width="16"
                        height="12"
                        fill="#F44336"
                    />
                    Не в сети
                </ButtonBadge>
            )}
        </StyledDeviceBadges>
    );
};

const StyledDeviceBadges = styled.div`
    text-align: center;
    padding-top: 16px;
    padding-bottom: 12px;
    background: white;
`

export default DeviceBadges;
