-- Crear tabla profesores
CREATE TABLE IF NOT EXISTS profesores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  materia VARCHAR(100) NOT NULL,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar datos de prueba
INSERT INTO profesores (nombre, email, materia) VALUES 
('Sergie Code', 'info@sergiecode.com', 'SQL'),
('Angelina Jolie', 'angelina.jolie@universidad.com', 'Física'),
('Winona Ryder', 'winona.ryder@universidad.com', 'Química');