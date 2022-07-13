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

    async request({ endpoint, method="GET", data={} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json"
        }

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try {
            const res = await axios({ url, method, data, headers })
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

    async fetchListings() {
        const listings = await this.request({
            endpoint: "listings",
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
            endpoint: "listings",
            method: "POST",
            data: listing
        })
        return createListing
    }

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

    async logoutUser() {
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }
}

export default new ApiClient(process.env.CLIENT_REMOTE_HOST_URL || "http://localhost:3001")
