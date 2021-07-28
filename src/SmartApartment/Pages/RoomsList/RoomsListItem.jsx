import React from 'react';
import styled from "styled-components";
import ButtonIcon from '../../Components/Common/ButtonIcon';
import SvgIcon from '../../Components/Common/SvgIcon';

const RoomsListItemHTML = (props) => (
    <RoomsListItem>
        <div className="content">
            <div className="content__title">
                {props.title}
            </div>
            <div className="content__desc">
                {props.desc}
            </div>
        </div>

        {
            props.onEditClick
            && <ButtonIcon onClick={props.onEditClick} >
                <SvgIcon name="webview-edit" width="18" height="20" fill="#424242" />
            </ButtonIcon>
        }
        <ButtonIcon onClick={props.onDeleteClick} >
            <SvgIcon name="webview-basket" width="18" height="20" fill="#424242" />
        </ButtonIcon>

    </RoomsListItem>
)

const RoomsListItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #F0F2F4;
    border-radius: 10px;
    padding: 10px 12px;

    margin-bottom: 8px;
    
    &:first-child {
        margin-top: 16px;
    }

    &:last-child {
        margin-bottom: 16px;
    }

    .content {
        padding-right: 10px;
    }

    .content__title {
        font-size: 17px;
        line-height: 1.3;
        letter-spacing: -0.013em;
    }

    .content__desc {
        margin-top: 2px;
        color: #4D4D4D;
        letter-spacing: -0.009em;
        font-size: 14px;
        line-height: 1.25;
    }

    &+button {
        margin-top: 8px;
    }
`;

export default RoomsListItemHTML
