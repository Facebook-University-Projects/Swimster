import React, { useEffect, useState } from 'react'
import Listing from '../Listing/Listing'
import { Link } from 'react-router-dom'
import apiClient from '../../services/apiClient'
import { useAuthContext, isUserAuthenticated } from '../../contexts/auth'

const style = {
    listingsGrid: 'grid grid-cols-4 gap-6',
}

const ListingsGrid = ({ listings }) => {
    const { user, initialized } = useAuthContext()
    const [error, setError] = useState({})
    const [mainImages, setMainImages] = useState([])

    const isAuthenticated = isUserAuthenticated(user, initialized)

    useEffect(() => {
        const fetchMainImages = async () => {
            const { data, error } = await apiClient.fetchMainImagesFromListings()
            if (error) setError(error)
            if (data?.allImages) setMainImages([...data.allImages])

        }

        if (isAuthenticated) fetchMainImages()
    }, [listings, isAuthenticated])


    return (
        <div className={style.listingsGrid}>
            {listings?.map((listing, index) => {
                return (
                    <Link to={`listings/${listing.id}`} key={index}>
                        <Listing listing={listing} listingImage={mainImages[index]}/>
                    </Link>
                )
            })}
        </div>
    )
}

export default ListingsGrid
