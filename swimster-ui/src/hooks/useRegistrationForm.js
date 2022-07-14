import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import  { useForm } from 'react-hook-form'
import apiClient from '../services/apiClient'
import { useAuthContext } from '../contexts/auth'

export const useRegistrationForm = () => {
    const { user, setUser } = useAuthContext()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [form, setForm] = useState({})
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState({})

    // if user is logged in, redirect them to Home
    useEffect(() => {
        if (user?.email) navigate('/')
    }, [user, navigate])

    const onSubmit = async (formData) => {
        setIsProcessing(true)

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.")
            setIsProcessing(false)
            return
        }

        const formattedFormData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            address: formData.address,
            phoneNumber: formData.phoneNumber,
            dateOfBirth: formData.dateOfBirth,
            password: formData.password,
        }

        // makes api request to server backend at the /register endpoint and saves session token
        const { data, error } = await apiClient.registerUser(JSON.stringify(formattedFormData))
        if (data) {
            setUser(data.user)
            apiClient.setToken(data.token)
        } if (error) {
            setError(error.message)
        }

        setIsProcessing(false)
    }

    return {
        form,
        error,
        isProcessing,
        register,
        handleSubmit,
        onSubmit,
    }
}
