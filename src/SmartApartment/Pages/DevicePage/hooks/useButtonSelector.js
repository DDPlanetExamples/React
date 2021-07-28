import React, { useCallback, useContext } from "react";
import WebviewContext from "../../../WebviewContext";
import DeviceButtonsModal from "../DeviceButtonsModal";

export default (signalId) => {
    const { setModal } = useContext(WebviewContext)

    return useCallback(() => (
        new Promise(resolve => {
            const closeHandler = (data) => {
                resolve(data);
                setModal(null);
            };
            setModal(
                <DeviceButtonsModal
                    onSave={closeHandler}
                    onClose={closeHandler}
                    signalId={signalId}
                />,
            );
        })), []);
}
