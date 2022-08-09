# Swimster
The Airbnb of Pools. Reserve your pool by the hour.

# 🧐 Project Philosophy

# ⚡️ Features
- Register an account and email address
- Viewing and searching for listings (by city for now)
- Accurate map view of listings in Google Maps
- Reserving a listing on available dates and times
- A confirmation page before sealing the reservation
- Becoming a host and creating your own pool listing
- A customizable step-by-step form with interactive image uploader and amenities picker

# 🧑‍💻 Tech Stack
Here's a brief high-level overview of the tech stack Swimster uses:
- **React** Framework for any UI-based work
- For persistent storage(database), Swimster uses **PostgreSQL** which provides a well-defined schema and store data from users, listings, reservations and images.
- The business logic is handled in **Express.js**, where specific routes are assigned jobs such as creating listings and reservations as well as fetching certain data from the user or a listing.
- To prepare for scalability, Swimster leverages an **AWS S3 Bucket** to host listing images (and profile images soon).
- To handle real address data, Swimster uses the **Google Maps API** and its constituents such as the Autocomplete widget and Gooogle Maps to successfully render accurate locations of the listing.

## Authentication
To handle user auth, Swimster generates JSON Web Tokens (JWT) when a user registers or logs in. This creates a `user` object to use for verification. Once the token is verified, the payload sent to the client attached the newly verified token, with access to protected endpoints.

The implementation works like so:
https://github.com/Facebook-University-Projects/Swimster/blob/1fc3c9364ec32b5018a0620a11d9a554a34632c5/swimster-api/utils/tokens.js#L8-L15

And it's used on the `/login` endpoint to verify the user's password
https://github.com/Facebook-University-Projects/Swimster/blob/1fc3c9364ec32b5018a0620a11d9a554a34632c5/swimster-api/models/User.js#L30-L35

When users register an account, an SQL query is made to create a new `user` entry in PostreSQL
https://github.com/Facebook-University-Projects/Swimster/blob/1fc3c9364ec32b5018a0620a11d9a554a34632c5/swimster-api/models/User.js#L72-L85

## Listings
The main aspect of Swimster is being able to view different pool listings in the main menu as well in its own route, which shows more details about the pool.

A listing object includes:
- `host_id`: INT
- `title`: STR
- `address`: STR
- `city`: STR
- `state`: STR
- `description`: STR
- `price`: NUMERIC (float)
- `total_guests`: INT
- `pool_type`: STR
- `pool_length`: INT
- `pool_width`: INT
- `pool_length`: INT
- `pool_depth`: INT
- `has_grill`: BOOL
- `has_internet`: BOOL
- `has_bathroom`: BOOL
- `has_towels`: BOOL
- `has_lounge_chairs`: BOOL
- `has_hot_tub`: BOOL
- `has_parking`: BOOL

### Listings in Main Menu

When user is logged in, the `fetchListings` function is called from the backend
https://github.com/Facebook-University-Projects/Swimster/blob/1fc3c9364ec32b5018a0620a11d9a554a34632c5/swimster-ui/src/components/App/App.jsx#L23-L29

And is then rendered in the client in a grid-style fashion
https://github.com/Facebook-University-Projects/Swimster/blob/1fc3c9364ec32b5018a0620a11d9a554a34632c5/swimster-ui/src/components/ListingsGrid/ListingsGrid.jsx#L32-L40

### Listing Detail

User can also view more details about the listing, either by clicking on it
<img width="800" alt="Screen Shot 2022-08-09 at 10 54 35 AM" src="https://user-images.githubusercontent.com/63836051/183725242-71e935a4-5c30-44fa-90f9-ce29d0b78d4d.png">

or on the pop-up in Google map view

<img width="319" alt="Screen Shot 2022-08-09 at 11 24 27 AM" src="https://user-images.githubusercontent.com/63836051/183733471-5c24739f-f115-411e-b1ce-eaaaee0adb89.png">


## Reservations
This was the most challenging part of this process as I had to make sure reservation date and times weren't being double booked. To combat this race condition, I gave different statuses to the reservations. Those statuses decided whether or not the date and times were going to be shown to the user. When a user picks their reservation, they are led to a confirmation page, which at this point, a reservation entity is made with the status of `DRAFT`. This still broadcasts to other users that the datetime is disabled. The confirmation page allows them to see an overview of what they're going to pay for. When they confirm, the status is then changed to `CONFIFMED`. For future implementations, I was thinking of having a render lifecylcle for the confirmation page for around 10 minutes, which after that the reservation would then be changed to an `ARCHIVED` status which is not added to the hashmap.
