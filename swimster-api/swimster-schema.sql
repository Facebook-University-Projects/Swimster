CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    phone_number    BIGINT NOT NULL,
    address         TEXT NOT NULL,
    date_of_birth   DATE NOT NULL,
    password        TEXT NOT NULL,
    profile_image   TEXT,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    is_admin        BOOLEAN NOT NULL DEFAULT FALSE
);
