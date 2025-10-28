CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE topics (
    topic_id SERIAL PRIMARY KEY,
    topic_name VARCHAR(100) NOT NULL,
    category VARCHAR(50)
);

CREATE TABLE materials (
    material_id SERIAL PRIMARY KEY,
    topic_id INT REFERENCES topics(topic_id),
    title TEXT,
    content TEXT,
    difficulty VARCHAR(20),
    embedding_id UUID,   -- referensi ke Qdrant
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    topic_id INT REFERENCES topics(topic_id),
    question_text TEXT,
    correct_answer TEXT,
    explanation TEXT,
    difficulty VARCHAR(20),
    embedding_id UUID,   -- referensi ke Qdrant
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE generated_questions (
    gen_id SERIAL PRIMARY KEY,
    topic_id INT REFERENCES topics(topic_id),
    question_text TEXT,
    correct_answer TEXT,
    ai_explanation TEXT,
    source_model TEXT,
    embedding_id UUID,
    generated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_progress (
    progress_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    topic_id INT REFERENCES topics(topic_id),
    completion_rate FLOAT,
    last_accessed TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_answers (
    answer_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    question_id INT REFERENCES questions(question_id),
    selected_answer TEXT,
    is_correct BOOLEAN,
    answered_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE evaluations (
    evaluation_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    topic_id INT REFERENCES topics(topic_id),
    weakness_detected TEXT,
    improvement_suggestion TEXT,
    evaluated_at TIMESTAMP DEFAULT NOW()
);
