CREATE TABLE indicator_metadata (
  id INT PRIMARY KEY AUTO_INCREMENT,
  indicator_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  definition TEXT,
  formula TEXT,
  source VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Mock Data
INSERT INTO indicator_metadata (indicator_id, name, definition, formula, source)
VALUES
(1, 'Sample Indicator', 'This is a sample definition for the indicator.', 'Sum(A) / Sum(B) * 100', 'National Bureau of Statistics');
