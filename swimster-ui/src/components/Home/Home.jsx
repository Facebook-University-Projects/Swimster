import * as React from 'react'
import ListingsGrid from '../ListingsGrid/ListingsGrid'

const style = {
    home: 'mx-20 mt-20',
}

const Home = ({ listings }) => {
    if (listings.length === 0) return null
    return (
        <div className={style.home}>
            <ListingsGrid listings={listings}/>
        </div>
    )
}

export default Home
