import * as React from 'react'
import Listing from '../Listing/Listing'
import { Link } from 'react-router-dom'

const style = {
    listingsGrid: 'grid grid-cols-4 gap-6',
}

const ListingsGrid = ({ listings }) => {
    return (
        <div className={style.listingsGrid}>
            {listings?.map(listing => {
                return (
                    <Link to={`listings/${listing.id}`} key={listing.id - 1}>
                        <Listing listing={listing}/>
                    </Link>
                )
            })}
        </div>
    )
}

export default ListingsGrid
