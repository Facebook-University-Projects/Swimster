import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App/App'
import reportWebVitals from './reportWebVitals'
import { AuthContextProvider } from './contexts/auth'
import { ListingsContextProvider } from './contexts/listings'
import { ReservationsContextProvider } from './contexts/reservations'
import { ImagesContextProvider } from './contexts/images'
import { LoadScript } from '@react-google-maps/api'
import { SnackbarProvider } from 'notistack'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <SnackbarProvider>
    <AuthContextProvider>
      <ListingsContextProvider>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          libraries={["places"]}
        >
          <ReservationsContextProvider>
            <ImagesContextProvider>
              <App />
            </ImagesContextProvider>
          </ReservationsContextProvider>
        </LoadScript>
      </ListingsContextProvider>
    </AuthContextProvider>
  </SnackbarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
