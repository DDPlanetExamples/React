import React from 'react';
import ReactDOM from 'react-dom';
import App from './SmartApartment/App/App';
import StyledInit from "./SmartApartment/Components/Common/StyledInit";
import { installMoment } from "./SmartApartment/globalHelpers";

// функция для загрузки всех SVG картинок в проект. из загруженных картинок формируется спрайт (!) не удалять - тег - svg sprites
function requireAll(r) {
    r.keys().forEach(r);
}
//Backend  т.к. туда попадают svg после экспорта, минимизированные , без ошибок
//это для поиска id="__SVG_SPRITE_NODE__"
requireAll(require.context('./Icons/', true, /\.svg$/))

installMoment()

ReactDOM.render(
    <React.StrictMode>
        <StyledInit />
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
