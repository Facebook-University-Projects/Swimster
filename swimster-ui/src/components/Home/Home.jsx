import * as React from 'react'
import ListingsGrid from '../ListingsGrid/ListingsGrid'
import PoolMap from '../PoolMap/PoolMap'

const style = {
    home: 'grid grid-cols-4 h-screen',
}

const Home = () => {
    return (
        <div className={style.home}>
            <ListingsGrid />
            <PoolMap />
        </div>
    )
}

export default Home
