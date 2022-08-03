import * as React from 'react'
import { useConfirmReservation } from '../../hooks/useConfirmReservation'
import { style } from './style'

const ConfirmReservation = () => {
    const {
        formattedDate,
        formatTime,
        ReservationPaymentDetails,
        listing,
        reservation,
        handleConfirmReservation,
        mainImage
    } = useConfirmReservation()

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
                <button className={style.confirmReservationButton} type="submit" onClick={handleConfirmReservation}>Reserve</button>
            </div>
        </div>
    )
}

export default ConfirmReservation
