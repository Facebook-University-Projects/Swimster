import * as React from 'react'
import grillIcon from '../../assets/grillIcon.svg'
import internetIcon from '../../assets/internetIcon.svg'
import bathroomIcon from '../../assets/bathroomIcon.svg'
import towelsIcon from '../../assets/towelsIcon.svg'
import loungeChairIcon from '../../assets/loungeChairIcon.svg'
import hotTubIcon from '../../assets/hotTubIcon.svg'
import parkingIcon from '../../assets/parkingIcon.svg'

const style = {
    amenitiesContainer: 'flex flex-col space-y-5 p-7 rounded-xl shadow-md',
    amenitiesTitle: 'text-xl',
    amenitiesRowContainer: 'grid grid-cols-4 gap-6',
    amenityContainer: 'border flex flex-col items-center space-y-3 rounded-xl px-3 py-4',
    amenityTitle: '',
    amenityImage: 'w-10 h-10',
}

export const amenities = [
    { title: "Grill", image: grillIcon },
    { title: "Internet", image: internetIcon },
    { title: "Bathroom", image: bathroomIcon },
    { title: "Towels", image: towelsIcon },
    { title: "Lounge Chairs", image: loungeChairIcon },
    { title: "Hot Tub", image: hotTubIcon },
    { title: "Parking", image: parkingIcon },
]

const Amenities = ({ poolAmenities }) => {
    return (
        <div className={style.amenitiesContainer}>
            <h1 className={style.amenitiesTitle}>Amenities</h1>
            <div className={style.amenitiesRowContainer}>
                {amenities.map((amenity, index) => {
                    return poolAmenities[index] && (
                        <div className={style.amenityContainer} key={index}>
                            <h2 className={style.amenityTitle}>{amenity.title}</h2>
                            <img className={style.amenityImage} src={amenity.image} alt={`${amenity.title} icon`} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Amenities
