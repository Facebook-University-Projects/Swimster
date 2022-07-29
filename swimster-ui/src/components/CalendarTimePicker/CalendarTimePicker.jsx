import * as React from 'react'
import DatePicker from 'react-datepicker'
import format from 'date-fns/format'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import 'react-datepicker/dist/react-datepicker.css'

const style = {
    reservationTimeInputContainer: 'col-span-1',
    reservationTimeInput: 'rounded-lg border-2 w-full border-gray-200 p-2',
}

const CalendarTimePicker = ({ time, setTime, timeType, reservedTimes, dateSelected }) => {
    // filter out times less than the current time
    const formattedDate = format(dateSelected, "yyyy-MM-dd")

    const excludedTimes = () => {
        const arr = []

        if (Object.keys(reservedTimes).length > 0 && reservedTimes.hasOwnProperty(formattedDate)) {
            reservedTimes[formattedDate].forEach(time => {
                arr.push(setHours(setMinutes(new Date(), 0), time))
            })
        }
        return arr
    }

    return (
        <div className={style.reservationTimeInputContainer}>
            <DatePicker
                className={style.reservationTimeInput}
                selected={time}
                onChange={time => setTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                minTime={setHours(setMinutes(new Date(), 0), 9)}
                maxTime={setHours(setMinutes(new Date(), 0), 22)}
                placeholderText={timeType}
                excludeTimes={excludedTimes()}
                timeCaption={timeType}
                dateFormat="hh:mm aa"
            />
        </div>
    )
}

export default CalendarTimePicker
