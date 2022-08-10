import * as React from 'react'
import Autocomplete from 'react-google-autocomplete'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

export const AddressSearchInput = ({ styling, setValue }) => {

    const options = {
        types: ["address"],
        fields: ["address_components", "formatted_address"],
        componentRestrictions: {
            country: "us"
        }
    }

    const handleAddress = address => {
        geocodeByAddress(address.formatted_address)
        .then(res => getLatLng(res[0]))
        .then(({ lat, lng }) => {
            setValue("lat", lat)
            setValue("lng", lng)
        })
        setValue("address", address.formatted_address)
        setValue("city", address.address_components[3].long_name)
        setValue("state", address.address_components[5].long_name)
    }

    return window.google && (
        <Autocomplete
            className={styling}
            placeholder="Address"
            onPlaceSelected={place => handleAddress(place)}
            options={options}
        />
    )
}
