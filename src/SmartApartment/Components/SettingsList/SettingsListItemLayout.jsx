import React, { memo, useMemo } from "react";
import {
    filter, find, includes, join, map, toString,
} from "lodash";
import moment from "moment";
import { DEVICE_CONTROL_ALL_TYPES } from "../../Pages/DevicePage/DEVICE_CONSTANTS";
import useDeviceChange from "../../Pages/DevicePage/hooks/useDeviceChange";
import ButtonToggle from "../Common/ButtonToggle";
import InputRange from "../Common/InputRange";
import SettingsListItemButton from "./SettingsListItemButton";
import ActionList from "../ActionList/ActionList";
import {
    SettingsListItemWrap,
    StyledCounterWrapper,
    StyledSettingsListItem,
    StyledSettingsParamsItem,
    StyledSettingsValue,
} from "./styled";
import LinkCustom from "../Common/LinkCustom";

const SettingsListItemLayout = (props) => {
    const [{
        hasGraph,
        id,
        measure,
        readOnly,
        readOnlyLabel,
        label,
        title,
        type,
        value,
        list,
        control: {
            min, max, params, delta,
        },
        name,
        withoutToggle,
        canAdjustButton,
        online,
    }, onChange, handleChangeName, handleParamsChange, adjustButton, goToGraph, loadingUpdate] = useDeviceChange(props)

    const Layout = useMemo(() => {
        switch (type) {
            case DEVICE_CONTROL_ALL_TYPES.TOGGLE:
                return (
                    <StyledSettingsListItem>
                        <div className="settings-list__content">
                            <div className="settings-list__desc">
                                {title}
                            </div>
                            {canAdjustButton && (
                                <LinkCustom onClick={adjustButton} as='button'>
                                    Настроить кнопку
                                </LinkCustom>
                            )}
                        </div>
                        <SettingsListItemButton onClick={handleChangeName('title')} readOnly={readOnlyLabel} type='edit'/>
                        <ButtonToggle onChange={onChange} checked={value === '1'} id={id} disabled={loadingUpdate || !!readOnly || !online}/>
                        {hasGraph && <SettingsListItemButton type='go' onClick={goToGraph} />}
                    </StyledSettingsListItem>
                )

            case DEVICE_CONTROL_ALL_TYPES.COUNTER:
                return (
                    <StyledCounterWrapper>
                        <StyledSettingsListItem>
                            <div className="settings-list__content">
                                <div className="settings-list__desc">
                                    {title}
                                </div>
                            </div>
                            <SettingsListItemButton onClick={handleChangeName('title')} readOnly={readOnlyLabel} type='edit' />
                            <StyledSettingsValue>{value} {measure}</StyledSettingsValue>
                            {hasGraph && <SettingsListItemButton type='go' onClick={goToGraph} />}
                        </StyledSettingsListItem>
                        <InputRange value={value} min={min} max={max} onChange={onChange} disabled={!online} />
                        {canAdjustButton && (
                            <LinkCustom onClick={adjustButton} as='button'>
                                Настроить кнопку
                            </LinkCustom>
                        )}
                    </StyledCounterWrapper>
                )

            case DEVICE_CONTROL_ALL_TYPES.LIST:
                return (
                    <StyledSettingsListItem>
                        <div className="settings-list__content">
                            <div className="settings-list__title">
                                {label}
                            </div>
                            <div className="settings-list__desc">
                                {find(list, { id: Number(value) })?.title || 'Не выбрано'}
                            </div>
                        </div>
                        <SettingsListItemButton onClick={handleChangeName('label')} readOnly={readOnlyLabel} type='edit' />
                        <SettingsListItemButton onClick={onChange} readOnly={readOnly} type='edit' disabled={!online}/>
                    </StyledSettingsListItem>
                )

            case DEVICE_CONTROL_ALL_TYPES.COMBOLIST: {
                const parsedValue = value ? map(JSON.parse(value), toString) : []
                return (
                    <StyledSettingsListItem>
                        <div className="settings-list__content">
                            <div className="settings-list__title">
                                {label}
                            </div>
                            <div className="settings-list__desc">
                                {join(map(filter(list, i => includes(parsedValue, i.id)), 'title'), ', ') || 'Не выбрано'}
                            </div>
                        </div>
                        <SettingsListItemButton onClick={handleChangeName('label')} readOnly={readOnlyLabel} type='edit' />
                        <SettingsListItemButton onClick={onChange} readOnly={readOnly} type='edit' disabled={!online}/>
                    </StyledSettingsListItem>
                )
            }

            case DEVICE_CONTROL_ALL_TYPES.TIME: {
                const formattedValue = moment(
                    +moment().startOf('day')
                    + value * 1000,
                ).format('HH:mm')

                return (
                    <StyledSettingsListItem>
                        <div className="settings-list__content">
                            <div className="settings-list__title">
                                {label}
                            </div>
                            <div className="settings-list__desc">
                                <span>
                                    {formattedValue}
                                </span>
                                <input
                                    style={{
                                        width: 0, height: 0, fontSize: 0, position: 'absolute', zIndex: -1,
                                    }}
                                    type="time"
                                    id={label}
                                    value={formattedValue}
                                    onChange={onChange}
                                    disabled={!online}
                                />
                            </div>
                        </div>
                        <SettingsListItemButton readOnly={readOnly} type='edit' as='label' htmlFor={label} />
                    </StyledSettingsListItem>
                )
            }

            case DEVICE_CONTROL_ALL_TYPES.ACTION_TIME:
                return (
                    <StyledSettingsListItem>
                        <div className="settings-list__content">
                            <div className="settings-list__title">
                                {label}
                            </div>
                            <div className="settings-list__desc">
                                <span>{params[0].value}</span>
                                <input
                                    type="time"
                                    id={label}
                                    value={params[0].value}
                                    onChange={handleParamsChange}
                                    onBlur={handleParamsChange}
                                    style={{
                                        position: 'absolute', width: 0, height: 0, fontSize: 0, zIndex: -1,
                                    }}
                                    disabled={!online}
                                />
                            </div>
                        </div>
                        <SettingsListItemButton readOnly={readOnly} type='edit' as='label' htmlFor={label}/>
                        {
                            !withoutToggle && <ButtonToggle
                                onChange={onChange} checked={value === '1'} id={id}
                                disabled={loadingUpdate || !online} />
                        }
                    </StyledSettingsListItem>
                )

            case DEVICE_CONTROL_ALL_TYPES.CUSTOM:
            case DEVICE_CONTROL_ALL_TYPES.ROOM:
                return (
                    <StyledSettingsListItem>
                        <div className="settings-list__content">
                            <div className="settings-list__title">
                                {label}
                            </div>
                            <div className="settings-list__desc">
                                {title}
                            </div>
                        </div>
                        <SettingsListItemButton onClick={handleChangeName('title')} readOnly={readOnlyLabel} type='edit' />
                        <SettingsListItemButton onClick={onChange} readOnly={readOnly} type='edit' />
                        {hasGraph && <SettingsListItemButton type='go' onClick={goToGraph} />}
                    </StyledSettingsListItem>
                )

            case DEVICE_CONTROL_ALL_TYPES.JALOUSIE_MAIN: {
                const IMAGES = {
                    Открыть: 'src-open-arrow',
                    Стоп: 'src-pause',
                    Закрыть: 'src-close-arrow',
                }
                return (
                    <ActionList
                        loading={loadingUpdate}
                        actions={map(params, (p, i) => ({
                            svg: IMAGES[p.title],
                            id: i,
                            title: p.title,
                            stroke: '#283593',
                            fill: '#283593',
                            onClick: () => onChange(p.action.url),
                        }))}
                    />
                )
            }

            case DEVICE_CONTROL_ALL_TYPES.ACTION_SUN: {
                const calculatedTime = moment(params[1].value, 'HH:mm')
                    .add(params[0].value, 'm')
                    .format('HH:mm')

                return (
                    <StyledCounterWrapper>
                        <StyledSettingsListItem>
                            <div className="settings-list__content">
                                <div className="settings-list__desc">
                                    {title}
                                </div>
                            </div>
                            <ButtonToggle
                                onChange={onChange}
                                checked={value === '1'}
                                id={id}
                                disabled={loadingUpdate || !online}/>
                        </StyledSettingsListItem>
                        <StyledSettingsParamsItem>
                            <span>{params[0].value} мин</span>
                            <StyledSettingsValue>
                                {`${name === 'sunrise-close' ? 'Закроется в ' : 'Откроется в '} ${calculatedTime}`}
                            </StyledSettingsValue>
                        </StyledSettingsParamsItem>
                        <InputRange
                            value={params[0].value}
                            min={-delta}
                            max={delta}
                            step={delta / 24}
                            onChange={handleParamsChange}
                            disabled={!online}/>
                    </StyledCounterWrapper>
                )
            }

            case DEVICE_CONTROL_ALL_TYPES.UNIREMOTE:
                return null;

            default:
                return (
                    <StyledSettingsListItem>
                        <div className="settings-list__content">
                            <div className="settings-list__title">
                                {label}
                            </div>
                            <div className="settings-list__desc">
                                {value} {measure}
                            </div>
                        </div>
                        {
                            !props.dontShowControls
                            && <>
                                <SettingsListItemButton onClick={handleChangeName('label')} readOnly={readOnlyLabel} type='edit' />
                                <SettingsListItemButton onClick={onChange} readOnly={readOnly} type='edit' />
                            </>
                        }
                        {hasGraph && <SettingsListItemButton type='go' onClick={goToGraph} />}
                    </StyledSettingsListItem>
                )
        }
    }, [value, title, loadingUpdate, params, label])

    return (
        <SettingsListItemWrap empty={props.empty}>
            {Layout}
        </SettingsListItemWrap>
    );
}

export default memo(SettingsListItemLayout)
