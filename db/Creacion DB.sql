CREATE DATABASE railway; -- completar servi..._db


USE railway; -- completar servi..._db

-- Paciente
CREATE TABLE Paciente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    documento_identidad VARCHAR(255),
    fecha_nacimiento DATETIME,
    tipo_sangre VARCHAR(50),
    prestadora_servicios VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    contraseña VARCHAR(255),
    numero_celular VARCHAR(20),
    rol VARCHAR(255) DEFAULT 'paciente'
);

-- Medico
CREATE TABLE Medico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    documento_identidad VARCHAR(255),
    fecha_nacimiento DATETIME,
    especialidad VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    contraseña VARCHAR(255),
    numero_celular VARCHAR(20),
    rol VARCHAR(255) DEFAULT 'medico'
);

-- Recepcionista
CREATE TABLE Recepcionista (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    documento_identidad VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    contraseña VARCHAR(255),
    numero_celular VARCHAR(20),
    rol VARCHAR(255) DEFAULT 'recepcionista'
);

-- Administrador
CREATE TABLE Administrador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    contraseña VARCHAR(255),
    permisos VARCHAR(255),
    rol VARCHAR(255) DEFAULT 'administrador'
);

-- Resto de tablas
CREATE TABLE Cita (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora DATETIME,
    estado VARCHAR(255)
);

CREATE TABLE Historial_Medico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    informacion_medica TEXT,
    medicamentos_recetados TEXT,
    pruebas_realizadas TEXT
);

CREATE TABLE Agenda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fechas_disponibles DATETIME
);

-- Relaciones
ALTER TABLE Paciente ADD COLUMN historial_medico_id INT;
ALTER TABLE Paciente ADD FOREIGN KEY (historial_medico_id) REFERENCES Historial_Medico(id);

ALTER TABLE Medico ADD COLUMN agenda_id INT;
ALTER TABLE Medico ADD FOREIGN KEY (agenda_id) REFERENCES Agenda(id);

ALTER TABLE Cita ADD COLUMN paciente_id INT;
ALTER TABLE Cita ADD COLUMN medico_id INT;
ALTER TABLE Cita ADD FOREIGN KEY (paciente_id) REFERENCES Paciente(id);
ALTER TABLE Cita ADD FOREIGN KEY (medico_id) REFERENCES Medico(id);

ALTER TABLE Historial_Medico ADD COLUMN paciente_id INT;
ALTER TABLE Historial_Medico ADD FOREIGN KEY (paciente_id) REFERENCES Paciente(id);

ALTER TABLE Agenda ADD COLUMN medico_id INT;
ALTER TABLE Agenda ADD FOREIGN KEY (medico_id) REFERENCES Medico(id);

-- AÑADIR VALORES -----------------

-- Paciente 1
INSERT INTO Paciente (nombre, documento_identidad, fecha_nacimiento, tipo_sangre, prestadora_servicios, email, contraseña, numero_celular, historial_medico_id)
VALUES ('Juan Pérez', '123456789', '1980-01-01 00:00:00', 'O+', 'Salud Total', 'juan.perez@email.com', 'contraseña123', '3001234567', 1);

-- Paciente 2
INSERT INTO Paciente (nombre, documento_identidad, fecha_nacimiento, tipo_sangre, prestadora_servicios, email, contraseña, numero_celular, historial_medico_id)
VALUES ('Ana Gómez', '987654321', '1990-05-15 00:00:00', 'A-', 'MediPlus', 'ana.gomez@email.com', 'contraseña321', '3007654321', 2);

-- Paciente 3
INSERT INTO Paciente (nombre, documento_identidad, fecha_nacimiento, tipo_sangre, prestadora_servicios, email, contraseña, numero_celular, historial_medico_id)
VALUES ('Carlos Martínez', '456123789', '1985-08-20 00:00:00', 'B+', 'Famisanar', 'carlos.martinez@email.com', 'contraseña456', '3004567890', 3);



-- Medico 1
INSERT INTO Medico (nombre, documento_identidad, fecha_nacimiento, especialidad, email, contraseña, numero_celular, agenda_id)
VALUES ('Dra. Laura García', '1122334455', '1975-03-30 00:00:00', 'Cardiología', 'laura.garcia@email.com', 'contraseña789', '3101234567', 1);

-- Medico 2
INSERT INTO Medico (nombre, documento_identidad, fecha_nacimiento, especialidad, email, contraseña, numero_celular, agenda_id)
VALUES ('Dr. Manuel López', '5566778899', '1982-07-10 00:00:00', 'Dermatología', 'manuel.lopez@email.com', 'contraseña987', '3107654321', 2);

-- Medico 3
INSERT INTO Medico (nombre, documento_identidad, fecha_nacimiento, especialidad, email, contraseña, numero_celular, agenda_id)
VALUES ('Dra. Sofía Torres', '9988776655', '1990-12-25 00:00:00', 'Pediatría', 'sofia.torres@email.com', 'contraseña654', '3104567890', 3);



-- Recepcionista 1
INSERT INTO Recepcionista (nombre, documento_identidad, email, contraseña, numero_celular)
VALUES ('Roberto Díaz', '2233445566', 'roberto.diaz@email.com', 'contraseña321', '3201234567');

-- Recepcionista 2
INSERT INTO Recepcionista (nombre, documento_identidad, email, contraseña, numero_celular)
VALUES ('Marta Rodríguez', '6677889900', 'marta.rodriguez@email.com', 'contraseña432', '3207654321');

-- Recepcionista 3
INSERT INTO Recepcionista (nombre, documento_identidad, email, contraseña, numero_celular)
VALUES ('Diego Fernández', '5544332211', 'diego.fernandez@email.com', 'contraseña543', '3204567890');



-- Admministrador 1: admin123
INSERT INTO Administrador (email, contraseña, permisos)
VALUES ('admin1@gmail.com', '$2a$11$fqzUyzVzYtACMRMpUNHoxuLDbG2A.o2cZvQNvqwQC03riNHBItmxy', 'Todos');

-- Admministrador 2
INSERT INTO Administrador (email, contraseña, permisos)
VALUES ('admin2@email.com', 'admin321', 'Limitados');

-- Admministrador 3
INSERT INTO Administrador (email, contraseña, permisos)
VALUES ('admin3@email.com', 'admin456', 'Moderados');


-- Cita 1
INSERT INTO Cita (fecha_hora, estado, paciente_id, medico_id)
VALUES ('2023-11-23 10:00:00', 'Confirmada', 1, 1);

-- Cita 2
INSERT INTO Cita (fecha_hora, estado, paciente_id, medico_id)
VALUES ('2023-11-24 15:00:00', 'Pendiente', 2, 2);

-- Cita 3
INSERT INTO Cita (fecha_hora, estado, paciente_id, medico_id)
VALUES ('2023-11-25 09:30:00', 'Cancelada', 3, 3);


-- Historial medico 1
INSERT INTO Historial_Medico (informacion_medica, medicamentos_recetados, pruebas_realizadas, paciente_id)
VALUES ('Información médica del paciente 1', 'Medicamentos del paciente 1', 'Pruebas del paciente 1', 1);

-- Historial medico 2
INSERT INTO Historial_Medico (informacion_medica, medicamentos_recetados, pruebas_realizadas, paciente_id)
VALUES ('Información médica del paciente 2', 'Medicamentos del paciente 2', 'Pruebas del paciente 2', 2);

-- Historial medico 3
INSERT INTO Historial_Medico (informacion_medica, medicamentos_recetados, pruebas_realizadas, paciente_id)
VALUES ('Información médica del paciente 3', 'Medicamentos del paciente 3', 'Pruebas del paciente 3', 3);



-- Agenda  1
INSERT INTO Agenda (fechas_disponibles, medico_id)
VALUES ('2023-11-23 10:00:00', 1);

-- Agenda 2
INSERT INTO Agenda (fechas_disponibles, medico_id)
VALUES ('2023-11-24 15:00:00', 2);

-- Agenda 3
INSERT INTO Agenda (fechas_disponibles, medico_id)
VALUES ('2023-11-25 09:30:00', 3);




-- AÑADIR VALORES POR GRUPO DE VALORES:

INSERT INTO Paciente (nombre, documento_identidad, fecha_nacimiento, tipo_sangre, prestadora_servicios, email, contraseña, numero_celular)
VALUES 
('Juan Perez', '12345678', '1980-01-01 00:00:00', 'O+', 'Salud Total', 'juan.perez@email.com', 'contraseñaJuan', '3001234567'),
('Ana Gomez', '87654321', '1990-02-02 00:00:00', 'A-', 'Nueva EPS', 'ana.gomez@email.com', 'contraseñaAna', '3007654321'),
('Carlos Ruiz', '23456789', '1985-03-03 00:00:00', 'B+', 'Famisanar', 'carlos.ruiz@email.com', 'contraseñaCarlos', '3012345678'),
('Sofia Martinez', '98765432', '1995-04-04 00:00:00', 'AB-', 'Compensar', 'sofia.martinez@email.com', 'contraseñaSofia', '3018765432'),
('Diego López', '34567890', '1975-05-05 00:00:00', 'O-', 'Coomeva', 'diego.lopez@email.com', 'contraseñaDiego', '3023456789');

INSERT INTO Medico (nombre, documento_identidad, fecha_nacimiento, especialidad, email, contraseña, numero_celular)
VALUES 
('Laura Torres', '45678901', '1982-06-06 00:00:00', 'Cardiología', 'laura.torres@email.com', 'contraseñaLaura', '3034567890'),
('David Jimenez', '65432198', '1978-07-07 00:00:00', 'Pediatría', 'david.jimenez@email.com', 'contraseñaDavid', '3036543219'),
('Sara Morales', '56789012', '1983-08-08 00:00:00', 'Dermatología', 'sara.morales@email.com', 'contraseñaSara', '3045678901'),
('Miguel Ángel Castro', '43219876', '1975-09-09 00:00:00', 'Neurología', 'miguel.castro@email.com', 'contraseñaMiguel', '3043219876'),
('Andrea Velasco', '67890123', '1986-10-10 00:00:00', 'Ginecología', 'andrea.velasco@email.com', 'contraseñaAndrea', '3056789012');


INSERT INTO Recepcionista (nombre, documento_identidad, email, contraseña, numero_celular)
VALUES 
('Carmen Díaz', '78901234', 'carmen.diaz@email.com', 'contraseñaCarmen', '3067890123'),
('Mario Fernández', '89012345', 'mario.fernandez@email.com', 'contraseñaMario', '3078901234'),
('Lucía Rodríguez', '90123456', 'lucia.rodriguez@email.com', 'contraseñaLucia', '3089012345'),
('Jorge Martínez', '12345987', 'jorge.martinez@email.com', 'contraseñaJorge', '3091234987'),
('Luisa Hernández', '23456879', 'luisa.hernandez@email.com', 'contraseñaLuisa', '3102345687');


INSERT INTO Administrador (nombre_usuario, contraseña, permisos)
VALUES 
('admin1', 'contraseñaAdmin1', 'todos'),
('admin2', 'contraseñaAdmin2', 'limitados'),
('admin3', 'contraseñaAdmin3', 'moderados'),
('admin4', 'contraseñaAdmin4', 'específicos'),
('admin5', 'contraseñaAdmin5', 'generales');

-- Historial Médico
INSERT INTO Historial_Medico (informacion_medica, medicamentos_recetados, pruebas_realizadas, paciente_id)
VALUES 
('Info médica de Juan', 'Medicamento A, B', 'Prueba 1, 2', 1),
('Info médica de Ana', 'Medicamento C, D', 'Prueba 3, 4', 2),
('Info médica de Carlos', 'Medicamento E, F', 'Prueba 5, 6', 3),
('Info médica de Sofia', 'Medicamento G, H', 'Prueba 7, 8', 4),
('Info médica de Diego', 'Medicamento I, J', 'Prueba 9, 10', 5);

-- Agenda
INSERT INTO Agenda (fechas_disponibles, medico_id)
VALUES 
('2023-12-01 09:00:00', 1),
('2023-12-02 10:00:00', 2),
('2023-12-03 11:00:00', 3),
('2023-12-04 12:00:00', 4),
('2023-12-05 13:00:00', 5);

INSERT INTO Cita (fecha_hora, estado, paciente_id, medico_id)
VALUES 
('2023-12-01 09:00:00', 'Confirmada', 1, 1),
('2023-12-02 10:00:00', 'Pendiente', 2, 2),
('2023-12-03 11:00:00', 'Cancelada', 3, 3),
('2023-12-04 12:00:00', 'Confirmada', 4, 4),
('2023-12-05 13:00:00', 'En espera', 5, 5);



SELECT * FROM Administrador;

SELECT * FROM Administrador WHERE email = 'admin1@gmail.com';

SELECT * FROM Medico;

SELECT * FROM Medico WHERE email = 'angel@gmail.com';

SELECT * FROM Paciente;
