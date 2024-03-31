CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    precio DECIMAL(10, 2),
    descripcion VARCHAR(200),
    creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE clientes(
id_cliente SERIAL PRIMARY KEY);

CREATE TABLE usuarios(
nombre VARCHAR(50),
apellidos VARCHAR(50),
ci VARCHAR(11)PRIMARY KEY ,
telefono VARCHAR(8),
usuario VARCHAR(50),
password VARCHAR(32)
);

CREATE TABLE reservas(
    id_reserva SERIAL PRIMARY KEY,
    fecha timestamp,
    id_producto INT,
    id_cliente INT

);
CREATE TABLE trabajadores(
  id_trabajador SERIAL PRIMARY KEY,
  puesto VARCHAR(20)
);
CREATE TABLE proyectos(
 id_proyecto SERIAL PRIMARY KEY,
 id_cliente INT,
 id_producto INT,
 fecha_inicio timestamp,
 fecha_entrega timestamp,
 estado VARCHAR(20)
);

CREATE TABLE facturas(
    id_factura SERIAL PRIMARY KEY,
    fecha timestamp,
    id_producto INT,
    cantidad INT,
    total DECIMAL(10.2),
    id_trabajador INT,
    id_cliente INT
);

CREATE TABLE nominas(
    id_trabajador INT PRIMARY KEY,
    salario DECIMAL(10.2),
    cant_dias_trabajados INT,
    total_ventas_realizadas INT
);


CREATE TABLE vacaciones(
    id_trabajador INT PRIMARY KEY,
    cant_dias_acumulados DECIMAL(10.2),
    coeficiente DECIMAL(10.2)
);

CREATE TABLE tributos(
    nombre_tributo VARCHAR(50),
    codigo_tributo INT,
    venta_Total DECIMAL(10.2),
    total_Pagar DECIMAL(10.2)
)







