/* eslint-disable */
import { saveAs } from "file-saver";

export const NewBlob = (data, datatype) => {
    let out;
    try {
        out = new Blob([data], { type: datatype });
    } catch (e) {
        window.BlobBuilder = window.BlobBuilder
            || window.WebKitBlobBuilder
            || window.MozBlobBuilder
            || window.MSBlobBuilder;

        if (e.name == 'TypeError' && window.BlobBuilder) {
            const bb = new BlobBuilder();
            bb.append(data);
            out = bb.getBlob(datatype);
        } else if (e.name == "InvalidStateError") {
            out = new Blob([data], { type: datatype });
        } else {
        }
    }
    return out;
}

export const NETWORK_STATUSES = {
    OK: 200,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    NOT_AUTHORIZED: 403,
    NOT_FOUND: 404,
    NOT_AUTHENTICATED: 401,
    CONFLICT: 409,
    SERVER_ERROR: 500,
}

export const extractTokens = () => [
    document.cookie.match(/\baccess_token=(.*?)(?:;|$)/),
    document.cookie.match(/\brefresh_token=(.*?)(?:;|$)/),
];

export const setCookie = (name, value, options = {}) => {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

export const defaultSuccessPromiseHandler = (resolve, reject) => response => {
    const { StatusCode, JsonResult } = response

    if (StatusCode === NETWORK_STATUSES.OK) {
        try {
            const parsedResult = JSON.parse(JsonResult)
            return resolve(parsedResult)
        } catch (e) {
            return resolve(response)
        }
    }

    if (StatusCode === NETWORK_STATUSES.NO_CONTENT) {
        return resolve(response)
    }

    if (StatusCode === NETWORK_STATUSES.ACCEPTED) {
        return resolve(response)
    }

    if (StatusCode === NETWORK_STATUSES.NOT_AUTHORIZED) {
        return reject(response)
    }

    if (StatusCode === NETWORK_STATUSES.SERVER_ERROR) {
        return reject(response)
    }

    return reject(response)
}

const successRefreshTokenHandler = (resolve, reject) => async (response) => {
    if (response.statusCode === 200 || response.statusCode === 204) {
        resolve()
    } else {
        reject();
    }
}

export const downloadFile = (settings) => {
    const xhr = new XMLHttpRequest();
    const contentTypeIsJson = (request) => /^application\/json/.test(request.getResponseHeader('content-type'))
    xhr.onreadystatechange = function () {
        if (this.readyState === 2 && contentTypeIsJson(this)) {
            this.responseType = 'text';
        }
    };
    xhr.open('POST', settings.url, true);
    const ArrayBuffer = 'arraybuffer';
    xhr.responseType = ArrayBuffer;
    const extractFileName = (xhr) => {
        const disposition = xhr.getResponseHeader('Content-Disposition')
        if (disposition && disposition.indexOf('attachment') !== -1) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
            const utfRegex = /[^UTF\-8]/
            const nonUtfRegex = /[!^UTF\-8]/g
            const matches = filenameRegex.exec(disposition)
            if (matches != null && matches[1]) {
                const res = matches[1].replace(/['"]/g, '')
                const decodeResult = decodeURIComponent(res)
                const matchesUtf = utfRegex.test(decodeURIComponent(res))
                return matchesUtf != null && matchesUtf ? decodeResult.replace(nonUtfRegex, '') : decodeResult
            }
        }
        return ""
    };
    xhr.onload = function () {
        if (settings.onLoaded) {
            settings.onLoaded(this)
        }
        if (this.status === 200 && this.responseType === ArrayBuffer) {
            const filename = extractFileName(xhr);
            const type = xhr.getResponseHeader('Content-Type');
            const blob = NewBlob(this.response, filename.includes('.pdf') ? 'application/pdf' : type)

            window.URL = window.URL || window.webkitURL

            if (window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(blob, filename)

            if (settings.successCallback) settings.successCallback()

            saveAs(blob, filename)
        } else {
            settings.errorCalBack(xhr)
        }
    };
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(settings.data)
}
