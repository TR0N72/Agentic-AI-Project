-- ===========================
-- USERS
-- ===========================
INSERT INTO users (user_id, username, email, password_hash, created_at) VALUES
(1, 'rhea_undip', 'rhea@example.com', 'hashed_pw_123', NOW()),
(2, 'alex_math', 'alex@example.com', 'hashed_pw_456', NOW()),
(3, 'mira_scholar', 'mira@example.com', 'hashed_pw_789', NOW());

-- ===========================
-- TOPICS
-- ===========================
INSERT INTO topics (topic_id, topic_name, category) VALUES
(1, 'Algebra', 'Mathematics'),
(2, 'Grammar', 'Reading & Writing'),
(3, 'Data Interpretation', 'Mathematics'),
(4, 'Sentence Structure', 'Reading & Writing');

-- ===========================
-- MATERIALS
-- ===========================
INSERT INTO materials (material_id, topic_id, title, content, difficulty, created_at)
VALUES
(1, 1, 'Linear Equations', 'Understanding variables and coefficients in linear equations.', 'medium', NOW()),
(2, 2, 'Parallel Structure', 'Using consistent grammatical forms in writing.', 'easy', NOW()),
(3, 3, 'Bar Graph Analysis', 'Interpreting data from bar and line charts.', 'medium', NOW()),
(4, 4, 'Subject-Verb Agreement', 'Ensuring subject and verb match in number and person.', 'easy', NOW());

-- ===========================
-- QUESTIONS
-- ===========================
INSERT INTO questions (question_id, topic_id, question_text, correct_answer, explanation, difficulty, created_at)
VALUES
(1, 1, 'Solve for x: 2x + 5 = 11', '3', 'Subtract 5 from both sides and divide by 2 → x = 3.', 'easy', NOW()),
(2, 2, 'Which sentence is parallel?', 'She likes dancing, singing, and running.', 'All items in the list use gerund form.', 'medium', NOW()),
(3, 3, 'A graph shows sales increasing from 10 to 40 units, what’s the percent increase?', '300%', '((40 - 10) / 10) * 100 = 300%', 'medium', NOW()),
(4, 4, 'Identify the error: The team are winning.', 'is winning', 'Team is singular, so verb should be singular.', 'easy', NOW());

-- ===========================
-- GENERATED QUESTIONS
-- ===========================
INSERT INTO generated_questions (gen_id, topic_id, question_text, correct_answer, ai_explanation, source_model, generated_at)
VALUES
(1, 1, 'If 3x - 2 = 10, find x.', '4', 'Add 2, divide by 3 → x = 4.', 'gpt-5', NOW()),
(2, 3, 'If a chart shows 50 apples and 25 oranges, what’s the ratio?', '2:1', 'Divide 50/25 to get 2:1.', 'gpt-5', NOW()),
(3, 2, 'Choose the correct sentence: (A) He go to school. (B) He goes to school.', 'He goes to school.', 'Singular subject needs -s form.', 'gpt-5', NOW());

-- ===========================
-- USER PROGRESS
-- ===========================
INSERT INTO user_progress (progress_id, user_id, topic_id, completion_rate, last_accessed)
VALUES
(1, 1, 1, 0.85, NOW()),
(2, 1, 2, 0.60, NOW()),
(3, 2, 3, 0.90, NOW()),
(4, 3, 4, 0.40, NOW());

-- ===========================
-- USER ANSWERS
-- ===========================
INSERT INTO user_answers (answer_id, user_id, question_id, selected_answer, is_correct, answered_at)
VALUES
(1, 1, 1, '3', TRUE, NOW()),
(2, 1, 2, 'She likes to dance, singing, and running.', FALSE, NOW()),
(3, 2, 3, '300%', TRUE, NOW()),
(4, 3, 4, 'are winning', FALSE, NOW()),
(5, 1, 3, '200%', FALSE, NOW());

-- ===========================
-- EVALUATIONS
-- ===========================
INSERT INTO evaluations (evaluation_id, user_id, topic_id, weakness_detected, improvement_suggestion, evaluated_at)
VALUES
(1, 1, 2, 'Inconsistent use of parallel structure.', 'Review more writing exercises with gerund patterns.', NOW()),
(2, 1, 1, NULL, 'Continue practicing with advanced linear equations.', NOW()),
(3, 2, 3, NULL, 'Excellent performance on data interpretation.', NOW()),
(4, 3, 4, 'Confusion with singular/plural agreement.', 'Study more examples of subject-verb agreement.', NOW());
