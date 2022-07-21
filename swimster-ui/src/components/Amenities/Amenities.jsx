import * as React from 'react'
import bbqGrillIcon from '../../assets/bbqGrillIcon.svg'
import internetIcon from '../../assets/internetIcon.svg'
import bathroomIcon from '../../assets/bathroomIcon.svg'
import towelsIcon from '../../assets/towelsIcon.svg'
import loungeChairIcon from '../../assets/loungeChairIcon.svg'
import hotTubIcon from '../../assets/hotTubIcon.svg'
import parkingIcon from '../../assets/parkingIcon.svg'

const style = {
    amenitiesContainer: 'flex flex-col space-y-5 p-5 rounded-xl shadow-md',
    amenitiesTitle: 'text-xl',
    amenitiesRowContainer: 'flex flex-wrap space-x-5',
    amenityContainer: 'border flex flex-col rounded-xl p-4',
    amenityTitle: '',
    amenityImage: 'w-10 h-10',
}

const amenities = [
    {
        title: "BBQ Grill",
        image: bbqGrillIcon,
    },
    {
        title: "Wi-Fi",
        image: internetIcon,
    },
    {
        title: "Restroom",
        image: bathroomIcon,
    },
    {
        title: "Towels",
        image: towelsIcon,
    },
    {
        title: "Lounge Chairs",
        image: loungeChairIcon,
    },
    {
        title: "Hot Tub",
        image: hotTubIcon,
    },
    {
        title: "Parking",
        image: parkingIcon,
    },
]

const Amenities = () => {
    return (
        <div className={style.amenitiesContainer}>
            <h1 className={style.amenitiesTitle}>Amenities</h1>
            <div className={style.amenitiesRowContainer}>
                {amenities.map(amenity => {
                    return (
                        <div className={style.amenityContainer}>
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
