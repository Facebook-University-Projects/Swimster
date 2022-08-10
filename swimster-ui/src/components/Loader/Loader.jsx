import * as React from 'react'
import { TailSpin } from 'react-loader-spinner'

const style = {
    loader: "flex justify-center"
}

export const Loader = ({ height, width }) => {
    console.log('width: ', width);
    console.log('height: ', height);
    return (
        <TailSpin
            height={height}
            width={width}
            color="#fff"
            wrapperClass={style.loader}
        />
    )
}
