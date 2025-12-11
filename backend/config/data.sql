-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Books table
CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  author VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  status ENUM('pending', 'confirmed', 'delivered', 'cancelled') DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  book_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id)
);

-- Cart table (optional, for persistent carts)
CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  book_id INT NOT NULL,
  quantity INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);

-- For analytics: Sales table (optional, for trends)
CREATE TABLE sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  book_id INT NOT NULL,
  quantity INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  sale_date DATE NOT NULL,
  FOREIGN KEY (book_id) REFERENCES books(id)
);
INSERT INTO books (title, author, description, category, price, stock, image_url) VALUES
('The Art of Coffee', 'Jane Brewster', 'A journey through the world of coffee, from bean to cup.', 'Beverages', 19.99, 50, 'https://dummyimage.com/200x300/180501/fff&text=Coffee'),
('Sienna Nights', 'Carlos Brown', 'A romantic novel set in the heart of Tuscany.', 'Fiction', 14.50, 30, 'https://dummyimage.com/200x300/701705/fff&text=Sienna'),
('JavaScript Essentials', 'Victor Code', 'A practical guide to modern JavaScript for web developers.', 'Programming', 29.99, 40, 'https://dummyimage.com/200x300/180501/fff&text=JS'),
('Earthy Flavors', 'Maya Roots', 'Delicious recipes inspired by earthy, natural ingredients.', 'Cooking', 24.00, 25, 'https://dummyimage.com/200x300/701705/fff&text=Earthy'),
('Brown & Beyond', 'Samuel Deep', 'Exploring the rich tones and history of the color brown.', 'Art', 17.75, 15, 'https://dummyimage.com/200x300/180501/fff&text=Brown'),
('The Warmth Within', 'Ella Ember', 'Poetry that brings warmth and comfort to the soul.', 'Poetry', 12.99, 20, 'https://dummyimage.com/200x300/701705/fff&text=Warmth');