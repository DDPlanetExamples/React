import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router";
import { Provider } from "use-http";
import { camelize } from "../globalHelpers";
import WebviewContext, { BuildWebviewContextFunction } from '../WebviewContext';
import Loader from "../Components/Loader/Loader";
import { setCookie } from "../helpers/network";
import AppRouting from "./AppRouting";
import AppModalContainer from "./AppModalContainer";

export default () => {
    const query = new URLSearchParams(useLocation().search);
    const history = useHistory();
    const { ownerId } = useParams()

    const [isPrepared, setIsPrepared] = useState(false);

    const [contextTool, setContextTool] = useState({
        ...BuildWebviewContextFunction(),
    });
    const opts = useMemo(() => ({
        interceptors: {
            request: ({ options }) => {
                const { body } = options
                let parsedBody;
                try {
                    parsedBody = JSON.parse(body)
                } catch {
                    return {
                        ...options,
                        body: JSON.stringify({
                            ownerId,
                        }),
                    }
                }

                return {
                    ...options,
                    body: JSON.stringify({
                        ...parsedBody,
                        ownerId,
                    }),
                }
            },
            response: async ({ response }) => {
                if (response.data?.StatusCode === 401) {
                    history.push(`/smartapartment/${ownerId}/stub#invalidtokens`);
                }
                if (response.data?.StatusCode === 403) {
                    history.push(`/smartapartment/${ownerId}/stub`);
                }
                if (response.data?.StatusCode >= 400) {
                    throw new Error(response.data)
                }
                if (response.data?.StatusCode === 200) {
                    return {
                        ...response,
                        data: response.data?.JsonResult && camelize(JSON.parse(response.data?.JsonResult)),
                    };
                }
                return response;
            },
        },
    }), [ownerId]);

    useEffect(() => {
        const at = query.get('access_token');
        const rt = query.get('refresh_token');
        if (at || rt) {
            setCookie('access_token', at);
            setCookie('refresh_token', rt);
        }
        setIsPrepared(true);
    }, []);
    return <Provider options={opts}>
        <WebviewContext.Provider value={contextTool}>
            <AppModalContainer
                setContextTool={setContextTool}
            >
                {
                    !isPrepared
                        ? <Loader />
                        : <AppRouting />
                }
            </AppModalContainer>
        </WebviewContext.Provider>
    </Provider>
};
