import * as React from 'react'
import { useCreatePoolForm } from '../../hooks/useCreatePoolForm'

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

const CreatePool = () => {
    const { error, isSubmitProcessing, register, handleSubmit, onSubmit } = useCreatePoolForm()

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
                    <input type="submit" className={style.submitButton} value="Begin Hosting"/>
                </form>
            </div>
        </div>
    )
}

export default CreatePool
