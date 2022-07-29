import { useEffect, useState } from 'react'
import { useAuthContext, isUserAuthenticated } from '../contexts/auth'
import apiClient from '../services/apiClient'
import format from 'date-fns/format'
import { setHours, setMinutes } from 'date-fns'

// helper function that checks for all numbers in between
const inclusiveInterval = (startNum, endNum) => {
    let result = [startNum]
    let idx = startNum + 1
    while (idx <= endNum) {
        result.push(idx)
        idx++
    }

    return result
}

export const useReservationCard = (listingId, setValue) => {
    const { user, initialized } = useAuthContext()
    const [reservations, setReservations] = useState([])
    const [error, setError] = useState(null)
    const [dateSelected, setDateSelected] = useState(new Date())
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [reservedTimes, setReservedTimes] = useState([])

    const isAuthenticated = isUserAuthenticated(user, initialized)

    // function that checks for reserved times and stores it inside a hashmap of date time key-value pairs
    const checkReservedTimes = reservations => {
        if (reservations.length === 0) return {}
        const reservedTimesArr = {}

        reservations.forEach(reservation => {
            const { reservation_date, start_time, end_time } = reservation

            // formats dates and times for comparision
            const formatted_reservation_date = reservation_date.substring(0, 10)
            const formatted_start_time = parseInt(start_time.substring(0, 2))
            const formatted_end_time = parseInt(end_time.substring(0, 2))

            // if the date reserved doesn't exist, create an empty times array
            if (!reservedTimesArr.hasOwnProperty(formatted_reservation_date)) {
                reservedTimesArr[formatted_reservation_date] = []

                const numbersBetween = inclusiveInterval(formatted_start_time, formatted_end_time)
                reservedTimesArr[formatted_reservation_date].push(...numbersBetween)
            } else { // if the date reserved exists, push the start/end time intervals into respective array
                const numbersBetween = inclusiveInterval(formatted_start_time,  formatted_end_time)
                reservedTimesArr[formatted_reservation_date].push(...numbersBetween)
            }
        })
        return reservedTimesArr
    }

    // sets the registered reservation fields' values for form submission
    const handleReservations = () => {
        setValue("reservationDate", dateSelected.toISOString())
        setValue("reservationStartTime", format(startTime, "HH:mm:ss"))
        setValue("reservationEndTime", format(endTime, "HH:mm:ss"))
    }

    // updates the time fields with the corresponding reserved times when user selects a date
    useEffect(() => {
        const result = checkReservedTimes(reservations)
        setReservedTimes(result)
    }, [dateSelected, reservations])

    useEffect(() => {
        const fetchReservationsFromListing = async () => {
            const { data, error } = await apiClient.fetchReservationsFromListing(listingId)
            if (error) setError(error)
            if (data?.reservationsForListing) setReservations([...data.reservationsForListing])
        }

        if (isAuthenticated) fetchReservationsFromListing()
    }, [listingId, isAuthenticated])

    return {
        dateSelected,
        setDateSelected,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        reservedTimes,
        handleReservations,
    }
}
