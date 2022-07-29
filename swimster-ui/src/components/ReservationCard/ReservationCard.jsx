import * as React from 'react'
import { useReservationCard } from '../../hooks/useReservationCard'
import { useParams } from 'react-router-dom'
import CalendarDatePicker from '../CalendarDatePicker/CalendarDatePicker'
import CalendarTimePicker from '../CalendarTimePicker/CalendarTimePicker'

const style = {
    reservationCardContainer: '',
    reservationCard: 'flex flex-col p-6 space-y-5 border rounded-xl shadow-xl',
    reservationCardHeader: 'text-2xl',
    reservationDetails: 'flex space-x-4',
    reserveButton: 'bg-indigo-400 w-1/3 text-center py-3 rounded-lg text-gray-50',
}

const ReservationCard = ({ setValue, isSubmitProcessing, handleSubmit, onSubmit }) => {
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
                <h1 className={style.reservationCardHeader}>Reserve</h1>
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
