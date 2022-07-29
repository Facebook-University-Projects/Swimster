import * as React from 'react'
import { useReservationCard } from '../../hooks/useReservationCard'
import { useParams } from 'react-router-dom'
import CalendarDatePicker from '../CalendarDatePicker/CalendarDatePicker'
import CalendarTimePicker from '../CalendarTimePicker/CalendarTimePicker'

const style = {
    reservationCardContainer: 'col-span-1 px-4',
    reservationCard: 'grid grid-cols-2 p-6 border rounded-xl shadow-xl',
    reservationCardHeader: 'col-span-2 text-2xl',
    reservationDetailsContainer: 'col-span-2 mt-4',
    reservationDetails: 'grid grid-cols-2 gap-2',
    reservationGuestsContainer: 'mt-4 col-span-2',
    reservationGuestsHeader: 'col-span-2 text-xl',
    reservationGuestsDescription: 'col-span-2 text-xs text-gray-400',
    reservationGuestsInput: 'col-span-2 w-full mt-4 rounded-lg border-2 border-gray-200 p-2',
    reserveButton: 'mt-6 col-span-2 bg-indigo-400 py-3 rounded-lg text-gray-50',
}

const ReservationCard = ({ register, setValue, isSubmitProcessing, handleSubmit, onSubmit }) => {
    const { listingId } = useParams()

    const {
        dateSelected,
        setDateSelected,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        reservedTimes,
        handleReservations,
    } = useReservationCard(listingId, setValue)

    return (
        <div className={style.reservationCardContainer}>
            <div className={style.reservationCard}>
                <h1 className={style.reservationCardHeader}>Reservation</h1>
                <div className={style.reservationDetailsContainer}>
                    <form id="hook-form" className={style.reservationDetails} onSubmit={handleSubmit(onSubmit)}>
                        <CalendarDatePicker
                            dateSelected={dateSelected}
                            setDateSelected={setDateSelected}
                        />
                        <CalendarTimePicker
                            time={startTime}
                            setTime={setStartTime}
                            timeType={"Start Time"}
                            reservedTimes={reservedTimes}
                            dateSelected={dateSelected}
                        />
                        <CalendarTimePicker
                            time={endTime}
                            setTime={setEndTime}
                            timeType={"End Time"}
                            reservedTimes={reservedTimes}
                            dateSelected={dateSelected}
                        />
                    </form>
                    <div className={style.reservationGuestsContainer}>
                        <h1 className={style.reservationGuestsHeader}>Guests</h1>
                        <div className={style.reservationGuestsDescription}>Choose the number of people you plan to bring</div>
                        <input
                            type="number"
                            placeholder='Guests'
                            className={style.reservationGuestsInput}
                            {...register("reservationGuests")}
                        />
                    </div>
                </div>
                {isSubmitProcessing ? (
                    <button type="submit" form="hook-form" className={style.reserveButton}>Loading...</button>
                ) : (
                    <button type="submit" form="hook-form" className={style.reserveButton} onClick={handleReservations}>Reserve Now</button>
                )}
            </div>
        </div>
    )
}

export default ReservationCard
