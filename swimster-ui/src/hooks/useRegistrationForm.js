import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import  { useForm } from 'react-hook-form'
import { useAuthContext } from '../contexts/auth'
import { useNotification } from './useNotification'
import differenceInYears from 'date-fns/differenceInYears'

export const useRegistrationForm = () => {
    const { handlers: authHandlers, user } = useAuthContext()
    const { setSuccess, setError } = useNotification()
    const navigate = useNavigate()
    const { register, setValue, handleSubmit } = useForm({ reValidateMode: "onChange" })
    const [isValidAddress, setIsValidAddress] = useState(false)
    const [isSubmitProcessing, setIsSubmitProcessing] = useState(false)

    // if user is logged in, redirect them to Home
    useEffect(() => {
        if (user?.email) {
            navigate('/menu')
            setSuccess("Registered!")
        }
    }, [user, navigate])

    const onSubmit = async (formData) => {
        setIsSubmitProcessing(true)

        // checks if email is valid
        if (formData.email.indexOf('@') <= 0) {
            setError("Invalid email.")
            setIsSubmitProcessing(false)
            return
        }

        // checks if user selected google dropdown option
        if (!isValidAddress) {
            setError("Invalid address. Make sure to select it on the dropdown.")
            setIsSubmitProcessing(false)
            return
        }

        // checks if phone number is valid
        if (formData.phoneNumber.length > 15 || formData.phoneNumber.length < 7) {
            setError("Invalid phone number")
            setIsSubmitProcessing(false)
            return
        }

        // checks if user is at least 18 years old
        if (differenceInYears(Date.now(), new Date(formData.dateOfBirth)) < 18) {
            setError("Must be at least 18 years old.")
            setIsSubmitProcessing(false)
            return
        }

        // checks if passwords are the same for security
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.")
            setIsSubmitProcessing(false)
            return
        }

        const formattedFormData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            lat: formData.lat,
            lng: formData.lng,
            phoneNumber: formData.phoneNumber,
            dateOfBirth: formData.dateOfBirth,
            password: formData.password,
        }

        // makes api request to server backend at the /register endpoint and saves session token
        await authHandlers.registerUser(JSON.stringify(formattedFormData))
        setIsSubmitProcessing(false)
    }

    return {
        setIsValidAddress,
        isSubmitProcessing,
        register,
        setValue,
        handleSubmit,
        onSubmit,
    }
}
