import { useState } from 'react'

export const useImageUploadForm = ({ setSelectedImages }) => {
    const [selectedBlobs, setSelectedBlobs] = useState([])

    // converts images uploaded to blobs to render them as user selects them
    const handleImageSelect = e => {
        if (e.target.files) {
            const blobImagesArr = Array.from(e.target.files).map(file => URL.createObjectURL(file))
            const selectedImagesArr = Array.from(e.target.files)

            setSelectedBlobs(prevImgs => prevImgs.concat(blobImagesArr))
            setSelectedImages(prevImgs => prevImgs.concat(selectedImagesArr))

            // unmounts selected images from the browser
            Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
        }
    }

    return {
        selectedBlobs,
        setSelectedBlobs,
        handleImageSelect,
    }
}
