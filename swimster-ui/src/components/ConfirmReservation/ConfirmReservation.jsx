import * as React from 'react'
import { useListingsContext } from '../../contexts/listings'
import { useReservationsContext } from '../../contexts/reservations'
import { useImagesContext } from '../../contexts/images'

const style = {
    confirmReservation: 'grid grid-cols-3 gap-x-5 mx-48 mt-20 font-normal text-md',
    reservationDetailsContainer: 'col-span-2 space-y-10 p-7 rounded-xl shadow-md',
    reservationDetailsHeader: 'font-medium text-2xl',
    confirmReservationListingContainer: 'flex space-x-4',
    reservationDateContainer: '',
    confirmReservationListingImage: 'w-48 h-32 rounded-lg',
    confirmReservationListingContent: 'flex flex-col space-y-5',
    confirmReservationListingPrimary: '',
    confirmReservationListingPoolType: 'font-medium text-gray-400 text-sm',
    confirmReservationListingTitle: 'font-semibold text-lg',
    confirmReservationListingAddress: 'font-semibold text-gray-400',
    confirmReservationListingSecondary: '',
    confirmReservationListingHostDetails: 'font-medium',
    reservationDateHeader: 'text-lg font-semibold',
    reservationDate: '',
    reservationDurationContainer: '',
    reservationDurationHeader: 'text-lg font-semibold',
    reservationDuration: '',
    reservationGuestsContainer: '',
    reservationGuestsHeader: 'text-lg font-semibold',
    reservationGuests: '',
    paymentDetailsContainer: 'col-span-1 flex flex-col space-y-8 p-7 rounded-xl shadow-md',
    paymentDetailsHeader: 'font-medium text-2xl',
    poolCostContainer: '',
    poolCostHeader: 'font-medium',
    poolCost: '',
    confirmReservationDurationContainer: '',
    confirmReservationDurationHeader: 'font-medium',
    confirmReservationDuration: '',
    transactionDetailsBreak: 'h-0.5 bg-gray-200',
    reservationSubtotalContainer: 'flex justify-between',
    reservationSubtotalHeader: 'font-medium text-lg',
    reservationSubtotal: 'text-lg',
    serviceFeesContainer: 'flex justify-between',
    serviceFeesHeader: 'font-medium',
    serviceFees: '',
    taxesContainer: 'flex justify-between',
    taxesHeader: 'font-medium',
    taxes: '',
    totalContainer: 'flex justify-between',
    totalHeader: 'font-medium text-xl',
    total: 'text-lg',
    confirmReservationButton: 'bg-indigo-400 rounded-lg py-3 px-2 text-gray-50',
}

const FEES_RATE = 0.08
const TAX_RATE = 0.0725

const ConfirmReservation = () => {
    const { reservation } = useReservationsContext()
    const { listing } = useListingsContext()
    const { mainImage } = useImagesContext()

    const someDate = new Date(reservation.reservation_date)

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

    return (
        <div className={style.confirmReservation}>
            <div className={style.reservationDetailsContainer}>
                <h1 className={style.reservationDetailsHeader}>Reservation Details</h1>
                <div className={style.confirmReservationListingContainer}>
                    <img className={style.confirmReservationListingImage} src={mainImage} alt="listing main pic" />
                    <div className={style.confirmReservationListingContent}>
                        <div className={style.confirmReservationListingPrimary}>
                            <p className={style.confirmReservationListingPoolType}>{listing.pool_type} Pool</p>
                            <h1 className={style.confirmReservationListingTitle}>{listing.title}</h1>
                            <p className={style.confirmReservationListingAddress}>{listing.address}</p>
                        </div>
                        <div className={style.confirmReservationListingSecondary}>
                            <h2 className={style.confirmReservationListingHostDetails}>Hosted by {listing.first_name} {listing.last_name}</h2>
                        </div>
                    </div>
                </div>
                <div className={style.reservationDateContainer}>
                    <h2 className={style.reservationDateHeader}>Date</h2>
                    <p className={style.reservationDate}>{formattedDate}</p>
                </div>
                <div className={style.reservationDurationContainer}>
                    <h2 className={style.reservationDurationHeader}>Duration</h2>
                    <p className={style.reservationDuration}>{formatTime(reservation.start_time)} to {formatTime(reservation.end_time)}</p>
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
                    <p className={style.poolCost}>${listing.price}</p>
                </div>
                <div className={style.confirmReservationDurationContainer}>
                    <h3 className={style.confirmReservationDurationHeader}>Duration (in hours)</h3>
                    <p className={style.confirmReservationDuration}>{ReservationPaymentDetails.duration} hours</p>
                </div>
                <div className={style.reservationSubtotalContainer}>
                    <h2 className={style.reservationSubtotalHeader}>Subtotal</h2>
                    <p className={style.reservationSubtotal}>${ReservationPaymentDetails.subTotal}</p>
                </div>
                <div className={style.transactionDetailsBreak}></div>
                <div className={style.serviceFeesContainer}>
                    <h2 className={style.serviceFeesHeader}>Service Fees</h2>
                    <p className={style.serviceFees}>${ReservationPaymentDetails.feesTaken}</p>
                </div>
                <div className={style.taxesContainer}>
                    <h2 className={style.taxesHeader}>Taxes</h2>
                    <p className={style.taxes}>${ReservationPaymentDetails.taxesTaken}</p>
                </div>
                <div className={style.transactionDetailsBreak}></div>
                <div className={style.totalContainer}>
                    <h1 className={style.totalHeader}>Total</h1>
                    <p className={style.total}>${reservation?.total}</p>
                </div>
                <button className={style.confirmReservationButton} type="submit" form="hook-form">Reserve</button>
            </div>
        </div>
    )
}

export default ConfirmReservation
