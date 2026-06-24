-- Script de creación de la base de datos para el Instituto Técnico FORMAS
CREATE DATABASE IF NOT EXISTS gestion_academica;
USE gestion_academica;

-- Tabla de Usuarios (para autenticación)
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'instructor') DEFAULT 'admin',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Estudiantes
CREATE TABLE IF NOT EXISTS estudiantes (
    id_estudiante INT AUTO_INCREMENT PRIMARY KEY,
    documento VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    direccion TEXT,
    estado_matricula ENUM('activo', 'inactivo', 'egresado') DEFAULT 'activo'
);

-- Tabla de Instructores
CREATE TABLE IF NOT EXISTS instructores (
    id_instructor INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    estado ENUM('activo', 'inactivo') DEFAULT 'activo'
);

-- Tabla de Cursos
CREATE TABLE IF NOT EXISTS cursos (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    duracion_horas INT NOT NULL,
    area_tematica VARCHAR(100),
    descripcion TEXT
);

-- Tabla de Grupos (Instancia de un curso)
CREATE TABLE IF NOT EXISTS grupos (
    id_grupo INT AUTO_INCREMENT PRIMARY KEY,
    id_curso INT NOT NULL,
    id_instructor INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    horario VARCHAR(100) NOT NULL, -- Ej: Lunes a Viernes 8:00 - 12:00
    cupo_maximo INT NOT NULL,
    FOREIGN KEY (id_curso) REFERENCES cursos(id_curso) ON DELETE CASCADE,
    FOREIGN KEY (id_instructor) REFERENCES instructores(id_instructor) ON DELETE CASCADE
);

-- Tabla de Matrículas (Muchos a muchos entre Estudiantes y Grupos)
CREATE TABLE IF NOT EXISTS matriculas (
    id_matricula INT AUTO_INCREMENT PRIMARY KEY,
    id_estudiante INT NOT NULL,
    id_grupo INT NOT NULL,
    fecha_matricula DATE DEFAULT (CURRENT_DATE),
    estado ENUM('registrada', 'cancelada', 'finalizada') DEFAULT 'registrada',
    UNIQUE(id_estudiante, id_grupo), -- Un estudiante no puede matricularse dos veces en el mismo grupo
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante) ON DELETE CASCADE,
    FOREIGN KEY (id_grupo) REFERENCES grupos(id_grupo) ON DELETE CASCADE
);

-- Tabla de Calificaciones
CREATE TABLE IF NOT EXISTS calificaciones (
    id_calificacion INT AUTO_INCREMENT PRIMARY KEY,
    id_matricula INT NOT NULL,
    modulo VARCHAR(100) NOT NULL,
    nota DECIMAL(3, 2) CHECK (nota >= 0.0 AND nota <= 5.0),
    FOREIGN KEY (id_matricula) REFERENCES matriculas(id_matricula) ON DELETE CASCADE
);

-- Datos de prueba iniciales
-- Usuario admin (password: admin123) - Se recomienda hashear en producción
-- Para este ejemplo, insertaremos el hash bcrypt para 'admin123'
-- Hash correcto para 'admin123': $2a$10$Pt9.eZThIJBQV8xPb2sQTOm50bg3w7dXev/zHVHVWOEHQw/UwgDkK
INSERT INTO usuarios (username, password, rol) VALUES ('admin', '$2a$10$Pt9.eZThIJBQV8xPb2sQTOm50bg3w7dXev/zHVHVWOEHQw/UwgDkK', 'admin');

-- Estudiantes de prueba
INSERT INTO estudiantes (documento, nombres, apellidos, correo, telefono, direccion) VALUES 
('12345678', 'Juan', 'Perez', 'juan.perez@email.com', '3001234567', 'Calle 123 # 45-67'),
('87654321', 'Maria', 'Lopez', 'maria.lopez@email.com', '3109876543', 'Carrera 10 # 20-30');

-- Instructores de prueba
INSERT INTO instructores (nombres, apellidos, especialidad, correo, telefono) VALUES 
('Carlos', 'Rodriguez', 'Programación Web', 'carlos.rod@formas.edu.co', '3201112233'),
('Ana', 'Martinez', 'Diseño Gráfico', 'ana.martinez@formas.edu.co', '3154445566');

-- Cursos de prueba
INSERT INTO cursos (nombre, duracion_horas, area_tematica, descripcion) VALUES 
('Desarrollo Web Full Stack', 120, 'Tecnología', 'Curso completo de Node.js, Express y MySQL'),
('Diseño UI/UX', 80, 'Diseño', 'Diseño de interfaces modernas con Figma');

-- Grupos de prueba
INSERT INTO grupos (id_curso, id_instructor, fecha_inicio, fecha_fin, horario, cupo_maximo) VALUES 
(1, 1, '2026-06-01', '2026-08-30', 'Lunes a Jueves 18:00 - 21:00', 25),
(2, 2, '2026-06-15', '2026-07-15', 'Sábados 08:00 - 13:00', 20);

-- Matrícula de prueba
INSERT INTO matriculas (id_estudiante, id_grupo) VALUES (1, 1);
