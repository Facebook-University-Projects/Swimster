import axios from 'axios'

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "swimster_session_token"
    }

    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenName, token)
    }

    async request({ endpoint, method="GET", data={}, headers="application/json"}) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headerSelected = {
            "Content-Type": headers
        }

        if (this.token) {
            headerSelected["Authorization"] = `Bearer ${this.token}`
        }

        try {
            const res = await axios({ url, method, data, headers: headerSelected })
            return {
                data: res.data,
                error: null
            }
        } catch (error) {
            console.error({ errorResponse: error.response })
            const message = error?.response?.data?.error?.message
            return {
                data: null,
                error: message || String(error)
            }
        }
    }

    // auth endpoint model functions
    async loginUser(credentials) {
        const loginUser = await this.request({
            endpoint: "auth/login",
            method: "POST",
            data: credentials
        })
        return loginUser
    }

    async registerUser(credentials) {
        const registerUser = await this.request({
            endpoint: "auth/register",
            method: "POST",
            data: credentials
        })
        return registerUser
    }

    async fetchUserFromToken() {
        const fetchedUser = await this.request({
            endpoint: "auth/me",
            method: "GET"
        })
        return fetchedUser
    }

    logoutUser() {
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }

    // listings endpoint model functions
    async fetchListings() {
        const listings = await this.request({
            endpoint: "listings/",
            method: "GET",
        })
        return listings
    }

    async fetchListingById(listingId) {
        const listing = await this.request({
            endpoint: `listings/${listingId}`,
            method: "GET",
        })
        return listing
    }

    async createListing(listing) {
        const createListing = await this.request({
            endpoint: "listings/",
            method: "POST",
            data: listing
        })
        return createListing
    }

    // reservations endpoint model functions
    async createReservation(reservation, listingId) {
        const createReservation = await this.request({
            endpoint: `reservations/listings/${listingId}`,
            method: "POST",
            data: reservation
        })
        return createReservation
    }

    async fetchReservationsFromListing(listingId) {
        const reservationsFromListing = await this.request({
            endpoint: `reservations/listings/${listingId}`,
            method: "GET"
        })
        return reservationsFromListing
    }

    async fetchReservationsFromUser() {
        const userReservations = await this.request({
            endpoint: "reservations/",
            method: "GET"
        })
        return userReservations
    }

    async fetchReservationsFromHostListing() {
        const hostListingsReservations = await this.request({
            endpoint: "reservations/listings",
            method: "GET"
        })
        return hostListingsReservations
    }

    // images endpoint model functions
    async createImages(imageFiles) {
        const images = await this.request({
            endpoint: "images/",
            method: "POST",
            data: imageFiles,
            headers: "multipart/form-data"
        })
        return images
    }

    async fetchImagesFromListing(listingId) {
        const listingImages = await this.request({
            endpoint: `images/listings/${listingId}`,
            method: "GET"
        })
        return listingImages
    }

    async fetchMainImagesFromListings() {
        const mainImages = await this.request({
            endpoint: "images/",
            method: "GET"
        })
        return mainImages
    }
}

export default new ApiClient(process.env.CLIENT_REMOTE_HOST_URL || "http://localhost:3002")
