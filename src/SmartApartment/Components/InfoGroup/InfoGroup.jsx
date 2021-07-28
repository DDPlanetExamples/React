import React from 'react';
import styled from "styled-components";
import LinkOutside from '../Common/LinkOutside';

const InfoGroupHTML = ({
    items = [],
    link,
}) => (
    <InfoGroup>
        {
            items.map(({ name, value }) => (value ? <InfoGroupItem
                key={name + value}
            >
                <div className="name">{name}</div>
                <div className="value">{value}</div>
            </InfoGroupItem> : null))
        }
        {
            link && <InfoGroupItem>
                <div className="name">
                    <LinkOutside
                        onClick={(e) => {
                            e.stopPropagation();
                            const event = new CustomEvent('open_file', {
                                detail: link,
                            });

                            document.dispatchEvent(event);
                        }}
                    >Скачать документацию</LinkOutside>
                </div>
                <div className="value" />
            </InfoGroupItem>
        }
    </InfoGroup>
)

const InfoGroupItem = styled.div`
  padding: 2px 0;
  display: flex;
  
  .name {
    flex-grow:1;
  }
  
  .value {
    margin-left:10px;
  }
`

const InfoGroup = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height:1.5;
  margin-bottom:10px;
  letter-spacing: -0.009em;
  color: #4D4D4D;
  border-top: 1px solid #D9D9D9;
  padding-top: 15px;
`;

export default InfoGroupHTML
