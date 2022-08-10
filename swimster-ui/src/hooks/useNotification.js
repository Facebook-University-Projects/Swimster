import { useSnackbar } from 'notistack'

export const useNotification = () => {
    const { enqueueSnackbar } = useSnackbar()

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

    const setInfo = message => {
        enqueueSnackbar(message, {
            variant: "info",
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "right"
            }
        })
    }

    const setDefault = message => {
        enqueueSnackbar(message, {
            variant: "default",
            anchorOrigin: {
                vertical: "top",
                horizontal: "center"
            }
        })
    }

    return {
        setSuccess,
        setError,
        setInfo,
        setDefault,
    }
}
