import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import apiClient from '../services/apiClient'
import { useNotification } from './useNotification'
import { useListingsContext } from '../contexts/listings'

export const useCreatePoolForm = () => {
    const { register, setValue, resetField, handleSubmit } = useForm({ reValidateMode: "onChange"})
    const { listings, setListings } = useListingsContext()
    const { setSuccess, setError } = useNotification()
    const navigate = useNavigate()
    const [isSubmitProcessing, setIsSubmitProcessing] = useState(false)
    const [step, setStep] = useState(1)
    const [isValidAddress, setIsValidAddress] = useState(false)
    const [selectedImages, setSelectedImages] = useState([])

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(curr => curr - 1)

    // converts amenity strings to pascal case
    const toPascalCase = string => {
        return `${string}`
        .toLowerCase()
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(
        new RegExp(/\s+(.)(\w*)/, 'g'),
        ($1, $2, $3) => `${$2.toUpperCase() + $3}`
        )
        .replace(new RegExp(/\w/), s => s.toUpperCase());
    }

    // packages image files and listing id into one payload
    const imageFormDataPayload = (formData, listingId) => {
        const fd = new FormData()
        for (let poolImage of formData.poolImages) {
            fd.append(poolImage.name, poolImage, poolImage.name)
        }
        fd.append("listingId", listingId)
        return fd
    }

    const onSubmit = async formData => {
        setIsSubmitProcessing(true)

        // checks if title has no more than 35 characters
        if (formData.title.length > 35 || formData.title.length < 10) {
            setError("title must be between 10 and 35 characters long.")
            setIsSubmitProcessing(false)
            return
        }

        // checks if user selected google dropdown option
        if (!formData.address || !isValidAddress) {
            setError("Invalid address. Make sure to select it on the dropdown.")
            setIsSubmitProcessing(false)
            return
        }

        // checks if description has no more than 250 characters
        if (formData.description.length > 350 || formData.description.length < 25) {
            setError("description must be between 25 and 350 characters long.")
            setIsSubmitProcessing(false)
            return
        }

        // checks that price is not negative
        if (!formData.price || formData.price < 0) {
            setError("price must be a positive number.")
            setIsSubmitProcessing(false)
            return
        }

        // checks that total guests is not negative and greater than 0
        if (!formData.totalGuests || formData.totalGuests <= 0) {
            setError("there must be at least 1 guest.")
            setIsSubmitProcessing(false)
            return
        }

        // checks if there's at least 5 images and at most 10
        if (formData.poolImages.length < 5 || formData.poolImages.length > 10) {
            setError("must upload between 5 and 10 images.")
            setIsSubmitProcessing(false)
            return
        }

        // checks that at least 1 amenity is selected
        if (formData.amenities < 1) {
            setError("must select at least 1 amenity.")
            setIsSubmitProcessing(false)
            return
        }

        // checks if the pool width is not a negative number
        if (!formData.poolWidth || formData.poolWidth <= 0) {
            setError("invalid pool width.")
            setIsSubmitProcessing(false)
            return
        }

        // checks if the pool length is not a negative number
        if (!formData.poolLength || formData.poolLength <= 0) {
            setError("invalid pool length.")
            setIsSubmitProcessing(false)
            return
        }

        // checks if the pool depth is not a negative number
        if (!formData.poolDepth || formData.poolDepth <= 0) {
            setError("invalid pool depth.")
            setIsSubmitProcessing(false)
            return
        }

        const formattedFormData = {
            title: formData.title,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            lat: formData.lat,
            lng: formData.lng,
            description: formData.description,
            price: formData.price,
            totalGuests: formData.totalGuests,
            poolType: formData.poolType,
            poolLength: formData.poolLength,
            poolWidth: formData.poolWidth,
            poolDepth: formData.poolDepth,
            hasGrill: false,
            hasInternet: false,
            hasBathroom: false,
            hasTowels: false,
            hasLoungeChairs: false,
            hasHotTub: false,
            hasParking: false,
        }

        // checks chosen amenities and returns property as true if found
        for (let amenity of formData.amenities) {
            const formattedAmenity = "has".concat(toPascalCase(amenity))

            if (formattedFormData.hasOwnProperty(formattedAmenity)) {
                formattedFormData[formattedAmenity] = true
            }
        }

        // makes api request to server at listings/ endpoint
        const { data, error } = await apiClient.createListing(
            JSON.stringify(formattedFormData)
        )
        if (error) setError(error)
        if (data?.listing) {
            const images = imageFormDataPayload(formData, data.listing.id)
            // makes api request to server at images/ endpoint
            const { data: imageData, error: imageError } = await apiClient.createImages(images)
            if (imageError) setError(imageError)
            if (imageData?.images) {
                setListings([...listings, data.listing])
                navigate('/menu')
                setSuccess("Pool Listing Created!")
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
        }

        setIsSubmitProcessing(false)
    }

    return {
        step,
        nextStep,
        prevStep,
        setIsValidAddress,
        isSubmitProcessing,
        selectedImages,
        setSelectedImages,
        register,
        setValue,
        resetField,
        handleSubmit,
        onSubmit,
    }
}
