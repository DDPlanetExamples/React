import React, { useMemo } from 'react';
import styled, { css } from 'styled-components'
import ButtonIcon from "../Common/ButtonIcon";
import SvgIcon from "../Common/SvgIcon";

const StyledListItemButton = styled.button`
  margin-left: 10px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  padding: 11px;

  &:disabled svg {
    fill: rgb(232 232 232);
  }
  
  ${props => {
        switch (props.type) {
            case 'go':
                return css`
                  transform: scale(-1);
                  margin-left: 20px;
                `
            default:
                return css`
                margin-left: 10px;
              `
        }
    }
}
`
/**
 *
 * @param onClick
 * @param {boolean} readOnly
 * @param {'go' | 'edit'} type
 * @param {string} as
 * @param {React.ReactNode} children
 */
const SettingsListItemButton = ({
    onClick, readOnly, type, children, as, disabled, ...props
}) => {

    const Icon = useMemo(
        () => {
            switch (type) {
                case 'edit': {
                    return (
                        <SvgIcon
                            name="webview-edit"
                            width="16"
                            height="16"
                            fill="#9e9e9e"
                        />
                    )
                }

                case 'go': {
                    return (
                        <SvgIcon name="webview-back" width="8" height="14" fill="#C2C7CC" />
                    )
                }

                default:
                    return null
            }
        }, [],
    )

    if (readOnly) return null

    return (
        <StyledListItemButton type={type} as={as} onClick={onClick} disabled={disabled} {...props}>
            {children}
            <ButtonIcon width="24" height="24">
                {Icon}
            </ButtonIcon>
        </StyledListItemButton>
    );
};

export default SettingsListItemButton;
