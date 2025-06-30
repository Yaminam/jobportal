-- Insert sample companies
INSERT INTO companies (name, description, website_url, industry, company_size, location, founded_year) VALUES
('TechCorp Inc.', 'Leading technology company specializing in web applications and cloud solutions.', 'https://techcorp.com', 'Technology', '1000-5000', 'San Francisco, CA', 2010),
('StartupXYZ', 'Fast-growing startup focused on innovative product solutions.', 'https://startupxyz.com', 'Technology', '50-200', 'Remote', 2020),
('Design Studio', 'Creative design agency helping brands tell their stories.', 'https://designstudio.com', 'Design', '10-50', 'New York, NY', 2015),
('CloudTech Solutions', 'Cloud infrastructure and DevOps consulting company.', 'https://cloudtech.com', 'Technology', '200-1000', 'Austin, TX', 2018),
('AI Innovations', 'Artificial intelligence and machine learning research company.', 'https://aiinnovations.com', 'Technology', '100-500', 'Boston, MA', 2019);

-- Insert sample users (employers)
INSERT INTO users (first_name, last_name, email, password_hash, user_type, location, bio) VALUES
('Sarah', 'Johnson', 'sarah@techcorp.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LrUpm', 'employer', 'San Francisco, CA', 'HR Manager at TechCorp Inc.'),
('Mike', 'Chen', 'mike@startupxyz.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LrUpm', 'employer', 'Remote', 'Founder and CEO of StartupXYZ'),
('Emily', 'Davis', 'emily@designstudio.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LrUpm', 'employer', 'New York, NY', 'Creative Director at Design Studio');

-- Insert sample users (job seekers)
INSERT INTO users (first_name, last_name, email, password_hash, user_type, location, bio) VALUES
('John', 'Doe', 'john@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LrUpm', 'jobseeker', 'San Francisco, CA', 'Full-stack developer with 5+ years of experience'),
('Jane', 'Smith', 'jane@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LrUpm', 'jobseeker', 'New York, NY', 'UX Designer passionate about creating user-centered designs'),
('Alex', 'Wilson', 'alex@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LrUpm', 'jobseeker', 'Remote', 'Product Manager with expertise in agile methodologies');

-- Insert sample jobs
INSERT INTO jobs (title, company_id, posted_by, description, requirements, benefits, location, job_type, experience_level, salary_min, salary_max, is_remote, skills) VALUES
('Senior Frontend Developer', 1, 1, 'We are looking for an experienced frontend developer to join our team and help build the next generation of web applications. You will work with modern technologies and collaborate with a talented team of developers and designers.', '5+ years of React experience, TypeScript proficiency, strong CSS skills, experience with modern build tools, knowledge of testing frameworks', 'Health insurance, 401k matching, flexible work hours, remote work options, professional development budget', 'San Francisco, CA', 'full-time', 'senior', 120000, 150000, true, ARRAY['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Jest']),

('Product Manager', 2, 2, 'Lead product strategy and development for our growing platform. Work with cross-functional teams to deliver exceptional user experiences and drive business growth.', '3+ years of product management experience, strong analytical skills, experience with agile methodologies, excellent communication skills', 'Equity package, health insurance, unlimited PTO, remote work, learning stipend', 'Remote', 'full-time', 'mid', 100000, 130000, true, ARRAY['Product Strategy', 'Agile', 'Analytics', 'User Research']),

('UX Designer', 3, 3, 'Create beautiful and intuitive user experiences for our clients. Collaborate with developers and stakeholders to bring designs to life and ensure exceptional user satisfaction.', 'Bachelor''s degree in Design or related field, 3+ years of UX design experience, proficiency in Figma, strong portfolio, user research experience', 'Health insurance, creative workspace, design conference budget, flexible hours', 'New York, NY', 'contract', 'mid', 80000, 100000, false, ARRAY['Figma', 'User Research', 'Prototyping', 'Design Systems']),

('Backend Developer', 4, 1, 'Build scalable backend systems and APIs. Work with modern technologies and contribute to our microservices architecture.', '4+ years of backend development experience, proficiency in Node.js or Python, experience with cloud platforms (AWS/GCP), database design skills', 'Health insurance, 401k, remote work options, tech stipend, conference attendance', 'Austin, TX', 'full-time', 'senior', 110000, 140000, true, ARRAY['Node.js', 'Python', 'AWS', 'Docker', 'MongoDB']),

('Data Scientist', 5, 2, 'Analyze complex datasets and build machine learning models to drive business insights and product improvements. Work with large-scale data and cutting-edge ML technologies.', 'PhD or Master''s in Data Science, Statistics, or related field, 3+ years of experience, proficiency in Python, experience with ML frameworks, strong statistical background', 'Competitive salary, equity, health benefits, research budget, conference travel', 'Boston, MA', 'full-time', 'senior', 130000, 160000, false, ARRAY['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Statistics']),

('DevOps Engineer', 4, 1, 'Manage and optimize our cloud infrastructure. Implement CI/CD pipelines and ensure system reliability and scalability.', '3+ years of DevOps experience, expertise in AWS/GCP, experience with Kubernetes and Docker, knowledge of infrastructure as code', 'Health insurance, 401k matching, remote work, on-call compensation, professional development', 'Seattle, WA', 'full-time', 'mid', 115000, 145000, true, ARRAY['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins']);

-- Insert sample applications
INSERT INTO applications (job_id, user_id, cover_letter, status) VALUES
(1, 4, 'I am excited to apply for the Senior Frontend Developer position. With over 5 years of experience in React and TypeScript, I believe I would be a great fit for your team.', 'under_review'),
(2, 6, 'As a product manager with 4 years of experience, I am passionate about building products that users love. I would love to contribute to StartupXYZ''s growth.', 'interview_scheduled'),
(3, 5, 'I am a UX designer with a strong portfolio and 3+ years of experience. I would love to bring my design skills to your creative team.', 'rejected');

-- Insert sample saved jobs
INSERT INTO saved_jobs (user_id, job_id) VALUES
(4, 4),
(4, 5),
(5, 1),
(6, 2);

-- Insert sample user skills
INSERT INTO user_skills (user_id, skill_name, proficiency_level, years_of_experience) VALUES
(4, 'React', 'expert', 5),
(4, 'TypeScript', 'advanced', 3),
(4, 'Node.js', 'advanced', 4),
(5, 'Figma', 'expert', 4),
(5, 'User Research', 'advanced', 3),
(6, 'Product Strategy', 'advanced', 4),
(6, 'Agile', 'expert', 5);

-- Insert sample work experience
INSERT INTO work_experience (user_id, company_name, job_title, description, start_date, end_date, is_current, location) VALUES
(4, 'Previous Tech Co', 'Frontend Developer', 'Developed and maintained React applications, collaborated with design team, implemented responsive designs', '2019-01-01', '2023-12-31', false, 'San Francisco, CA'),
(4, 'Current Startup', 'Senior Frontend Developer', 'Leading frontend development, mentoring junior developers, architecting scalable solutions', '2024-01-01', NULL, true, 'San Francisco, CA'),
(5, 'Design Agency', 'UX Designer', 'Created user-centered designs, conducted user research, collaborated with development teams', '2021-03-01', '2024-01-31', false, 'New York, NY'),
(6, 'Product Company', 'Product Manager', 'Managed product roadmap, worked with cross-functional teams, analyzed user data', '2020-06-01', NULL, true, 'Remote');
