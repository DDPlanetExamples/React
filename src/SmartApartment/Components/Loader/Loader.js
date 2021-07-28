import React from 'react'
import Lottie from 'lottie-react-web'
import vmesteHomeCycled from './vmesteHomeCycled.json'

const Loader = ({ className = 'loader', style = {}, size = 48 }) => (
    <div className={className} style={style}>
        <Lottie
            options={{
                animationData: vmesteHomeCycled,
            }}
            width={size}
            height={size}
        />
    </div>
)

export default Loader;
