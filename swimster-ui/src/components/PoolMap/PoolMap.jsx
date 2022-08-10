import * as React from 'react'
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api'
import { Link } from 'react-router-dom'
import mapMarker from '../../assets/mapMarker.svg'
import { poolOptions } from './poolOptions'
import { usePoolMap } from '../../hooks/usePoolMap'

const PoolMap = () => {
    const {
        listings,
        selected,
        setSelected,
        userLocation,
        onSelect,
        mapContainerStyle,
        defaultCenter,
        infoWindowContainer
    } = usePoolMap()

    return (
        <div className={"col-span-2"}>
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
                            <img style={poolOptions.listingImageOnMap} src={selected?.image_url} alt="pool listing pic on map" />
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
        </div>
    )
}

export default PoolMap
