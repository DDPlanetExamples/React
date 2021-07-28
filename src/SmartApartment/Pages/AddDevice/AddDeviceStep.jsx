import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Note from "../../Components/Note";
import SettingsSubmenuItem from "../../Components/SettingsSubmenu/SettingsSubmenuItem";
import Header from "../../Components/Header";
import { LayoutWhite } from "../../Components/Layout";

const AddDeviceStep = ({ types, onTypeClick, alertText }) => {
    const { step, ownerId } = useParams();
    const history = useHistory();

    useEffect(() => {
        if ((Number(step) === 2) && !(types || []).length) {
            history.push(`/smartapartment/${ownerId}/add_device`);
        }
    }, [types, step])
    return <>
        <Header onBackClick={() => {
            if (Number(step) === 2) {
                history.push(`/smartapartment/${ownerId}/add_device`)
                return;
            }
            history.push(`/smartapartment/${ownerId}`)
        }}>
            Добавление устройства
        </Header>
        <LayoutWhite fixed isFullHeight style={{ paddingBottom: 75 }}>
            {!!alertText && <Note type='warning' text={alertText}/>}
            <div style={{ marginLeft: 15, marginRight: 15 }}>
                {
                    (types || []).map(item => <SettingsSubmenuItem
                        title={item.title}
                        key={item.name || item.serial}
                        onClick={() => onTypeClick(item)}
                    />)
                }
            </div>
        </LayoutWhite>
    </>
}

export default AddDeviceStep;
