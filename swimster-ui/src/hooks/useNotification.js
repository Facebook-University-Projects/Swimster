import { useSnackbar } from 'notistack'

export const useNotification = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const setSuccess = message => {
        enqueueSnackbar(message, {
            variant: "success",
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
            }
        })
    }

    const setError = message => {
        enqueueSnackbar(message, {
            variant: "error",
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
            }
        })
    }

    return {
        setSuccess,
        setError,
    }
}
