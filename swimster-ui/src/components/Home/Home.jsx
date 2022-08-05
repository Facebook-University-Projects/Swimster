import * as React from 'react'
import ListingsGrid from '../ListingsGrid/ListingsGrid'

const style = {
    home: 'mx-20 mt-20',
}

const Home = () => {
    return (
        <div className={style.home}>
            <ListingsGrid />
        </div>
    )
}

export default Home
