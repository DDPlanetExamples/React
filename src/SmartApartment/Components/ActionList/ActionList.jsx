import React from "react";
import styled from "styled-components";
import { map } from "lodash";
import Button from "../Common/Button";
import SvgIcon from "../Common/SvgIcon";

const ActionList = ({ actions, loading }) => (
    <StyledActionList>
        {
            map(actions, item => (
                <Button
                    disabled={loading}
                    className="action-button"
                    onClick={item.onClick}
                    key={item.id}>
                    <SvgIcon name={item.svg} height="24" fill={item.fill} stroke={item.stroke}/>
                    {item.title}
                </Button>
            ))
        }
    </StyledActionList>
);

const StyledActionList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 8px;

  .action-button {
    width: calc(33.333% - 5.3px);
    max-width: 300px;
    padding: 12px 0;

    background: #F0F2F4;
    color: #283593;
    margin-right: 5.3px;
    flex-direction: column;
    display: flex;
    align-items: center;
      
    > svg {
      width: 100%;
    }
  }

  .action-button:last-child {
    margin-right: 0;
  }

`;

export default ActionList;
