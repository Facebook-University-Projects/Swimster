import { useState, useEffect } from 'react'
import { useAuthContext, isUserAuthenticated } from "../contexts/auth"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import apiClient from "../services/apiClient"

export const useListingDetail = listingId => {
    const { user, initialized } = useAuthContext()
    const { register, setValue, handleSubmit } = useForm()
    const [isFetching, setIsFetching] = useState(false)
    const [isSubmitProcessing, setIsSubmitProcessing] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [listing, setListing] = useState({})
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
                if (listingImagesData?.listingImages) setListingImages([...listingImagesData.listingImages])
            }
        }

        if (isAuthenticated) {
            fetchListingData()
        }
    }, [listingId, isAuthenticated])

    // handler for making a reservation for the current listing
    const onSubmit = async formData => {
        setIsSubmitProcessing(true)

        const formattedFormData = {
            reservationDate: formData.reservationDate,
            startTime: formData.reservationStartTime,
            endTime: formData.reservationEndTime,
            guests: parseInt(formData.reservationGuests),
        }

        const { data, error } = await apiClient.createReservation(JSON.stringify(formattedFormData), listingId)
        if (error) setError(error)
        if (data?.reservation) {
            navigate('/')
        }
        setIsSubmitProcessing(false)
    }

    return {
        listing,
        listingImages,
        error,
        isFetching,
        isSubmitProcessing,
        register,
        setValue,
        handleSubmit,
        onSubmit,
    }
}
