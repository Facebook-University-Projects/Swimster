import { useState, useEffect } from 'react'
import { useAuthContext, isUserAuthenticated } from "../contexts/auth"
import { useListingsContext } from '../contexts/listings'
import { useImagesContext } from '../contexts/images'
import apiClient from "../services/apiClient"

export const useListingDetail = listingId => {
    const { user, initialized } = useAuthContext()
    const { setListing } = useListingsContext()
    const { setMainImage } = useImagesContext()
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [listingImages, setListingImages] = useState([])

    const isAuthenticated = isUserAuthenticated(user, initialized)

    // fetches the listing when on user click
    useEffect(() => {
        const fetchListingData = async () => {
            setIsFetching(true)

            const { data: listingData, error: listingError } = await apiClient.fetchListingById(listingId)
            if (error) setError(listingError)
            if (listingData?.listing) {
                setListing(listingData.listing)

                const { data: listingImagesData, error: listingImagesError } = await apiClient.fetchImagesFromListing(listingId)
                if (listingImagesError) setError(listingImagesError)
                if (listingImagesData?.listingImages) {
                    setListingImages([...listingImagesData.listingImages])
                    if (listingImagesData?.listingImages[0]?.image_url) setMainImage(listingImagesData.listingImages[0].image_url)
                }
            }
        }

        if (isAuthenticated) {
            fetchListingData()
        }
    }, [listingId, isAuthenticated])

    return {
        listingImages,
        error,
        isFetching,
    }
}
