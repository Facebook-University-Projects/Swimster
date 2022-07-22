import React, { useState } from 'react'
import { amenities } from '../Amenities/Amenities'

const style = {
    formCreatePoolHeader: 'font-semibold text-3xl col-span-3 mb-3',
    formAmenitiesHeader: 'font-semibold text-2xl col-span-3',
    formDimensionsHeader: 'font-semibold text-2xl col-span-3',
    amenitiesContainer: 'col-span-3',
    amenitiesContent: 'grid grid-cols-3 gap-6 mt-3',
    amenityContainer: 'rounded-xl flex flex-col space-y-2 items-center border px-3 py-4',
    checked: 'bg-blue-100',
    amenityTitle: 'text-sm',
    amenityImage: 'w-8 h-8',
    inputElement: 'rounded-md p-3 border-none outline-none bg-gray-200 ring-gray-400 hover:ring-2 focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-300',
    fullInput: 'col-span-3 resize-none',
    formStepContinueButton: 'bg-blue-700 py-3 col-start-3 rounded-md mt-4 cursor-pointer font-semibold text-gray-200',
    formStepBackButton: 'bg-blue-700 py-3 col-start-2 col-span-1 rounded-md mt-4 cursor-pointer font-semibold text-gray-200',
    formStepConfirmButton: 'bg-blue-700 py-3 col-start-3 col-span-1 rounded-md mt-4 cursor-pointer font-semibold text-gray-200',
}

const CreatePoolSteps = ({ step, nextStep, prevStep, register }) => {
    const [amenitiesChosen, setAmenitiesChosen] = useState([])

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
                    <select
                        className={style.inputElement}
                        type="text"
                        placeholder="Pool Type"
                        {...register("poolType")}
                    >
                        <option value="Outdoors">Outdoors</option>
                        <option value="Indoors">Indoors</option>
                    </select>
                    <input
                        className={`${style.inputElement} ${style.fullInput}`}
                        type="text"
                        placeholder="Image URL"
                        {...register("images")}
                    />
                    {/* <input type="submit" className={style.submitButton} value="Begin Hosting"/> */}
                    <button className={style.formStepContinueButton} onClick={nextStep}>Continue</button>
                </>
            )
        case 2:
            return (
                <>
                    <h1 className={style.formAmenitiesHeader}>What Amenities come with the Pool?</h1>
                    <div className={style.amenitiesContainer}>
                        <div className={style.amenitiesContent}>
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
                    <button className={style.formStepConfirmButton} onClick={nextStep}>Confirm</button>
                </>
            )
    }
}

export default CreatePoolSteps