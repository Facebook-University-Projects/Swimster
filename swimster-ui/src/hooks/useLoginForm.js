import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import  { useForm } from 'react-hook-form'
import { useAuthContext } from '../contexts/auth'
import { useNotification } from './useNotification'

export const useLoginForm = () => {
    const { handlers: authHandlers, user } = useAuthContext()
    const { setError } = useNotification()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isSubmitProcessing, setIsSubmitProcessing] = useState(false)
    const navigate = useNavigate()

    // if user is logged in, redirect them to Home
    useEffect(() => {
        if (user?.email) navigate('/menu')
    }, [user, navigate])

    const onSubmit = async (formData) => {
        setIsSubmitProcessing(true)

        const formattedFormData = {
            email: formData.email,
            password: formData.password,
        }

        // makes api request to server backend at the /login endpoint and saves session token
        await authHandlers.loginUser(JSON.stringify(formattedFormData))
        setIsSubmitProcessing(false)
    }

    return {
        errors,
        isSubmitProcessing,
        register,
        handleSubmit,
        onSubmit,
    }
}
