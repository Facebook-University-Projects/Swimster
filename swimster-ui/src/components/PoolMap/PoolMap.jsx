import React, { useState, useEffect, useCallback } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api'
import { useListingsContext } from '../../contexts/listings'
import { Link } from 'react-router-dom'
import mapMarker from '../../assets/mapMarker.svg'
import { poolOptions } from './poolOptions'

const mapContainerStyle = {
    width: '100%',
    height: '100%',
}

const defaultCenter = {
    lat: 37.3387,
    lng: -121.8853,
}

const infoWindowContainer = {
    width: '175px',
    height: '175px',
}

const PoolMap = () => {
    const { listings } = useListingsContext()
    const [selected, setSelected] = useState({})
    const [userLocation, setUserLocation] = useState({})
    const [error, setError] = useState({})

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

    return (
        <div className={"col-span-2"}>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={userLocation.lat ? userLocation : defaultCenter}
                zoom={10}
                >
                    {listings.map(listing => {
                        const { lat, lng } = listing
                        return <Marker
                        key={listing.id}
                        position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
                        icon={mapMarker}
                        label={{ text: `$${listing.price}`, className: poolOptions.labelClassname }}
                        onClick={() => onSelect(listing)}
                        />
                    })}
                    {selected.title && (
                        <InfoWindow
                        position={{ lat: parseFloat(selected.lat), lng: parseFloat(selected.lng)}}
                        clickable={true}
                        onCloseClick={() => setSelected({})}
                        >
                            <div style={infoWindowContainer}>
                                <Link to={`/listings/${selected.id}`}>
                                <img style={poolOptions.listingImageOnMap} src={selected.image_url} alt="pool listing pic on map" />
                                </Link>
                                <div>
                                    <h1 style={poolOptions.listingTitleOnMap}>{selected.title}</h1>
                                    <h2 style={poolOptions.listingLocOnMap}>{selected.city}, {selected.state}</h2>
                                </div>
                                <h1 style={poolOptions.listingPriceOnMap}>${selected.price}</h1>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default PoolMap
