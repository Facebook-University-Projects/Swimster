import { useEffect, useState } from 'react'
import { useAuthContext, isUserAuthenticated } from '../contexts/auth'
import { useNotification } from './useNotification'
import { useReservationsContext } from '../contexts/reservations'
import { useReserve } from '../hooks/useReserve'
import apiClient from '../services/apiClient'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import format from 'date-fns/format'
import isBefore from 'date-fns/isBefore'
import setHours from 'date-fns/setHours'

export const useReservationCard = (listingId, total_guests) => {
    const { user, initialized } = useAuthContext()
    const { reservation, setReservation } = useReservationsContext()
    const { setError, setInfo } = useNotification()
    const { register, setValue, handleSubmit } = useForm()
    const navigate = useNavigate()
    const [dateSelected, setDateSelected] = useState(new Date())
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [fetchedReservations, setFetchedReservations] = useState([])
    const [isReserving, setIsReserving] = useState(false)

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

    // checks if the end time is later than start time
    const isValidTimes = (date, startTime, endTime) => {
        const start_time = startTime.substring(0, 2)
        const end_time = endTime.substring(0, 2)

        const date_start_time = setHours(new Date(date), start_time)
        const date_end_time = setHours(new Date(date), end_time)

        return isBefore(date_start_time, date_end_time)
    }

    // handler for making a reservation for the current listing
    const handleReservation = async formData => {
        setIsReserving(true)

        // checks if selected end time is later than selected start time
        if (!isValidTimes(formData.reservationDate, formData.startTime, formData.endTime)) {
            setError("cannot choose an earlier end time than start time.")
            setIsReserving(false)
            return
        }

        // checks if no. of guests is allowed by the listing
        if (formData.guests > total_guests) {
            setError(`Cannot have more than ${total_guests} guests.`)
            setIsReserving(false)
            return
        }

        // checks if there's at least one guest coming
        if (formData.guests < 1) {
            setError("Need to have at least 1 guest to reserve.")
            setIsReserving(false)
            return
        }

        const formattedFormData = {
            reservationDate: formData.reservationDate,
            startTime: formData.startTime,
            endTime: formData.endTime,
            guests: parseInt(formData.reservationGuests),
        }

        const { data, error } = await apiClient.createReservation(JSON.stringify(formattedFormData), listingId)
        if (error) {
            setError(error)
            setIsReserving(false)
            return
        }
        if (data?.reservation) {
            setReservation(data.reservation)
            setInfo("You won't be charged yet.")
            setTimeout(() => {
                setIsReserving(false)
                navigate('confirm')
            }, 1000)
        }
    }

    return {
        dateSelected,
        setDateSelected,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        isReserving,
        reservedTimes,
        toLocalTime,
        register,
        setValue,
        handleSubmit,
        handleReservation,
    }
}
