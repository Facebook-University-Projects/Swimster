import { useState, useEffect } from 'react'

export const useAmenitiesDimensionsForm = ({ step, resetField }) => {
    const [amenitiesChosen, setAmenitiesChosen] = useState([])

    // allows selecting and deselecting of amenities
    const handleSelected = amenity => {
        if (getSelected(amenity)) {
            const newSeletedAmenities = amenitiesChosen.filter(amenityTitle => amenityTitle !== amenity.title)
            return setAmenitiesChosen(newSeletedAmenities)
        }
        setAmenitiesChosen([...amenitiesChosen, amenity.title])
    }

    // checks if amenity is selected for UI change
    const getSelected = amenity => amenitiesChosen.includes(amenity.title)

    // resets these fields - solves autocomplete fields bug
    useEffect(() => {
        resetField("poolLength")
        resetField("poolWidth")
        resetField("poolDepth")
    }, [step])

    return {
        handleSelected,
        getSelected,
        amenitiesChosen,
    }
}
