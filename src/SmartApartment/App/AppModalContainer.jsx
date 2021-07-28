import React, { useCallback, useEffect, useMemo } from "react";
import { noop } from 'lodash'
import SelectManyModal from "../Components/Modals/SelectManyModal";
import { useModal } from "../Components/useModal";
import InputModal from "../Components/Modals/InputModal";
import PopupPage from "../Components/Modals/PopUp/PopupPage";
import PopupActionModal from "../Components/Modals/PopUp/PopupActionModal";
import SelectModal from "../Components/Modals/SelectModal";

const AppModalContainer = ({ children, setContextTool }) => {
    const [Modal, setModal] = useModal();
    const [AlertModal, setAlertModal] = useModal('pop');
    const [InputModalHooked, setInputModal] = useModal()
    const [SelectManyModalWrapped, setSelectManyModal] = useModal()

    const input = useCallback(({
        initialValue = '',
        title = '',
        note = noop,
        placeholder = '',
        inputTitle,
    }) => new Promise((resolve, reject) => {
        setInputModal(<InputModal
            inputTitle={inputTitle}
            placeholder={placeholder}
            note={note}
            initialValue={initialValue}
            onClose={() => {
                setInputModal(null);
                reject(initialValue);
            }}
            onSave={(value) => {
                setInputModal(null);
                resolve(value);
            }}
            title={title}
        />);
    }), []);

    const select = useCallback(({
        list, initialSelectedId, title, control = () => null,
    }) => new Promise(resolve => {
        const closeHandler = (data) => {
            resolve(data);
            setModal(null);
        };
        setModal(<SelectModal
            onSave={closeHandler}
            onClose={closeHandler}
            list={list}
            initialSelectedId={initialSelectedId}
            title={title}
            control={control}
        />);
    }));

    const selectMany = useCallback(({ list, initialSelectedId, title }) => new Promise(resolve => {
        const closeHandler = (data) => {
            resolve(data);
            setSelectManyModal(null);
        };
        setSelectManyModal(<SelectManyModal
            onSave={closeHandler}
            onClose={closeHandler}
            list={list}
            initialSelectedId={initialSelectedId}
            title={title}
        />);
    }));

    const alert = useCallback((title, text) => new Promise(resolve => {
        const onClose = () => {
            setAlertModal(null);
            resolve();
        }
        setAlertModal(<PopupPage
            onClose={onClose}
            title={title}
            text={text}
            buttons={[{
                text: 'OK',
                action: onClose,
            }]}
        />)
    }), [])

    const confirm = useCallback((title, text) => new Promise(resolve => {
        const onClose = () => {
            setAlertModal(null);
            resolve(false);
        }
        const onConfirm = () => {
            setAlertModal(null);
            resolve(true);
        }
        setAlertModal(<PopupPage
            onClose={onClose}
            title={title}
            text={text}
            buttons={[{
                text: 'Отменить',
                action: onClose,
            }, {
                text: 'Подтвердить',
                action: onConfirm,
            }]}
        />)
    }), []);

    const actionPopup = useCallback((actionList) => new Promise(resolve => {
        setAlertModal(<PopupActionModal
            onClose={() => {
                setAlertModal(null);
                resolve(null);
            }}
            actionList={actionList}
            onActionClick={(value) => {
                setAlertModal(null);
                resolve(value);
            }}
        />);
    }), [])

    const contextToolWithModals = useMemo(() => ({
        setModal,
        input,
        alert,
        confirm,
        actionPopup,
        select,
        selectMany,
    }), [setModal]);

    useEffect(() => {
        setContextTool((context) => ({
            ...context,
            ...contextToolWithModals,
        }));
    }, [contextToolWithModals])

    return (
        <>
            {children}
            {Modal}
            {AlertModal}
            {InputModalHooked}
            {SelectManyModalWrapped}
        </>
    )
};

export default AppModalContainer;
