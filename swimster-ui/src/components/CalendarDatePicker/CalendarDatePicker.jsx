import * as React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const style = {
    reservationDateInputContainer: 'col-span-2',
    reservationDateInput: "rounded-lg border-2 w-full border-gray-200 p-2",
}

const CalendarDatePicker = ({ dateSelected, setDateSelected }) => {
    return (
        <div className={style.reservationDateInputContainer}>
            <DatePicker
                className={style.reservationDateInput}
                selected={dateSelected}
                minDate={new Date()}
                placeholderText='Choose a date'
                onChange={date => setDateSelected(date)}
            />
        </div>
    )
}

export default CalendarDatePicker
