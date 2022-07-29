import * as React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const style = {
    reservationDateInput: "rounded-lg border-2 border-gray-200 p-2",
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

export default CalendarDatePicker
