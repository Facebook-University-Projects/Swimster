import * as React from 'react'
import imageUploadIcon from '../../assets/imageUploadIcon.svg'
import cancelButtonIcon from '../../assets/cancelButtonIcon.svg'
import { useEffect } from 'react'

const style = {
    imageUploadContentContainer: 'grid grid-cols-3 place-items-center gap-x-2 gap-y-5 border-2 p-4 border-gray-400 rounded-md h-96',
    selectedImageContainer: 'flex flex-col',
    selectedImageCancelButton: 'bg-red-50 w-4 h-4 rounded-full cursor-pointer self-end absolute',
    selectedImage: 'w-36 h-36 object-cover rounded-lg col-span-1',
    imageUploadIconImage: 'col-start-2',
}

export const RenderSelectedImages = ({ selectedBlobs, setSelectedBlobs, selectedImages, setSelectedImages, setValue }) => {
    const removeSelectedImage = imageIdx => {
        const newSelectedBlobs = selectedBlobs.filter(image => image != selectedBlobs[imageIdx])
        const newSelectedImages = selectedImages.filter(image => image.name != selectedImages[imageIdx].name)
        setSelectedBlobs([...newSelectedBlobs])
        setSelectedImages([...newSelectedImages])
    }

    useEffect(() => {
        setValue("poolImages", selectedImages)
    }, [selectedImages])

    return (
        <div className={style.imageUploadContentContainer}>
            {selectedBlobs.length > 0 ? (
                <>
                    {selectedBlobs.map((image, index) => {
                        return (
                            <div key={index} className={style.selectedImageContainer}>
                                <img
                                    className={style.selectedImageCancelButton}
                                    src={cancelButtonIcon} onClick={() => removeSelectedImage(index)}
                                    alt="image cancel button"
                                />
                                <img
                                    className={style.selectedImage}
                                    src={image}
                                    alt="image uploaded by user"
                                />
                            </div>
                        )
                    })}
                </>
            ) : (
                <>
                    <img
                        className={style.imageUploadIconImage}
                        src={imageUploadIcon}
                        alt="upload icon"
                    />
                </>
            )}
        </div>
    )
}
