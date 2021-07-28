import React from 'react';
import styled from "styled-components";
import ButtonIcon from '../Common/ButtonIcon';
import SvgIcon from '../Common/SvgIcon';

const IndicationItem = (props) => {
    const SettingChanges = changes => {
        if (changes) {
            return (
                <ButtonIcon width="24" height="24">
                    <SvgIcon
                        name="webview-edit"
                        width="16"
                        height="16"
                        fill="#9e9e9e" />
                </ButtonIcon>
            )
        }
        return null
    }
    const BtnArrow = subMenu => {
        if (subMenu) {
            return <SvgIcon name="webview-back" width="8" height="14" fill="#C2C7CC" />
        }
        return null
    }
    return <IndicationListItem>
        {props.children}
        <Buttons>
            {SettingChanges(props.changes)}
            <div className="buttons">
                {BtnArrow(props.subMenu)}
            </div>
        </Buttons>
    </IndicationListItem>
}
const Buttons = styled.div`
    display: flex;
`
const IndicationListItem = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;
    
    font-size: 17px;
    line-height: 1.5;
    border-bottom: 1px solid #ececec;

    &:first-child>.indication-list__content {
        padding-top: 0;        
        }

    &:last-child {
        border-bottom: none;
        }
        &:last-child>.indication-list__content {
            padding-bottom: 0;            
            }

    .indication-list__content {
        padding: 11px 0;
        flex-grow:1;
    }

    .indication-list__title {
        font-size: 14px;
        line-height: 1.25;
        color: #4D4D4D;
    }
    .buttons{
        transform: scale(-1);
    }

`;

export default IndicationItem
