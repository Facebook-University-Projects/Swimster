import React, { useEffect, useState } from 'react'
import Listing from '../Listing/Listing'
import ListingSearchInput from '../ListingSearchInput/ListingSearchInput'
import { Link } from 'react-router-dom'
import apiClient from '../../services/apiClient'
import { useAuthContext, isUserAuthenticated } from '../../contexts/auth'
import { useNotification } from '../../hooks/useNotification'
import { useListingsContext } from '../../contexts/listings'

const style = {
    listingsGrid: 'col-span-2 grid grid-cols-2 mt-10 gap-x-6 px-6 gap-y-8 max-h-screen overflow-y-auto',
}

const ListingsGrid = () => {
    const { user, initialized } = useAuthContext()
    const { listings, filteredListings, setFilteredListings } = useListingsContext()
    const { setError } = useNotification()
    const [mainImages, setMainImages] = useState([])

    const isAuthenticated = isUserAuthenticated(user, initialized)

    useEffect(() => {
        const fetchMainImages = async () => {
            const { data, error } = await apiClient.fetchMainImagesFromListings()
            if (error) {
                setError(error)
                // TODO: set animation for loading images
                return
            }
            if (data?.allImages) setMainImages([...data.allImages])

        }

        if (isAuthenticated) fetchMainImages()
    }, [listings, isAuthenticated])

    return (
        <div className={style.listingsGrid}>
            <ListingSearchInput mainImages={mainImages} setMainImages={setMainImages} listings={listings} setFilteredListings={setFilteredListings}/>
            {filteredListings?.map((listing, index) => {
                return (
                    <Link to={`/listings/${listing.id}`} key={index}>
                        <Listing listing={listing} />
                    </Link>
                )
            })}
        </div>
    )
}

export default ListingsGrid
