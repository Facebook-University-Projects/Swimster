import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import  { useForm } from 'react-hook-form'
import apiClient from '../services/apiClient'
import { useAuthContext } from '../contexts/auth'

export const useLoginForm = () => {
    const { user, setUser } = useAuthContext()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState({})
    const [form, setForm] = useState({})

    useEffect(() => {
        // if user is logged in, redirect them to Home
        if (user?.email) navigate('/')
    }, [user, navigate])

    const onSubmit = async (formData) => {
        setIsProcessing(true)

        const formattedFormData = {
            email: formData.email,
            password: formData.password,
        }

        const { data, error } = await apiClient.loginUser(JSON.stringify(formattedFormData))
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
