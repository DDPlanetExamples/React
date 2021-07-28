import React, { useEffect, useRef } from 'react';

/**
 * Хук с пропуском componentDidMount. Приблизительный аналог componentDidUpdate.
 * Требуется в случае, если нужно ждать подгрузки данных.
 * @param {function} fn - исполняемая функция
 * @param {Array} deps - массив зависимостей
 * @param {function} fnExit - функция при unmount
 */
const useEffectWithSkipDidMount = (fn, deps, fnExit) => {
    const didMountRef = useRef(false);
    useEffect(() => {
        if (didMountRef.current) {
            fn();
        } else {
            didMountRef.current = true;
        }

        return () => fnExit && fnExit()
    }, deps);
};

export default useEffectWithSkipDidMount;
