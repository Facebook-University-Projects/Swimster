import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import apiClient from '../../services/apiClient'

const style = {
    createPool: 'flex-1 flex justify-around items-center border-2',
    callToAction: 'text-8xl font-semibold space-y-10',
    primaryCTA: 'space-y-3',
    secondaryCTA: 'text-blue-700',
    formContainer: 'border bg-gray-300 w-2/5 p-12 rounded-lg shadow-lg',
    formHeader: 'font-semibold text-2xl',
    poolDetails: 'grid grid-cols-3 gap-x-4 gap-y-4 mt-3',
    inputElement: 'rounded-md p-3 border-none outline-none bg-gray-200 ring-gray-400 hover:ring-2 focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-300',
    fullInput: 'col-span-3 resize-none',
    fileUploadLabel: 'text-lg font-medium col-span-3',
    fileUpload: 'col-span-3 bg-slate-200 rounded-md p-4',
    submitButton: 'bg-blue-700 col-span-3  w-1/3 py-3 px-1 place-self-end rounded-md mt-4 cursor-pointer font-semibold text-gray-200',
}

const CreatePool = ({ listings, setListings }) => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState({})
    const [selectedImages, setSelectedImages] = useState([])

    const onSubmit = async (formData) => {
        setIsProcessing(true)

        // amenities value will be changed in milestone 2
        const formattedFormData = {
            title: formData.title,
            address: formData.address,
            description: formData.description,
            price: formData.price,
            totalGuests: formData.totalGuests,
            poolType: formData.poolType,
            hasBbqGrill: false,
            hasInternet: false,
            hasBathroom: false,
            hasTowels: false,
            hasLoungeChairs: false,
            hasHotTub: false,
            hasParking: false,
            images: formData.images
        }

        // makes api request to server at listings/ endpoint
        const { data, error } = await apiClient.createListing(
            JSON.stringify(formattedFormData)
        )
        if (data?.listing) {
            setListings([...listings, data.listing])
            navigate('/')
        }
        if (error) setError(error.message)

        setIsProcessing(false)
    }

    return (
        <div className={style.createPool}>
            <div className={style.callToAction}>
                <div className={style.primaryCTA}>
                    <div>Create</div>
                    <div>New</div>
                    <div>Experiences.</div>
                </div>
                <div>With <span className={style.secondaryCTA}>Pools.</span></div>
            </div>
            <div className={style.formContainer}>
                <h1 className={style.formHeader}>Create your Pool Listing</h1>
                <form className={style.poolDetails} onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className={`${style.inputElement} ${style.fullInput}`}
                        type="text"
                        placeholder="Title"
                        {...register("title")}
                    />
                    <input
                        className={`${style.inputElement} ${style.fullInput}`}
                        type="text"
                        placeholder="Address"
                        {...register("address")}
                    />
                    <textarea
                        className={`${style.inputElement} ${style.fullInput}`}
                        rows={6}
                        placeholder="A little description..."
                        {...register("description")}
                    />
                    <input
                        className={style.inputElement}
                        type="text"
                        placeholder="Price"
                        {...register("price")}
                    />
                    <input
                        className={style.inputElement}
                        type="number"
                        placeholder="Guests"
                        {...register("totalGuests")}
                    />
                    <input
                        className={style.inputElement}
                        type="text"
                        placeholder="Pool Type"
                        {...register("poolType")}
                    />
                    <input
                        className={`${style.inputElement} ${style.fullInput}`}
                        type="text"
                        placeholder="Image URL"
                        {...register("images")}
                    />
                    <input type="submit" className={style.submitButton} value="Begin Hosting"/>
                </form>
            </div>
        </div>
    )
}

export default CreatePool
