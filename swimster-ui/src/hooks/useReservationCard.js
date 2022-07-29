import { useEffect, useState } from 'react'
import { useAuthContext, isUserAuthenticated } from '../contexts/auth'
import apiClient from '../services/apiClient'

export const useReservationCard = listingId => {
    const { user, initialized } = useAuthContext()
    const [reservations, setReservations] = useState([])
    const [error, setError] = useState(null)

    const isAuthenticated = isUserAuthenticated(user, initialized)

    useEffect(() => {
        const fetchReservationsFromListing = async () => {
            const { data, error } = await apiClient.fetchReservationsFromListing(listingId)
            if (error) setError(error)
            if (data?.reservationsForListing) setReservations([...data.reservationsForListing])
        }

        if (isAuthenticated) fetchReservationsFromListing()
    }, [listingId, isAuthenticated])

    return {
        reservations
    }
}
