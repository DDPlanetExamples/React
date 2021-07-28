import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import SvgIcon from '../Common/SvgIcon';

const SettingsSubmenuItemHTML = ({
    desc,
    empty,
    title,
    ...props
}) => (
    <SettingsSubmenuWrapper empty={empty}>
        <SettingsSubmenuItem {...props}>
            <SettingsSubmenuItemContent>
                <div className="desc">
                    {desc}
                </div>
                <div className="title">
                    {title}
                </div>
            </SettingsSubmenuItemContent>
            <div className="btn">
                <SvgIcon name="webview-back" width="8" height="14" fill="#C2C7CC" />
            </div>
        </SettingsSubmenuItem>
    </SettingsSubmenuWrapper>
)

const SettingsSubmenuWrapper = styled.div`
    padding: ${props => (`11px ${props.empty ? '15px 0px' : '15px 0'}`)};
    background: ${props => (props.empty ? '#FFFBED' : '#fff')};

    & > a {
        border-bottom: 1px solid #ececec;
    }    
`

const SettingsSubmenuItem = styled(Link)`

    display: flex;
    justify-content: space-between;
    align-items: center;

    
    font-size: 17px;
    line-height: 1.5;
    text-decoration: none;
    color: #000;
    padding-bottom: 11px;

    .btn {
        transform: scale(-1);
    }
`;

const SettingsSubmenuItemContent = styled.div`
    .content {
        display: flex;
        flex-direction: column;
    }
  
    .title {
      word-break: break-word;
    }

    .desc {
        font-size: 14px;
        line-height: 1.25;
        color: #4D4D4D;
        letter-spacing: -0.009em;
        word-break: break-word;
    }

`

export default SettingsSubmenuItemHTML
