import React, { useMemo } from "react";
import { map } from 'lodash'
import { Line } from "react-chartjs-2";

// this is to prevent repeating tick values
// eslint-disable-next-line func-names
const middlewareToMakeTicksUnique = function (value, index, values) {
    const currentLabel = this.getLabelForValue(value)
    const prevLabel = this.getLabelForValue(values[index - 1]?.value)
    if (index === 0 || currentLabel !== prevLabel) return currentLabel

    return null;
}

const GraphPage = ({ data, transformX }) => {
    const options = useMemo(() => (
        {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
            elements: {
                point: {
                    radius: 0,
                },
            },
            scales: {
                y: {
                    ticks: {
                        callback: value => `${value} ${data.measure}`,
                    },
                },
                x: {
                    ticks: {
                        callback: middlewareToMakeTicksUnique,
                    },
                },
            },
        }
    ), [])

    const dataForGraph = useMemo(() => (
        {
            labels: map(data.archive, ({ x }) => transformX(x)),
            datasets: [
                {
                    data: map(data.archive, 'y'),
                    fill: {
                        target: 'origin',
                        above: 'rgba(232, 232, 232, 0.5)', // Area will be red above the origin
                        below: 'rgba(232, 232, 232, 0.5)', // And blue below the origin
                    },
                    backgroundColor: '#283593',
                    borderColor: '#283593',
                },
            ],
        }
    ), [data])

    return (
        <Line data={dataForGraph} options={options} height={200} type='line' />
    );
};

export default GraphPage;
