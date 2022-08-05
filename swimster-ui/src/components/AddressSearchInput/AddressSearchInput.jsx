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

    const handleAddress = address => {
        setValue("address", address.formatted_address)
        setValue("city", address.address_components[3].long_name)
        setValue("state", address.address_components[5].long_name)
    }

    return (
        <Autocomplete
            className={styling}
            placeholder="Address"
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            onPlaceSelected={place => handleAddress(place)}
            options={options}
        />
    )
}
