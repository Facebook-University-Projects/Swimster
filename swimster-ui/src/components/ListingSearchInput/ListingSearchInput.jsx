import React, { useState } from 'react'
import { searchListingsByAddress } from '../../contexts/listings'

const style = {
    listingSearchInputContainer: 'col-span-2 h-14 flex justify-evenly',
    listingSearchInput: 'h-full bg-gray-200 rounded-xl pl-3',
}

const ListingSearchInput = ({ listings, setFilteredListings }) => {
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = e => {
        setSearchQuery(e.target.value)
        const filtered = listings.filter(listing => listing.city.toLowerCase().includes(searchQuery.toLowerCase()))
        setFilteredListings(filtered)
    }

    return (
        <div className={style.listingSearchInputContainer}>
            <input className={style.listingSearchInput} onChange={handleSearch} type="search" placeholder="Location" value={searchQuery}/>
            <input className={style.listingSearchInput} type="search" placeholder="Date"/>
            <input className={style.listingSearchInput} type="search" placeholder="Times"/>
            <input className={style.listingSearchInput} type="search" placeholder="Guests"/>
        </div>
    )
}

export default ListingSearchInput
