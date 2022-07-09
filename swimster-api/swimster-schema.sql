CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    phone_number    BIGINT NOT NULL,
    address         TEXT NOT NULL,
    date_of_birth   DATE NOT NULL,
    password        TEXT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    is_admin        BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE listings (
    id                  SERIAL PRIMARY KEY,
    host_id             INT NOT NULL,
    title               TEXT NOT NULL,
    address             TEXT NOT NULL,
    description         TEXT NOT NULL,
    price               BIGINT NOT NULL,
    total_guests        INT NOT NULL,
    pool_type           TEXT NOT NULL,
    has_bbq_grill       BOOLEAN NOT NULL DEFAULT FALSE,
    has_internet        BOOLEAN NOT NULL DEFAULT FALSE,
    has_bathroom        BOOLEAN NOT NULL DEFAULT FALSE,
    has_towels          BOOLEAN NOT NULL DEFAULT FALSE,
    has_lounge_chairs   BOOLEAN NOT NULL DEFAULT FALSE,
    has_hot_tub         BOOLEAN NOT NULL DEFAULT FALSE,
    has_parking         BOOLEAN NOT NULL DEFAULT FALSE,
    images              TEXT NOT NULL,
    created_at          TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (host_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE images (
    id         SERIAL PRIMARY KEY,
    image_type      TEXT NOT NULL,
    image_name      TEXT NOT NULL,
    image_url       TEXT NOT NULL,
    listing_id      INT NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);
