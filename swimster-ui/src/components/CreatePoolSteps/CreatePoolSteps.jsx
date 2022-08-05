import * as React from 'react'
import { amenities } from '../Amenities/Amenities'
import { AddressSearchInput } from '../AddressSearchInput/AddressSearchInput'
import { RenderSelectedImages } from '../RenderSelectedImages/RenderSelectedImages'
import { useImageUploadForm } from '../../hooks/useImageUploadForm'
import { useAmenitiesDimensionsForm } from '../../hooks/useAmenitiesDimensionsForm'
import { style } from './style'

const CreatePoolSteps = ({ step, nextStep, prevStep, setSelectedImages, register, setValue, resetField }) => {
    const { selectedBlobs, setSelectedBlobs, handleImageSelect } = useImageUploadForm({ setSelectedImages })
    const { handleSelected, getSelected, amenitiesChosen } = useAmenitiesDimensionsForm({ step, resetField })

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
                    <AddressSearchInput
                        styling={`${style.inputElement} ${style.fullInput}`}
                        register={register}
                        setValue={setValue}
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
                        {...register("poolImages", {
                            onChange: handleImageSelect,
                        })}
                    />
                    <label htmlFor="file" className={style.imageUploadLabel}>Upload</label>
                    <div className={style.renderSelectedImagesContainer}>
                        <RenderSelectedImages
                            selectedBlobs={selectedBlobs}
                            setSelectedBlobs={setSelectedBlobs}
                        />
                    </div>
                    <div className={style.formImagesUploadButtons}>
                        <button className={style.formImagesUploadBackButton} onClick={prevStep}>Back</button>
                        <button className={style.formImagesUploadContinueButton} onClick={nextStep}>Continue</button>
                    </div>
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
