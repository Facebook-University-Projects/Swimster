import * as React from 'react'
import { useReservationsContext } from '../../contexts/reservations'

const style = {
    confirmReservation: 'grid grid-cols-3 gap-x-5 mx-48 mt-20 font-normal text-md',
    reservationDetailsContainer: 'col-span-2 space-y-8 p-7 rounded-xl shadow-md',
    reservationDetailsHeader: 'font-medium text-2xl',
    reservationDateContainer: '',
    reservationDateHeader: 'font-semibold',
    reservationDate: '',
    reservationDurationContainer: '',
    reservationDurationHeader: 'font-semibold',
    reservationDuration: '',
    reservationGuestsContainer: '',
    reservationGuestsHeader: 'font-semibold',
    reservationGuests: '',
    paymentDetailsContainer: 'col-span-1 flex flex-col space-y-8 p-7 rounded-xl shadow-md',
    paymentDetailsHeader: 'font-medium text-2xl',
    poolCostContainer: '',
    poolCostHeader: 'font-medium',
    poolCost: '',
    confirmReservationDurationContainer: '',
    confirmReservationDurationHeader: 'font-medium',
    confirmReservationDuration: '',
    reservationSubtotalContainer: 'flex justify-between border',
    reservationSubtotalHeader: 'font-medium',
    reservationSubtotal: '',
    serviceFeesContainer: 'flex justify-between border',
    serviceFeesHeader: 'font-medium',
    serviceFees: '',
    taxesContainer: 'flex justify-between border',
    taxesHeader: 'font-medium',
    taxes: '',
    totalContainer: 'flex justify-between border',
    totalHeader: 'font-medium',
    total: '',
    confirmReservationButton: 'bg-indigo-400 rounded-lg py-3 px-2 text-gray-50',
}

const ConfirmReservation = () => {
    const { reservation } = useReservationsContext()

    const someDate = new Date(reservation.dateSelected)

    const formattedDate = someDate.toLocaleString(
        'default',
        {
            weekday: 'long',
            month: 'long',
            day: '2-digit',
            year: 'numeric'
        }
    )

    const formatTime = time => {
        time = time.split(':'); // convert to array

        // fetch
        let hours = Number(time[0])
        let minutes = Number(time[1])

        // calculate
        let timeValue

        if (hours > 0 && hours <= 12) timeValue= "" + hours
        else if (hours > 12) timeValue= "" + (hours - 12)
        else if (hours == 0) timeValue= "12"

        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes  // get minutes
        timeValue += (hours >= 12) ? " p.m." : " a.m."  // get AM/PM
        return timeValue
    }

    console.log('formattedDate: ', formattedDate);
    return (
        <div className={style.confirmReservation}>
            <div className={style.reservationDetailsContainer}>
                <h1 className={style.reservationDetailsHeader}>Reservation Details</h1>
                <div className={style.reservationDateContainer}>
                    <h2 className={style.reservationDateHeader}>Date</h2>
                    <p className={style.reservationDate}>{formattedDate}</p>
                </div>
                <div className={style.reservationDurationContainer}>
                    <h2 className={style.reservationDurationHeader}>Duration</h2>
                    <p className={style.reservationDuration}>{formatTime(reservation.startTime)} to {formatTime(reservation.endTime)}</p>
                </div>
                <div className={style.reservationGuestsContainer}>
                    <h2 className={style.reservationGuestsHeader}>Guests</h2>
                    <p className={style.reservationGuests}>{reservation.guests} people</p>
                </div>
            </div>
            <div className={style.paymentDetailsContainer}>
                <h1 className={style.paymentDetailsHeader}>Payment Details</h1>
                <div className={style.poolCostContainer}>
                    <h3 className={style.poolCostHeader}>Pool Cost per Hour</h3>
                    <p className={style.poolCost}>$60</p>
                </div>
                <div className={style.confirmReservationDurationContainer}>
                    <h3 className={style.confirmReservationDurationHeader}>Duration (in hours)</h3>
                    <p className={style.confirmReservationDuration}>5 hours</p>
                </div>
                <div className={style.reservationSubtotalContainer}>
                    <h2 className={style.reservationSubtotalHeader}>Subtotal</h2>
                    <p className={style.reservationSubtotal}>$300</p>
                </div>
                <div className={style.serviceFeesContainer}>
                    <h2 className={style.serviceFeesHeader}>Service Fees</h2>
                    <p className={style.serviceFees}>$15.37</p>
                </div>
                <div className={style.taxesContainer}>
                    <h2 className={style.taxesHeader}>Taxes</h2>
                    <p className={style.taxes}>$10.22</p>
                </div>
                <div className={style.totalContainer}>
                    <h1 className={style.totalHeader}>Total</h1>
                    <p className={style.total}>$335</p>
                </div>
                <button className={style.confirmReservationButton} type="submit" form="hook-form">Reserve</button>
            </div>
        </div>
    )
}

export default ConfirmReservation
