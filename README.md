# Sistema de Gestión Académica - Instituto Técnico FORMAS

Este proyecto es una aplicación web robusta diseñada para gestionar los procesos académicos del Instituto Técnico FORMAS. Reemplaza el manejo manual de datos por un sistema automatizado, moderno y eficiente.

## 🚀 Tecnologías Usadas
- **Backend**: Node.js con Express
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript, EJS
- **Base de Datos**: MySQL
- **Arquitectura**: MVC (Modelo-Vista-Controlador)
- **Seguridad**: Bcryptjs para hashing de contraseñas y Express-Session para gestión de sesiones.

## 🛠️ Módulos Principales
1. **Autenticación**: Inicio de sesión seguro para administradores.
2. **Estudiantes**: Gestión completa (CRUD) de la información de los alumnos.
3. **Instructores**: Control de la planta docente y sus especialidades.
4. **Cursos**: Administración de la oferta académica.
5. **Grupos**: Instancias de cursos con asignación de instructores y horarios.
6. **Matrículas**: Vinculación de estudiantes a grupos con control de cupos.
7. **Calificaciones**: Registro de notas con validaciones de rango (0.0 - 5.0) y cálculo de aprobación.

## 📋 Reglas de Negocio Implementadas
- **No duplicidad**: Un estudiante no puede matricularse dos veces en el mismo grupo.
- **Control de Cupos**: El sistema impide matrículas si el grupo ha alcanzado su capacidad máxima.
- **Cruce de Horarios**: Validación para evitar que un instructor tenga grupos en horarios y fechas coincidentes.
- **Rango de Notas**: Las calificaciones solo se aceptan en el rango de 0.0 a 5.0.
- **Matrícula Obligatoria**: Solo se pueden registrar notas para estudiantes con matrícula activa.

## ⚙️ Configuración e Instalación
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Configurar las variables de entorno en el archivo `.env`.
4. Importar el script SQL ubicado en `database/schema.sql` en su servidor MySQL.
5. Iniciar la aplicación con `npm start` (o `node server.js`).

## 👤 Autor
Desarrollado para el Instituto Técnico FORMAS.
