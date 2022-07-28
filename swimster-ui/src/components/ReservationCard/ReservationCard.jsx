import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const style = {
    reservationCardContainer: '',
    reservationCard: 'flex flex-col p-6 space-y-5 border rounded-xl shadow-xl',
    reservationCardHeader: 'text-2xl',
    reservationDetails: 'flex space-x-4 border',
    reservationDateInput: 'rounded-xl p-2',
    reservationTimeInput: 'rounded-xl p-2',
    reserveButton: 'bg-indigo-400 w-1/3 text-center py-3 rounded-lg text-gray-50',
}

const TimePicker = ({ time, setTime, timeType }) => {
    return (
        <DatePicker
            className={style.reservationTimeInput}
            selected={time}
            onChange={time => setTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            placeholderText={timeType}
            timeCaption={timeType}
            dateFormat="hh:mm aa"
        />
    )
}

const CalendarDatePicker = ({ date, setDate }) => {
    return (
        <DatePicker
            className={style.reservationDateInput}
            selected={date}
            placeholderText='Choose a date'
            onChange={date => setDate(date)}
            dateFormat="mm/dd/yyyy"
        />
    )
}

const ReservationCard = ({ register, isSubmitProcessing, handleSubmit, onSubmit }) => {
    const [date, setDate] = useState(new Date())
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())

    useEffect(() => {
        console.log('date: ', date);
        console.log('startTime: ', startTime);
        console.log('endTime: ', endTime);
    }, [date, startTime, endTime])

    return (
        <div className={style.reservationCardContainer}>
            <div className={style.reservationCard}>
                <h1 className={style.reservationCardHeader}>Reserve</h1>
                <form id="hook-form" className={style.reservationDetails} onSubmit={handleSubmit(onSubmit)}>
                    <CalendarDatePicker
                        date={date}
                        setDate={setDate}
                        // {...register("reservationDate")}
                    />
                    <TimePicker
                        time={startTime}
                        setTime={setStartTime}
                        timeType={"Start Time"}
                        // {...register("reservationStartTime")}
                    />
                    <TimePicker
                        time={endTime}
                        setTime={setEndTime}
                        timeType={"End Time"}
                        // {...register("reservationEndTime")}
                    />
                </form>
                {isSubmitProcessing ? (
                    <button type="submit" form="hook-form" className={style.reserveButton}>Loading...</button>
                ) : (
                    <button type="submit" form="hook-form" className={style.reserveButton}>Reserve Now</button>
                )}
            </div>
        </div>
    )
}

export default ReservationCard
