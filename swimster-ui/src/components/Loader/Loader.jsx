import * as React from 'react'
import { TailSpin } from 'react-loader-spinner'

const style = {
    loader: "flex justify-center"
}

export const Loader = ({ height, width }) => {
    return (
        <TailSpin
            height={height}
            width={width}
            color="#fff"
            wrapperClass={style.loader}
        />
    )
}
