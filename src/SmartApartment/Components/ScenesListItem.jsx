import React from 'react';
import styled from "styled-components";
import SvgIcon from './Common/SvgIcon';

const ScenesListItemHTML = ({
    className,
    svgName,
    title,
    onClick,
}) => (
    <div className={className ? `scenes-list__item ${className}` : "scenes-list__item"}
        onClick={onClick}
    >
        <div className="scenes-list__item-wrap">
            <div className="scenes-list__icon">
                <SvgIcon name={svgName} height='32px' fill="#000"/>
            </div>

            <div className="scenes-list__title">
                {title}
            </div>
        </div>
    </div>

)

const ScenesListItem = styled(ScenesListItemHTML)`
& {
    margin-right: 10px;
    display: flex;
}

&.active .scenes-list__item-wrap {
    border-color: #4CAF50;
    flex: 0 0 auto;
}

&:last-child {
    padding-right: 16px;
}

&:first-child {
    padding-left: 16px;
}

.scenes-list__item-wrap {
    width: 104px;
    height: 126px;
    box-sizing: border-box;
    padding: 12px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    background: #fff;
    border-radius: 14px;
    box-shadow: 0px 1px 24px rgba(0, 0, 0, 0.14);
    border: 2px solid transparent;
    overflow: hidden;
 }

 .scenes-list__icon svg {
    max-width: 32px;
 }


 .scenes-list__title {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: -0.009em;

    white-space: pre-wrap;
    word-break: break-word;
 }
`

export default ScenesListItem
