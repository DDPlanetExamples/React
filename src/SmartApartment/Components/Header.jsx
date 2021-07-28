import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ButtonBack from "./ButtonBack";
import ButtonIcon from "./Common/ButtonIcon";
import SvgIcon from "./Common/SvgIcon";

const StyledHeader = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 18px;
  font-weight: 500;
  line-height:1;

  border-bottom: 1px solid #ececec;
  display: flex;
  align-items:center;
  justify-content: center;
  padding:5px;
  min-height: 45px;
  background: #fff;
  z-index: 1;
`;

const StyledTitle = styled.div`
    text-align: center;
    padding: 0 30px;
`

const Header = ({
    onBackClick, children, onSettingsClick, settingsIcon,
}) => {
    const { goBack } = useHistory()
    return (
        <StyledHeader>
            <ButtonBack
                onClick={onBackClick || goBack}
            />
            <StyledTitle>{children}</StyledTitle>
            {onSettingsClick && (
                <ButtonIcon alignRight onClick={onSettingsClick}>
                    {settingsIcon || <SvgIcon
                        name="webview-settings"
                        width="24"
                        height="24"
                        fill="#c62828"/>}
                </ButtonIcon>
            )}
        </StyledHeader>
    )
}

export default Header
