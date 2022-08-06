import { useEffect, useState } from 'react'
import { useAuthContext, isUserAuthenticated } from '../contexts/auth'
import { useReservationsContext } from '../contexts/reservations'
import { useReserve } from '../hooks/useReserve'
import apiClient from '../services/apiClient'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import format from 'date-fns/format'

export const useReservationCard = listingId => {
    const { user, initialized } = useAuthContext()
    const { reservation, setReservation } = useReservationsContext()
    const { register, setValue, handleSubmit } = useForm()
    const navigate = useNavigate()
    const [dateSelected, setDateSelected] = useState(new Date())
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [guests, setGuests] = useState(1)
    const [fetchedReservations, setFetchedReservations] = useState([])
    const [error, setError] = useState(null)
    const [isSubmitProcessing, setIsSubmitProcessing] = useState(false)


    const isAuthenticated = isUserAuthenticated(user, initialized)

    const { reservedTimes, setReservedTimes, checkSingleTimes, checkReservedTimes, toLocalTime } = useReserve({ reservation })

    // updates the time fields with the corresponding reserved times when user selects a date
    useEffect(() => {
        const result = checkReservedTimes(fetchedReservations)
        const reservedTimesWithNoGaps = checkSingleTimes(result)
        setReservedTimes(reservedTimesWithNoGaps)
    }, [dateSelected, fetchedReservations])

    // updates date and times for every selection change user makes
    useEffect(() => {
        setValue("reservationDate", toLocalTime(dateSelected))
        if (startTime !== "") setValue("startTime", format(startTime, "HH:mm:ss"))
        if (endTime !== "") setValue("endTime", format(endTime, "HH:mm:ss"))
    }, [dateSelected, startTime, endTime])

    // fetches reservations from listing on first user click
    useEffect(() => {
        const fetchReservationsFromListing = async () => {
            const { data, error } = await apiClient.fetchReservationsFromListing(listingId)
            if (error) setError(error)
            if (data?.reservationsForListing) setFetchedReservations([...data.reservationsForListing])
        }

        if (isAuthenticated) fetchReservationsFromListing()
    }, [listingId, isAuthenticated])

    // handler for making a reservation for the current listing
    const handleReservation = async formData => {
        setIsSubmitProcessing(true)

        const formattedFormData = {
            reservationDate: formData.reservationDate,
            startTime: formData.startTime,
            endTime: formData.endTime,
            guests: parseInt(formData.reservationGuests),
        }

        const { data, error } = await apiClient.createReservation(JSON.stringify(formattedFormData), listingId)
        if (error) setError(error)
        if (data?.reservation) {
            setReservation(data.reservation)
            navigate('confirm')
        }

        setIsSubmitProcessing(false)
    }

    return {
        dateSelected,
        setDateSelected,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        setGuests,
        reservedTimes,
        toLocalTime,
        register,
        setValue,
        handleSubmit,
        handleReservation,
    }
}
