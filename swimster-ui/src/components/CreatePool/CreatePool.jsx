import * as React from 'react'
import CreatePoolSteps from '../CreatePoolSteps/CreatePoolSteps'
import { useCreatePoolForm } from '../../hooks/useCreatePoolForm'

const style = {
    createPool: 'flex-1 flex justify-around items-center',
    callToAction: 'text-8xl font-semibold space-y-10',
    primaryCTA: 'space-y-3',
    secondaryCTA: 'text-blue-700',
    formContainer: 'border bg-gray-300 w-2/5 h-5/6 p-12 rounded-lg shadow-lg',
    poolDetails: 'grid grid-cols-3 gap-x-4 gap-y-6 mt-3',
}

const CreatePool = () => {
    const {
        step,
        nextStep,
        prevStep,
        error,
        isSubmitProcessing,
        setSelectedImages,
        register,
        setValue,
        resetField,
        handleSubmit,
        onSubmit
    } = useCreatePoolForm()

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
                <form className={style.poolDetails} onSubmit={handleSubmit(onSubmit)}>
                    <CreatePoolSteps
                        step={step}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        setSelectedImages={setSelectedImages}
                        register={register}
                        setValue={setValue}
                        resetField={resetField}
                    />
                </form>
            </div>
        </div>
    )
}

export default CreatePool
