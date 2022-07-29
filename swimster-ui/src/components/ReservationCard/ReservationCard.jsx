import React, { useEffect, useState } from 'react'
import { useReservationCard } from '../../hooks/useReservationCard'
import { useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import format from 'date-fns/format'
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

const TimePicker = ({ time, setTime, timeType, reservedTimes, dateSelected }) => {
    // filter out times less than the current time
    const formattedDate = format(dateSelected, "yyyy-MM-dd")

    const excludedTimes = () => {
        const arr = []

        if (Object.keys(reservedTimes).length) {
            reservedTimes[formattedDate].forEach(time => {
                arr.push(setHours(setMinutes(new Date(), 0), time))
            })
        }
        return arr
    }

    return (
        <DatePicker
            className={style.reservationTimeInput}
            selected={time}
            onChange={time => setTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            placeholderText={timeType}
            excludeTimes={excludedTimes()}
            timeCaption={timeType}
            dateFormat="hh:mm aa"
        />
    )
}

const CalendarDatePicker = ({ dateSelected, setDateSelected }) => {
    return (
        <DatePicker
            className={style.reservationDateInput}
            selected={dateSelected}
            minDate={new Date()}
            placeholderText='Choose a date'
            onChange={date => setDateSelected(date)}
        />
    )
}

// checks for all numbers in between
const inclusiveInterval = (startNum, endNum) => {
    let result = [startNum]
    let idx = startNum + 1
    while (idx <= endNum) {
        result.push(idx)
        idx++
    }

    return result
}

// function that checks for reserved times and stores it inside an object of date time key-value pairs
const checkReservedTimes = reservations => {
    if (reservations.length === 0) return {}
    const reservedTimesArr = {}

    reservations.forEach(reservation => {
        const { reservation_date, start_time, end_time } = reservation

        const formatted_reservation_date = reservation_date.substring(0, 10)
        const formatted_start_time = start_time.substring(0, 2)
        const formatted_end_time = end_time.substring(0, 2)

        // if the date reserved doesn't exist, create an empty times array
        if (!reservedTimesArr.hasOwnProperty(formatted_reservation_date)) {
            reservedTimesArr[formatted_reservation_date] = []
            const numbersBetween = inclusiveInterval(parseInt(formatted_start_time), parseInt(formatted_end_time))

            reservedTimesArr[formatted_reservation_date].push(...numbersBetween)
        } else {
                const numbersBetween = inclusiveInterval(parseInt(formatted_start_time), parseInt(formatted_end_time))
                reservedTimesArr[formatted_reservation_date].push(...numbersBetween)
        }
    })

    return reservedTimesArr
}

const ReservationCard = ({ register, isSubmitProcessing, handleSubmit, onSubmit }) => {
    const { listingId } = useParams()
    const [dateSelected, setDateSelected] = useState(new Date())
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [reservedTimes, setReservedTimes] = useState([])

    const { reservations } = useReservationCard(listingId)

    useEffect(() => {
        const result = checkReservedTimes(reservations)
        setReservedTimes(result)
    }, [dateSelected])

    return (
        <div className={style.reservationCardContainer}>
            <div className={style.reservationCard}>
                <h1 className={style.reservationCardHeader}>Reserve</h1>
                <form id="hook-form" className={style.reservationDetails} onSubmit={handleSubmit(onSubmit)}>
                    <CalendarDatePicker
                        dateSelected={dateSelected}
                        setDateSelected={setDateSelected}
                        // {...register("reservationDate")}
                    />
                    <TimePicker
                        time={startTime}
                        setTime={setStartTime}
                        timeType={"Start Time"}
                        reservedTimes={reservedTimes}
                        dateSelected={dateSelected}
                        // {...register("reservationStartTime")}
                    />
                    <TimePicker
                        time={endTime}
                        setTime={setEndTime}
                        timeType={"End Time"}
                        reservedTimes={reservedTimes}
                        dateSelected={dateSelected}
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
