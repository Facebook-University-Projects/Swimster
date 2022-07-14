import * as React from 'react'
import Listing from '../Listing/Listing'

const style = {
    listingsGrid: 'grid grid-cols-4 gap-6',
}

const ListingsGrid = ({ listings }) => {
    return (
        <div className={style.listingsGrid}>
            {listings?.map(listing => {
                return (
                    <Listing key={listing.id - 1} listing={listing}/>
                )
            })}
        </div>
    )
}

export default ListingsGrid
