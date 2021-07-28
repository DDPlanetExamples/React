import React from 'react';

const SvgIcon = ({
    name,
    ...props
}) => (
    <svg {...props} >
        <use href={`#${name}`}/>
    </svg>
)

export default SvgIcon
