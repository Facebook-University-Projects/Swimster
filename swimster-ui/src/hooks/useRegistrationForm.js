import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import  { useForm } from 'react-hook-form'
import apiClient from '../services/apiClient'

export const useRegistrationForm = ({ user, setUser }) => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [form, setForm] = useState({})
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState({})

    // useEffect(() => {
    //     // if user is logged in, redirect them to Home
    //     if (user?.email) navigate('/')
    // }, [user, navigate])

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

        const { data, error } = await apiClient.registerUser(JSON.stringify(formattedFormData))
        if (data) {
            console.log('data: ', data);
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
