import { useState, useEffect } from 'react'
import { useAuthContext, isUserAuthenticated } from "../contexts/auth"
import apiClient from "../services/apiClient"

export const useListingDetail = listingId => {
    const { user, initialized } = useAuthContext()
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [listing, setListing] = useState({})

    const isAuthenticated = isUserAuthenticated(user, initialized)

    useEffect(() => {
        const fetchListing = async () => {
            setIsFetching(true)

            const { data, error } = await apiClient.fetchListingById(listingId)
            if (error) setError(error)
            if (data?.listing) setListing(data.listing)

            setIsFetching(false)
        }

        if (isAuthenticated) fetchListing()
    }, [listingId, isAuthenticated])

    return {
        listing,
        error,
        isFetching,
    }
}
