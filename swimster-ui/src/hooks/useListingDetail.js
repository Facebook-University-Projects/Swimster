import { useState, useEffect } from 'react'
import { useAuthContext, isUserAuthenticated } from "../contexts/auth"
import apiClient from "../services/apiClient"

export const useListingDetail = listingId => {
    const { user, initialized } = useAuthContext()
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [listing, setListing] = useState({})
    const [listingImages, setListingImages] = useState([])

    const isAuthenticated = isUserAuthenticated(user, initialized)

    // fetches the listing when on user click
    useEffect(() => {
        const fetchListing = async () => {
            setIsFetching(true)

            const { data, error } = await apiClient.fetchListingById(listingId)
            if (error) setError(error)
            if (data?.listing) setListing(data.listing)

            setIsFetching(false)
        }

        const fetchImagesFromListing = async () => {
            const { data, error } = await apiClient.fetchImagesFromListing(listingId)
            if (error) setError(error)
            if (data?.listingImages) setListingImages([...data.listingImages])
        }

        if (isAuthenticated) {
            fetchListing()
            fetchImagesFromListing()
        }
    }, [listingId, isAuthenticated])

    return {
        listing,
        listingImages,
        error,
        isFetching,
    }
}
