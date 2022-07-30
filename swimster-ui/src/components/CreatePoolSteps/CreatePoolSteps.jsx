import React, { useEffect, useState } from 'react'
import { amenities } from '../Amenities/Amenities'

const style = {
    formCreatePoolHeader: 'font-semibold text-3xl col-span-3 mb-3',
    formImagesUploadHeader: 'col-span-3',
    formImagesUploadTitle: 'font-semibold text-2xl',
    formImagesUploadSubtitle: 'font-semibold text-sm text-gray-500',
    imageUploadButton: 'hidden',
    realImageUpload: 'bg-red-400 p-3 rounded-lg',
    formAmenitiesHeader: 'font-semibold text-2xl col-span-3',
    formDimensionsHeader: 'font-semibold text-2xl col-span-3',
    amenitiesContainer: 'col-span-3',
    amenitiesContent: 'grid grid-cols-3 gap-6 mt-3',
    amenityContainer: 'rounded-xl flex flex-col space-y-2 items-center border px-3 py-4 font-semibold cursor-pointer',
    selectedAmenity: 'bg-gray-500 text-gray-200 border-gray-500',
    checked: 'bg-blue-100',
    amenityTitle: 'text-sm',
    amenityImage: 'w-8 h-8 fill-gray-200',
    inputElement: 'rounded-md p-3 border-none outline-none bg-gray-200 ring-gray-400 hover:ring-2 focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-300',
    fullInput: 'col-span-3 resize-none',
    formStepContinueButton: 'bg-blue-700 py-3 col-start-3 rounded-md mt-4 cursor-pointer font-semibold text-gray-200',
    formStepBackButton: 'bg-blue-700 py-3 col-start-2 col-span-1 rounded-md mt-4 cursor-pointer font-semibold text-gray-200',
    formStepConfirmButton: 'bg-blue-700 py-3 col-start-3 col-span-1 rounded-md mt-4 cursor-pointer font-semibold text-gray-200',
}

const RenderSelectedPhotos = ({ images }) => {
    return (
        <div>
            {images.length > 0 ? (
                <>
                    {images.map(image => {
                        return (
                            <img key={image} src={image}/>
                        )
                    })}
                </>
            ) : (
                <>
                    None
                </>
            )}
        </div>
    )
}

const CreatePoolSteps = ({ step, nextStep, prevStep, selectedImages, setSelectedImages, register, setValue, resetField }) => {
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

    const handleImageSelect = e => {
        console.log('e: ', e.target.files);
        if (e.target.files) {
            const imagesArr = Array.from(e.target.files).map(file => URL.createObjectURL(file))

            setSelectedImages(prevImgs => prevImgs.concat(imagesArr))
            Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
        }
    }

    switch (step) {
        case 1:
            return (
                <>
                    <h1 className={style.formCreatePoolHeader}>Get Started with the Basics.</h1>
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
                        type="number"
                        placeholder="Price"
                        {...register("price")}
                    />
                    <input
                        className={style.inputElement}
                        type="number"
                        placeholder="Guests"
                        {...register("totalGuests")}
                    />
                    <select
                        className={style.inputElement}
                        type="text"
                        placeholder="Pool Type"
                        {...register("poolType")}
                    >
                        <option value="Outdoors">Outdoors</option>
                        <option value="Indoors">Indoors</option>
                    </select>
                    <button className={style.formStepContinueButton} onClick={nextStep}>Continue</button>
                </>
            )
        case 2:
            return (
                <>
                    <div className={style.formImagesUploadHeader}>
                        <h1 className={style.formImagesUploadTitle}>Make your Pool Stand Out</h1>
                        <p className={style.formImagesUploadSubtitle}>Upload at least 5 images (10 max)</p>
                    </div>
                    <input
                        className={style.imageUploadButton}
                        type="file"
                        id="file"
                        multiple
                        onChange={handleImageSelect}
                        // {...register("poolImages"s)}
                    />
                    <div>
                        <label htmlFor="file" className={style.realImageUpload}>UPLOAD</label>
                    </div>
                    <div>
                        <RenderSelectedPhotos images={selectedImages}/>
                    </div>
                    <button className={style.formStepBackButton} onClick={prevStep}>Back</button>
                    <button className={style.formStepBackButton} onClick={nextStep}>Continue</button>
                </>
            )
        case 3:
            return (
                <>
                    <h1 className={style.formAmenitiesHeader}>What amenities come with the Pool?</h1>
                    <div className={style.amenitiesContainer}>
                        <div className={style.amenitiesContent}>
                            {amenities.map((amenity, index) => {
                                return (
                                    <div key={index} onClick={() => handleSelected(amenity)} className={`${style.amenityContainer} ${getSelected(amenity) && style.selectedAmenity}`}>
                                        <h2 className={style.amenityTitle}>{amenity.title}</h2>
                                        <img className={style.amenityImage} src={amenity.image} alt={`${amenity.title} icon`} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <h1 className={style.formDimensionsHeader}>What are your Pool's Dimensions? (ft)</h1>
                    <input
                        className={style.inputElement}
                        type="number"
                        placeholder="Length"
                        {...register("poolLength")}
                    />
                    <input
                        className={style.inputElement}
                        type="number"
                        placeholder="Width"
                        {...register("poolWidth")}
                    />
                    <input
                        className={style.inputElement}
                        type="number"
                        placeholder="Depth"
                        {...register("poolDepth")}
                    />
                    <button className={style.formStepBackButton} onClick={prevStep}>Back</button>
                    <button
                        type="submit"
                        className={style.formStepConfirmButton}
                        onClick={() => setValue("amenities", amenitiesChosen)}>
                        Begin Hosting
                    </button>
                </>
            )
    }
}

export default CreatePoolSteps
