import { createContext, useContext, useState } from 'react'

const ImagesContext = createContext(null)

export const ImagesContextProvider = ({ children }) => {
    const [mainImage, setMainImage] = useState("")

    const imagesValue = { mainImage, setMainImage }

    return (
        <ImagesContext.Provider value={imagesValue}>
            {children}
        </ImagesContext.Provider>
    )
}

export const useImagesContext = () => useContext(ImagesContext)
