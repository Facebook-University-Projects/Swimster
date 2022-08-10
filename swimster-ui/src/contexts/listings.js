import React, { createContext, useContext, useState } from 'react'
import { useNotification } from '../hooks/useNotification'
import apiClient from '../services/apiClient'

const ListingsContext = createContext(null)

export const ListingsContextProvider = ({ children }) => {
    const [listings, setListings] = useState([])
    const [filteredListings, setFilteredListings] = useState([])
    const [listing, setListing] = useState({})
    const { setError } = useNotification()

    // listings functions from apiClient w/ validation and security checks
    const handlers = {
        fetchListings: async () => {
            const { data, error } = await apiClient.fetchListings()
            if (error) setError(error)
            if (data?.listings) {
                setListings(data.listings)
                setFilteredListings(data.listings)
            }
        },
        clearListings: () => {
            setListings([])
        }
    }

    const listingsValue = {
        listing,
        setListing,
        listings,
        setListings,
        filteredListings,
        setFilteredListings,
        handlers,
    }

    return (
        <ListingsContext.Provider value={listingsValue}>
            {children}
        </ListingsContext.Provider>
    )
}

export const searchListingsByAddress = (listings, address) => listings.filter(listing => listing.address.includes(address))

export const useListingsContext = () => useContext(ListingsContext)
