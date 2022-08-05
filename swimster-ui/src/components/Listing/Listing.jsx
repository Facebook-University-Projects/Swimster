import * as React from 'react'
import GuestsIcon from '../../assets/guestsIcon.svg'
import LocationIcon from '../../assets/locationIcon.svg'
import UnlikedIcon from '../../assets/unlikedIcon.svg'
import { style } from './style'

const Listing = ({ listing, listingImage }) => {
    const { title, city, state, price, total_guests } = listing

    return (
        <div className={style.listing}>
            <img className={style.images} src={listingImage?.image_url} alt="listing images" />
            <div className={style.listingHeader}>
               <h2 className={style.listingTitle}>{title}</h2>
               <h4 className={style.listingAddress}>{city}, {state}</h4>
            </div>
            <div className={style.listingDetails}>
                <div className={style.listingGuests}>
                    <img src={GuestsIcon} alt="listing guests icon" />
                    <h3>{total_guests} guests allowed</h3>
                </div>
                <div className={style.listingDistance}>
                    <img src={LocationIcon} alt="listing distance icon" />
                    <h3>0.8 miles away</h3> {/* use w/ google maps api */}
                </div>
                <div className={style.listingPrice}>
                    <h2>
                        ${price}<span className={"ml-1 text-xs"}>hour</span>
                    </h2>
                    <img className={"ml-auto mr-2 cursor-pointer"} src={UnlikedIcon} alt="unliked icon" />
                </div>
            </div>
        </div>
    )
}

export default Listing
