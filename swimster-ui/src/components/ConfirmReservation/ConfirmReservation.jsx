import * as React from 'react'
import { useReservationsContext } from '../../contexts/reservations'

const style = {}

const ConfirmReservation = () => {
    const { reservation } = useReservationsContext()

    return (
        <div>
            <div>date: {reservation.dateSelected}</div>
            <div>start: {reservation.startTime}</div>
            <div>end: {reservation.endTime}</div>
            <div>guests: {reservation.guests}</div>
            <button type="submit" form="hook-form">Reserve</button>
        </div>
    )
}

export default ConfirmReservation
