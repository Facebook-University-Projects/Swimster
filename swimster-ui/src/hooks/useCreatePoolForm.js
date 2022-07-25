import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import apiClient from '../services/apiClient'
import { useListingsContext } from '../contexts/listings'

export const useCreatePoolForm = () => {
    const { register, setValue, handleSubmit } = useForm()
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

    const onSubmit = async (formData) => {
        setIsSubmitProcessing(true)

        const formattedFormData = {
            title: formData.title,
            address: formData.address,
            description: formData.description,
            price: formData.price,
            totalGuests: formData.totalGuests,
            poolType: formData.poolType,
            hasGrill: false,
            hasInternet: false,
            hasBathroom: false,
            hasTowels: false,
            hasLoungeChairs: false,
            hasHotTub: false,
            hasParking: false,
            images: formData.images
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
            setListings([...listings, data.listing])
            navigate('/')
        }

        setIsSubmitProcessing(false)
    }

    return {
        step,
        nextStep,
        prevStep,
        error,
        isSubmitProcessing,
        register,
        setValue,
        handleSubmit,
        onSubmit,
    }
}
