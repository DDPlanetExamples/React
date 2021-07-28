import React, { useCallback, useState } from 'react';
import CheckboxCustom from "../Components/Common/CheckboxCustom";

import SvgIcon from '../Components/Common/SvgIcon';

import Button from '../Components/Common/Button';
import ButtonIcon from '../Components/Common/ButtonIcon';
import ButtonToggle from '../Components/Common/ButtonToggle';

import LinkCustom from '../Components/Common/LinkCustom';
import LinkOutside from '../Components/Common/LinkOutside';

import InputRange from '../Components/Common/InputRange';

import BadgeStatus from '../Components/Common/BadgeStatus';
import ButtonRed from '../Components/Common/ButtonRed';
import ButtonWhite from '../Components/Common/ButtonWhite';

const UIKIT = () => {
    const [inputValue, setInputValue] = useState(0);
    const [isToggleOn, setIstoggleOn] = useState(false);

    const onChangeRange = (e) => {
        setInputValue(e.target.value)
    }
    const onButtonClick = () => {
        alert("Hellow World!");
    }
    const onButtonRedClick = () => {
        onButtonClick()
    }
    const onButtonWhiteclick = () => {
        onButtonClick()
    }
    const onToggleChange = useCallback(() => {
        setIstoggleOn(prev => !prev)
    }, [isToggleOn])
    const onLinkClick = () => {
        onButtonClick();
    }
    return (
        <div style={{ padding: "50px 100px" }}>

            <h2>InputRange</h2>

            <InputRange
                title="Яркость"
                onChangeRange={onChangeRange}
                inputValue={inputValue}
            />

            <br/>
            <br/>

            <h2>Кнопки</h2>

            <Button
                disabled={false}
                className="button"
                onClick={onButtonClick}
            >
                Кнопка
            </Button>

            <ButtonRed
                disabled={false}
                className="button"
                onClick={onButtonRedClick}
            >
                Кнопка
            </ButtonRed>

            <ButtonWhite
                className="button"
                onClick={onButtonWhiteclick}
            >
                Кнопка
            </ButtonWhite>
            <br/><br/>

            <b>С иконками </b>
            16x16
            <ButtonIcon
                disabled={false}
                className="button"
            >
                <SvgIcon
                    name="webview-edit"
                    width="16"
                    height="16"
                    fill="#9e9e9e" />
            </ButtonIcon>

            Произвольная, например: 46x46
            <ButtonIcon
                disabled={false}
                className="button"
                width="46"
                height="46"
            >
                <SvgIcon
                    name="webview-edit"
                    width="46"
                    height="46"
                    fill="#9e9e9e" />
            </ButtonIcon>

            <div style={{ padding: "10px 0" }}>

                <ButtonToggle
                    disabled={false}
                    active={isToggleOn}
                    style={{ margin: "5px" }}
                    onChange={onToggleChange}
                >
                    Кнопка
                </ButtonToggle>

                <ButtonToggle
                    disabled={true}
                    active={false}
                    style={{ margin: "5px" }}
                    onChange={onToggleChange}
                >
                    Кнопка
                </ButtonToggle>

                <ButtonToggle
                    disabled={true}
                    active={true}
                    style={{ margin: "5px" }}
                    onChange={onToggleChange}
                >
                    Кнопка
                </ButtonToggle>

            </div>

            <div style={{ display: 'flex' }}>
                <CheckboxCustom title='Л' />
                <CheckboxCustom title='Г' />
                <CheckboxCustom title='Б' />
                <CheckboxCustom title='Т' />
            </div>

            <h2>Ссылки</h2>
            <LinkCustom
                onLinkClick={onLinkClick}
            >
                Обычная
            </LinkCustom>
            <br/>
            <LinkOutside
                onLinkClick={onLinkClick}
            >
                Внешняя
            </LinkOutside>

            <h2>Статусы</h2>

            <BadgeStatus value="Выкл" />

        </div>
    )
}

export default UIKIT
