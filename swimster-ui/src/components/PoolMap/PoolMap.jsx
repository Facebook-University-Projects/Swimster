import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { useListingsContext } from '../../contexts/listings'

const mapContainerStyle = {
    width: '100%',
    height: '100%',
}

const PoolMap = () => {
    const { listings } = useListingsContext()
    const [userLat, setUserLat] = useState(0)
    const [userLng, setUserLng] = useState(0)
    const [error, setError] = useState({})

    const geolocationAPI = navigator.geolocation

    const getUserCoordinates = () => {
        if (!geolocationAPI) setError({ errormessage: "Geolocation API is not available in your browser!" })
        else {
            geolocationAPI.getCurrentPosition(position => {
                const { coords } = position
                setUserLat(coords.latitude)
                setUserLng(coords.longitude)
            }, error => {
                setError({ errormessage: "Something went wrong getting your position!" })
            })
        }
    }

    useEffect(() => {
        getUserCoordinates()
    }, [setUserLat, setUserLng])

    return (
        <div className={"col-span-2"}>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={{ lat: parseFloat(userLat), lng: parseFloat(userLng) }}
                zoom={10}
                >
                    {listings?.map((listing, index) => {
                        const { lat, lng } = listing
                        return <Marker key={index} position={{ lat: Number(lat), lng: Number(lng) }}/>
                    })}
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default PoolMap
