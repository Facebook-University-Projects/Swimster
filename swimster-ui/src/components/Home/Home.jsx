import * as React from 'react'

const Home = ({ listings }) => {
    if (listings.length === 0) return null
    return (
        <div>
            {listings?.map(listing => {
                return (
                    <div>
                        {listing.title}
                    </div>
                )
            })}
        </div>
    )
}

export default Home
