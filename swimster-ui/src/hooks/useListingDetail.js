import { useState, useEffect } from 'react'
import { useAuthContext, isUserAuthenticated } from "../contexts/auth"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import apiClient from "../services/apiClient"

export const useListingDetail = listingId => {
    const { user, initialized } = useAuthContext()
    const { register, handleSubmit } = useForm()
    const [isFetching, setIsFetching] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [listing, setListing] = useState({})

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

        if (isAuthenticated) fetchListing()
    }, [listingId, isAuthenticated])

    // handler for making a reservation for the current listing
    const onSubmit = async formData => {
        setIsProcessing(true)

        const formattedFormData = {
            reservationDate: formData.reservationDate,
            startTime: formData.reservationStartTime,
            endTime: formData.reservationEndTime,
            guests: 4, // value to be changed
        }

        const { data, error } = await apiClient.createReservation(JSON.stringify(formattedFormData), listingId)
        if (error) setError(error)
        if (data?.reservation) {
            // navigate('/')
        }
        setIsProcessing(false)
    }

    return {
        listing,
        error,
        isFetching,
        isProcessing,
        register,
        handleSubmit,
        onSubmit,
    }
}
