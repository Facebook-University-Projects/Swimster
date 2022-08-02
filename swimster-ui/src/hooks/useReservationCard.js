import { useEffect, useState } from 'react'
import { useAuthContext, isUserAuthenticated } from '../contexts/auth'
import apiClient from '../services/apiClient'
import format from 'date-fns/format'

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

const toLocalTime = date => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()
}

export const useReservationCard = (listingId, setValue) => {
    const { user, initialized } = useAuthContext()
    const [reservations, setReservations] = useState([])
    const [error, setError] = useState(null)
    const [dateSelected, setDateSelected] = useState(new Date())
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [reservedTimes, setReservedTimes] = useState({})

    const isAuthenticated = isUserAuthenticated(user, initialized)

    // returns a list of numbers that have two neightbors with disabled times (have to reserve for at least 1 hr)
    const getGaps = times => {
        const sortedTimes = times.sort()
        const gappedTimes = []
        const EARLIEST_TIME = 9
        const LATEST_TIME = 22

        sortedTimes.forEach((time, index) => {
            if (time - 1 === EARLIEST_TIME) gappedTimes.push(EARLIEST_TIME)
            if (time + 1 === LATEST_TIME) gappedTimes.push(LATEST_TIME)

            if (sortedTimes[index + 1] - sortedTimes[index] === 2) {
                gappedTimes.push(time + 1)
            }
        })

        return gappedTimes
    }

    const checkSingleTimes = reservedTimes => {
        if (reservedTimes.length <= 0) return {}

        // loop from 9 (9 AM) 22 (10 PM)
        // if there is a gap between reserved times
        // add the number to reservedTimnes
        for (let [date, times] of Object.entries(reservedTimes)) {
            const gappedTimes = getGaps(times)
            reservedTimes[date].push(...gappedTimes)
        }

        return reservedTimes
    }

    // function that checks for reserved times and stores it inside a hashmap of date time key-value pairs
    const checkReservedTimes = reservations => {
        if (reservations.length === 0) return {}
        const reservedTimesObj = {}

        reservations.forEach(reservation => {
            const { reservation_date, start_time, end_time } = reservation

            // formats dates and times for comparision
            const formatted_reservation_date = reservation_date.substring(0, 10)
            const formatted_start_time = parseInt(start_time.substring(0, 2))
            const formatted_end_time = parseInt(end_time.substring(0, 2))

            // if the date reserved doesn't exist, create an empty times Objay
            if (!reservedTimesObj.hasOwnProperty(formatted_reservation_date)) {
                reservedTimesObj[formatted_reservation_date] = []

                const numbersBetween = inclusiveInterval(formatted_start_time, formatted_end_time)
                reservedTimesObj[formatted_reservation_date].push(...numbersBetween)
            } else { // if the date reserved exists, push the start/end time intervals into respective Objay
                const numbersBetween = inclusiveInterval(formatted_start_time,  formatted_end_time)
                reservedTimesObj[formatted_reservation_date].push(...numbersBetween)
            }
        })
        return reservedTimesObj
    }

    // sets the registered reservation fields' values for form submission
    const handleReservations = () => {
        setValue("reservationDate", toLocalTime(dateSelected))
        setValue("reservationStartTime", format(startTime, "HH:mm:ss"))
        setValue("reservationEndTime", format(endTime, "HH:mm:ss"))
    }

    // updates the time fields with the corresponding reserved times when user selects a date
    useEffect(() => {
        const result = checkReservedTimes(reservations)
        const reservedTimesWithNoGaps = checkSingleTimes(result)
        setReservedTimes(reservedTimesWithNoGaps)
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
