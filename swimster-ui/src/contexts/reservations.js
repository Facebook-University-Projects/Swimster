import { createContext, useContext, useState } from 'react'

const ReservationsContext = createContext(null)

export const ReservationsContextProvider = ({ children }) => {
    const [reservation, setReservation] = useState({})

    const reservationsValue = { reservation, setReservation }

    return (
        <ReservationsContext.Provider value={reservationsValue}>
            {children}
        </ReservationsContext.Provider>
    )
}

export const useReservationsContext = () => useContext(ReservationsContext)
