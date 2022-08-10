import { useState, useEffect } from 'react'
import { useAuthContext, isUserAuthenticated } from "../contexts/auth"
import { useListingsContext } from '../contexts/listings'
import { useImagesContext } from '../contexts/images'
import { useNotification } from './useNotification'
import apiClient from "../services/apiClient"

export const useListingDetail = listingId => {
    const { user, initialized } = useAuthContext()
    const { setListing } = useListingsContext()
    const { setMainImage } = useImagesContext()
    const [isFetching, setIsFetching] = useState(false)
    const { setError } = useNotification()
    const [listingImages, setListingImages] = useState([])

    const isAuthenticated = isUserAuthenticated(user, initialized)

    // fetches the listing when on user click
    useEffect(() => {
        const fetchListingData = async () => {
            setIsFetching(true)

            const { data: listingData, error: listingError } = await apiClient.fetchListingById(listingId)
            if (listingError) {
                setError(listingError)
                setIsFetching(false)
                return
            }
            if (listingData?.listing) {
                setListing(listingData.listing)

                const { data: listingImagesData, error: listingImagesError } = await apiClient.fetchImagesFromListing(listingId)
                if (listingImagesError) {
                    setError(listingImagesError)
                    setIsFetching(false)
                    return
                }
                if (listingImagesData?.listingImages) {
                    setListingImages([...listingImagesData.listingImages])
                    // sets image for confirm reservation page
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
        isFetching,
    }
}
