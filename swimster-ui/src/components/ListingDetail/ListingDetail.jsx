import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useListingDetail } from '../../hooks/useListingDetail'
import { style } from './style'
import Amenities from '../Amenities/Amenities'
import ReservationCard from '../ReservationCard/ReservationCard'
import ratingsIcon from '../../assets/ratingsIcon.svg'
import guestsIcon from '../../assets/guestsIcon.svg'
import rulerIcon from '../../assets/rulerIcon.svg'
import depthIcon from '../../assets/depthIcon.svg'
import unlikedIcon from '../../assets/unlikedIcon.svg'
import shareIcon from '../../assets/shareIcon.svg'
import { useListingsContext } from '../../contexts/listings'
import { useImagesContext } from '../../contexts/images'

const ListingDetail = () => {
    const { listingId } = useParams()
    const { listing, setListing } = useListingsContext()
    const { setMainImage } = useImagesContext()
    const { listingImages, error, isFetching } = useListingDetail(listingId)

    useEffect(() => {
        if (listingImages[0]?.image_url) setMainImage(listingImages[0].image_url)
    }, [listing])

    const {
        first_name,
        last_name,
        email,
        title,
        address,
        description,
        total_guests,
        pool_type,
        pool_length,
        pool_width,
        pool_depth,
        has_grill,
        has_internet,
        has_bathroom,
        has_towels,
        has_lounge_chairs,
        has_hot_tub,
        has_parking,
    } = listing

    const poolAmenities = [
        has_grill,
        has_internet,
        has_bathroom,
        has_towels,
        has_lounge_chairs,
        has_hot_tub,
        has_parking
    ]

    return (
        <div className={style.listingDetail}>
            {/* main pool listing section - title, images, main pool info */}
            <div className={style.poolHero}>
                <div className={style.headerContainer}>
                    <div className={style.headerContent}>
                        <h1 className={style.headerContentTitle}>{title}</h1>
                        <div className={style.secondaryHeaderContent}>
                            <div className={style.poolRatings}>
                                <img src={ratingsIcon} alt="ratings star icon" />
                                <p className={style.rating}>4.8</p>
                            </div>
                            <h3 className={style.headerContentAddress}>{address}</h3>
                        </div>
                    </div>
                    <div className={style.hostProfileImage}></div>
                </div>
                <div className={style.imagesContainer}>
                    {listingImages.map((image, index) => {
                        return (
                            <img
                                key={index}
                                className={`${style.images} ${index === 0 ? style.mainImage : ""}`}
                                src={image.image_url} alt='pool listing pics'
                            />
                        )
                    })}
                </div>
                <div className={style.mainPoolDetails}>
                    <div className={style.mainPoolDetailsContent}>
                        <h1 className={style.primaryMainPoolDetailsContent}>{pool_type} Pool hosted by {first_name} {last_name}</h1>
                        <div className={style.secondaryMainPoolDetailsContent}>
                            <div className={style.guestsContainer}>
                                <img className={style.guestsImage} src={guestsIcon} alt="guests allowed icon" />
                                <p className={style.totalGuests}>up to {total_guests} guests</p>
                            </div>
                            <div className={style.guestsContainer}>
                                <img className={style.guestsImage} src={rulerIcon} alt="ruler icon" />
                                <p className={style.totalGuests}>{pool_length}' long and {pool_width}' wide</p>
                            </div>
                            <div className={style.guestsContainer}>
                                <img className={style.guestsImage} src={depthIcon} alt="depth icon" />
                                <p className={style.totalGuests}>{pool_depth}' deep</p>
                            </div>
                        </div>
                    </div>
                    <div className={style.poolSocialButtons}>
                        <div className={style.socialButton}>
                            <img className={style.socialButtonImage} src={unlikedIcon} alt="save button icon" />
                            <p className={style.socialButtonTitle}>save</p>
                        </div>
                        <div className={style.socialButton}>
                            <img className={style.socialButtonImage} src={shareIcon} alt="share button icon" />
                            <p className={style.socialButtonTitle}>share</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* more specific pool info secion  - description, amenities, etc. */}
            <div className={style.poolContentContainer}>
                <div className={style.morePoolDetails}>
                    <div className={style.aboutPoolContainer}>
                        <h1 className={style.aboutPoolTitle}>Description</h1>
                        <p className={style.aboutPoolDescription}>{description}</p>
                    </div>
                    <Amenities poolAmenities={poolAmenities}/>
                    <div className={style.hostInfoContainer}>
                        <h1 className={style.hostInfoTitle}>About the Host</h1>
                        <div className={style.hostInfoHeader}>
                            <div className={style.hostProfileImage}></div>
                            <div className={style.hostInfoHeaderDetails}>
                                <h2 className={style.hostName}>{first_name} {last_name}</h2>
                                <h3 className={style.hostEmail}>{email}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <ReservationCard
                    listing={listing}
                />
            </div>
        </div>
    )
}

export default ListingDetail
