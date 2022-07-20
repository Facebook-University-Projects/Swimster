import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext, isUserAuthenticated } from '../../contexts/auth'
import apiClient from '../../services/apiClient'
import ratingsIcon from '../../assets/ratingsIcon.svg'
import guestsIcon from '../../assets/guestsIcon.svg'
import rulerIcon from '../../assets/rulerIcon.svg'
import depthIcon from '../../assets/depthIcon.svg'
import unlikedIcon from '../../assets/unlikedIcon.svg'
import shareIcon from '../../assets/shareIcon.svg'

const style = {
    listingDetail: 'flex flex-col mx-48 mt-20 font-medium text-lg',
    poolHero: 'flex flex-col',
    headerContainer: 'flex flex-row justify-between items-center',
    headerContent: 'flex flex-col',
    headerContentTitle: 'text-4xl',
    secondaryHeaderContent: 'flex items-center space-x-4',
    poolRatings: 'flex',
    rating: 'pt-0.5',
    headerContentAddress: 'text-md text-gray-400 pt-0.5',
    hostProfileImage: 'w-14 h-14 bg-gray-400 rounded-full',
    imagesContainer: 'grid grid-cols-4 gap-4 mt-5 h-[28rem] items-center',
    mainImage: 'bg-indigo-200 col-span-2 row-span-2',
    images: 'bg-gray-300 rounded-xl h-full object-cover',
    mainPoolDetails: 'flex justify-between items-center mt-4',
    mainPoolDetailsContent: '',
    primaryMainPoolDetailsContent: 'text-2xl',
    secondaryMainPoolDetailsContent: 'flex space-x-4 items-center mt-1',
    guestsContainer: 'flex space-x-2 items-center',
    guestsImage: 'w-5 h-5',
    totalGuests: 'text-sm text-gray-600',
    poolSocialButtons: 'flex space-x-5',
    socialButton: 'flex items-center space-x-1 border rounded-xl px-4 py-2 cursor-pointer',
    socialButtonImage: 'w-8 h-8',
    socialButtonTitle: '',
    poolContentContainer: '',
    morePoolDetails: '',
    reservationCard: '',
}

const ListingDetail = () => {
    const { user, initialized } = useAuthContext()
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [listing, setListing] = useState({})
    const { listingId } = useParams()

    const isAuthenticated = isUserAuthenticated(user, initialized)

    useEffect(() => {
        const fetchListing = async () => {
            setIsFetching(true)

            const { data, error } = await apiClient.fetchListingById(listingId)
            if (error) setError(error)
            if (data?.listing) setListing(data.listing)

            setIsFetching(false)
        }

        if (isAuthenticated) fetchListing()
    }, [listingId, isAuthenticated])

    const {
        first_name,
        last_name,
        email,
        phone_number,
        title,
        address,
        description,
        price,
        total_guests,
        pool_type,
        has_bbq_grill,
        has_internet,
        has_bathroom,
        has_towels,
        has_lounge_chairs,
        has_hot_tub,
        has_parking,
        images
    } = listing

    console.log('listing: ', listing);

    return (
        <div className={style.listingDetail}>
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
                    <img className={`${style.images} ${style.mainImage}`} src={images} alt="main pool listing image" />
                    <div className={style.images}></div>
                    <div className={style.images}></div>
                    <div className={style.images}></div>
                    <div className={style.images}></div>
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
                                <p className={style.totalGuests}>25' wide and 40' long</p>
                            </div>
                            <div className={style.guestsContainer}>
                                <img className={style.guestsImage} src={depthIcon} alt="depth icon" />
                                <p className={style.totalGuests}>3' - 6' deep</p>
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
            <div className={style.poolContentContainer}>
                <div className={style.morePoolDetails}></div>
                <div className={style.reservationCard}></div>
            </div>
        </div>
    )
}

export default ListingDetail
