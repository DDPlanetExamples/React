import styled from "styled-components";

export const StyledSettingsListItem = styled.div`
    
    display: flex;
    justify-content: space-between;
    align-items: center;

    
    font-size: 17px;
    line-height: 1.5;
    padding-bottom: 11px;

    .settings-list__content {
        flex-grow:1;
    }

    .settings-list__title {
        word-break: break-word;
        font-size: 14px;
        line-height: 1.25;
        color: #4D4D4D;
    }
  
    .settings-list__desc {
      word-break: break-word;
    }

    input[type="time"] {
      border: none;
    }

    input[type="time"]::-webkit-calendar-picker-indicator {   
      background: none;
    }  
`;
export const SettingsListItemWrap = styled.div`
  padding: 11px 0 0;
  background: ${props => (props.empty ? "#FFFBED" : "#fff")};
  
  &:not(:last-of-type) > div {
    border-bottom: 1px solid #ececec;
  }
`;
export const StyledCounterWrapper = styled.div`
  padding-bottom: 12px;
`;
export const StyledSettingsValue = styled.span`
  padding-left: 15px;
  flex-shrink: 0;
`;
export const StyledSettingsParamsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
