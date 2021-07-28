import React, { useCallback, useContext } from "react";
import WebviewContext from "../../../WebviewContext";
import DeviceSettingsModal from "../DeviceSettingsRoomsModal";

export default () => {
    const { setModal } = useContext(WebviewContext)

    return useCallback(({
        initialSelectedId,
    }) => (
        new Promise(resolve => {
            const closeHandler = (data) => {
                resolve(data);
                setModal(null);
            };
            setModal(
                <DeviceSettingsModal
                    onSave={closeHandler}
                    onClose={closeHandler}
                    initialSelectedId={initialSelectedId}
                />,
            );
        })), []);
}
