-- users table
CREATE TABLE IF NOT EXISTS USERS (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);