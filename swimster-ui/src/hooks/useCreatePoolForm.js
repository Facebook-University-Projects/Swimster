import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import apiClient from '../services/apiClient'
import { useListingsContext } from '../contexts/listings'

export const useCreatePoolForm = () => {
    const { register, handleSubmit } = useForm()
    const { listings, setListings } = useListingsContext()
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState({})
    const [step, setStep] = useState(1)
    const [selectedImages, setSelectedImages] = useState([])

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(curr => curr - 1)

    const onSubmit = async (formData) => {
        setIsProcessing(true)

        // amenities value will be changed in milestone 2
        const formattedFormData = {
            title: formData.title,
            address: formData.address,
            description: formData.description,
            price: formData.price,
            totalGuests: formData.totalGuests,
            poolType: formData.poolType,
            hasBbqGrill: false,
            hasInternet: false,
            hasBathroom: false,
            hasTowels: false,
            hasLoungeChairs: false,
            hasHotTub: false,
            hasParking: false,
            images: formData.images
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

        setIsProcessing(false)
    }

    return {
        step,
        nextStep,
        prevStep,
        error,
        isProcessing,
        register,
        handleSubmit,
        onSubmit,
    }
}
