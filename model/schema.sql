-- users table
CREATE TABLE IF NOT EXISTS USERS (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- post table
CREATE TABLE IF NOT EXISTS POSTS (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    topic VARCHAR,
    image VARCHAR,
    description VARCHAR NOT NULL,
    user_id INTEGER REFERENCES USERS(id),
    likes_count INTEGER,
    comments_count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- likes table 
CREATE TABLE IF NOT EXISTS LIKES (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES POSTS(id),
    user_id INTEGER REFERENCES USERS(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- comments table 
CREATE TABLE IF NOT EXISTS COMMENTS (
    id SERIAL PRIMARY KEY,
    comment_text VARCHAR,
    post_id INTEGER REFERENCES POSTS(id),
    user_id INTEGER REFERENCES USERS(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
