import * as React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const mapContainerStyle = {
    width: '100%',
    height: '100%',
}

// default center position of google map when rendered
const center = {
    lat: 37.775,
    lng: -122.419,
}

const PoolMap = () => {
    return (
        <div className={"col-span-2"}>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={12}
                >
                    <></>
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default PoolMap
