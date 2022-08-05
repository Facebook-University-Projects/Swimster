import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import apiClient from '../services/apiClient'
import { useListingsContext } from '../contexts/listings'

export const useCreatePoolForm = () => {
    const { register, setValue, resetField, handleSubmit } = useForm()
    const { listings, setListings } = useListingsContext()
    const navigate = useNavigate()
    const [isSubmitProcessing, setIsSubmitProcessing] = useState(false)
    const [error, setError] = useState({})
    const [step, setStep] = useState(1)
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
                navigate('/')
            }
        }

        setIsSubmitProcessing(false)
    }

    return {
        step,
        nextStep,
        prevStep,
        error,
        isSubmitProcessing,
        setSelectedImages,
        register,
        setValue,
        resetField,
        handleSubmit,
        onSubmit,
    }
}
