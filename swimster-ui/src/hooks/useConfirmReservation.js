import { useState } from 'react'
import { useListingsContext } from '../contexts/listings'
import { useReservationsContext } from '../contexts/reservations'
import { useImagesContext } from '../contexts/images'
import apiClient from '../services/apiClient'
import { useNavigate } from 'react-router-dom'
import { useNotification } from './useNotification'

// numbers chosen relative to Airbnb service fee, which is 14%
const FEES_RATE = 0.08
// tax rate in California
const TAX_RATE = 0.0725

export const useConfirmReservation = () => {
    const { reservation } = useReservationsContext()
    const { listing } = useListingsContext()
    const { mainImage } = useImagesContext()
    const { setSuccess, setError } = useNotification()
    const [isConfirming, setIsConfirming] = useState(false)
    const navigate = useNavigate()

    const reservationDate = new Date(reservation.reservation_date)

    // formatting date by weekday, month, day, year in words
    const formattedDate = reservationDate.toLocaleString(
        'default',
        {
            weekday: 'long',
            month: 'long',
            day: '2-digit',
            year: 'numeric'
        }
    )

    // formatting military time into human-readable time
    const formatTime = time => {
        time = time.split(':');

        let hours = Number(time[0])
        let minutes = Number(time[1])

        let timeValue

        if (hours > 0 && hours <= 12) timeValue= "" + hours
        else if (hours > 12) timeValue= "" + (hours - 12)
        else if (hours == 0) timeValue= "12"

        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes
        timeValue += (hours >= 12) ? " p.m." : " a.m."
        return timeValue
    }

    // calculates subtotal, fees, taxes, and total
    const calculateCost = (reservation, listing) => {
        const startTimeNum = Number(reservation.start_time.substring(0, 2))
        const endTimeNum = Number(reservation.end_time.substring(0, 2))

        const duration = endTimeNum - startTimeNum
        const subTotal = Number(listing.price) * duration
        const feesTaken = subTotal * FEES_RATE
        const taxesTaken = subTotal * TAX_RATE

        return {
            duration: duration,
            subTotal: subTotal.toFixed(2),
            feesTaken: feesTaken.toFixed(2),
            taxesTaken: taxesTaken.toFixed(2),
        }
    }

    const ReservationPaymentDetails = calculateCost(reservation, listing)

    // confirms the reservation in the backend
    const handleConfirmReservation = async () => {
        setIsConfirming(true)

        const { data, error } = await apiClient.confirmReservation(reservation.id, listing.id)
        if (error) {
            setError(error)
            setIsConfirming(false)
            return
        }
        if (data?.confirmedReservation) {
            setSuccess("Successfully reserved listing!")
            setTimeout(() => {
                setIsConfirming(false)
                navigate('/menu')
                window.location.reload()
            }, 2500)
        }
    }

    return {
        isConfirming,
        formattedDate,
        formatTime,
        ReservationPaymentDetails,
        listing,
        reservation,
        handleConfirmReservation,
        mainImage,
    }
}
