import React, { useState, useEffect, useRef } from 'react'
import Autocomplete, { usePlacesWidget } from 'react-google-autocomplete'

export const AddressSearchInput = ({ styling, setValue }) => {

    const options = {
        types: ["address"],
        fields: ["address_components", "formatted_address"],
        componentRestrictions: {
            country: "us"
        }
    }

    return (
        <Autocomplete
            className={styling}
            placeholder="Address"
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            onPlaceSelected={place => setValue("address", place.formatted_address)}
            options={options}
        />
    )
}
