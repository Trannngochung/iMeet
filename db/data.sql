-- data.sql
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', 'hashed_admin_password', 'admin'),
('Normal User', 'user@example.com', 'hashed_user_password', 'user');

INSERT INTO rooms (name, capacity, location) VALUES
('Phòng họp 101', 10, 'Tầng 1'),
('Phòng họp 202', 20, 'Tầng 2');
