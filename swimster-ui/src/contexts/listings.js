import React, { createContext, useContext, useState } from 'react'
import Listing from '../components/Listing/Listing'
import apiClient from '../services/apiClient'

const ListingsContext = createContext(null)

export const ListingsContextProvider = ({ children }) => {
    const [listings, setListings] = useState([])
    const [error, setError] = useState(null)

    // combined object of useful functions for fetching Listing data
    const handlers = {
        fetchListings: async () => {
            const { data, error } = await apiClient.fetchListings()
            if (error) setError(error)
            if (data?.listings) setListings(data.listings)
        },
        clear: () => {
            setListings([])
            setError(null)
        },
    }

    const value = { listings, setListings, handlers, error }

    return (
        <ListingsContext.Provider value={value}>
            {children}
        </ListingsContext.Provider>
    )
}

export const useListingsContext = () => useContext(ListingsContext)
