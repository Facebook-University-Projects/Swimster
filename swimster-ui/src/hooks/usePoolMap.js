import { useState, useEffect } from 'react'
import { useListingsContext } from "../contexts/listings"

export const usePoolMap = () => {
    const { listings } = useListingsContext()
    const [selected, setSelected] = useState({})
    const [userLocation, setUserLocation] = useState({})
    const [error, setError] = useState({})

    const mapContainerStyle = {
        width: '100%',
        height: '100%',
    }

    // starting center point when google map gets loaded
    const defaultCenter = {
        lat: 37.3387,
        lng: -121.8853,
    }

    const infoWindowContainer = {
        width: '250px',
        height: '225px',
    }

    // sets state for the listing selected on the map
    const onSelect = item => setSelected(item)

    // grabs the latitude/longitude of user's device
    const success = position => {
        const currentPosition = {
            lat: parseFloat(position.coords.latitude),
            lng: parseFloat(position.coords.longitude),
        }
        setUserLocation(currentPosition)
    }

    // gets user's device location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success)
    })

    return {
        listings,
        selected,
        setSelected,
        userLocation,
        onSelect,
        mapContainerStyle,
        defaultCenter,
        infoWindowContainer,
    }
}
