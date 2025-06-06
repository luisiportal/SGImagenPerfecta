// src/components/Reportes/ReservationsPdfExport.jsx

import React, { useState, useEffect, useCallback } from "react";
// Importa los componentes de @react-pdf/renderer
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { listarReservasRequest } from "../api/reservas.api";

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// 1. Define los estilos para el PDF usando StyleSheet
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "left",
    color: "#333",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "auto", // Ajustar el ancho según el contenido o definir porcentajes
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#3C8DBC", // Color azul de tu estilo
    padding: 5,
    textAlign: "left",
    flexShrink: 0, // Evitar que se encoja
  },
  tableCol: {
    width: "auto", // Ajustar el ancho según el contenido o definir porcentajes
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    textAlign: "left",
    flexShrink: 0, // Evitar que se encoja
  },
  tableCellHeader: {
    margin: "auto",
    fontSize: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  tableCell: {
    fontSize: 8,
    color: "#333",
  },
  // Puedes definir anchos específicos para las columnas si lo necesitas
  colCliente: { width: "25%" },
  colCI: { width: "15%" },
  colTelefono: { width: "15%" },
  colOferta: { width: "25%" },
  colFecha: { width: "20%" },
});

// 2. Define el componente del documento PDF
const MyDocument = ({ reservations, month, year }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text
        style={styles.header}
      >{`Reporte de Reservas - ${monthNames[month]} ${year}`}</Text>

      <View style={styles.table}>
        {/* Cabeceras de la tabla - 'ID' y 'Estado' ELIMINADAS */}
        <View style={styles.tableRow}>
          {/* <View style={[styles.tableColHeader, styles.colId]}><Text style={styles.tableCellHeader}>ID</Text></View> */}
          <View style={[styles.tableColHeader, styles.colCliente]}>
            <Text style={styles.tableCellHeader}>Cliente</Text>
          </View>
          <View style={[styles.tableColHeader, styles.colCI]}>
            <Text style={styles.tableCellHeader}>CI</Text>
          </View>
          <View style={[styles.tableColHeader, styles.colTelefono]}>
            <Text style={styles.tableCellHeader}>Teléfono</Text>
          </View>
          <View style={[styles.tableColHeader, styles.colOferta]}>
            <Text style={styles.tableCellHeader}>Oferta</Text>
          </View>
          <View style={[styles.tableColHeader, styles.colFecha]}>
            <Text style={styles.tableCellHeader}>Fecha Sesión</Text>
          </View>
          {/* <View style={[styles.tableColHeader, styles.colEstado]}><Text style={styles.tableCellHeader}>Estado</Text></View> */}
        </View>

        {/* Filas de la tabla - Datos de 'ID' y 'Estado' ELIMINADOS */}
        {reservations.map((reserva, index) => (
          <View
            style={[
              styles.tableRow,
              { backgroundColor: index % 2 === 0 ? "#F0F0F0" : "#FFFFFF" },
            ]}
            key={reserva.id_reserva}
          >
            {/* <View style={[styles.tableCol, styles.colId]}><Text style={styles.tableCell}>{reserva.id_reserva}</Text></View> */}
            <View style={[styles.tableCol, styles.colCliente]}>
              <Text
                style={styles.tableCell}
              >{`${reserva.nombre_cliente} ${reserva.apellidos}`}</Text>
            </View>
            <View style={[styles.tableCol, styles.colCI]}>
              <Text style={styles.tableCell}>{reserva.ci}</Text>
            </View>
            <View style={[styles.tableCol, styles.colTelefono]}>
              <Text style={styles.tableCell}>{reserva.telefono}</Text>
            </View>
            <View style={[styles.tableCol, styles.colOferta]}>
              <Text style={styles.tableCell}>
                {reserva.oferta?.nombre_oferta || ""}
              </Text>
            </View>
            <View style={[styles.tableCol, styles.colFecha]}>
              <Text style={styles.tableCell}>
                {new Date(reserva.fecha_sesion).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Text>
            </View>
            {/* <View style={[styles.tableCol, styles.colEstado]}><Text style={styles.tableCell}>{reserva.estado_reserva || ''}</Text></View> */}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// 3. El componente de exportación que contendrá el PDFDownloadLink
const ReservationsPdfExport = ({ month, year }) => {
  const [allReservations, setAllReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadReservations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listarReservasRequest();
      setAllReservations(data);
    } catch (err) {
      console.error("Error al cargar reservas:", err);
      setError("Error al cargar las reservas. Intente de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  useEffect(() => {
    const targetMonth = month;
    const targetYear = year;

    const filtered = allReservations.filter((reserva) => {
      if (!reserva.fecha_sesion) return false;
      const reservationDate = new Date(reserva.fecha_sesion);
      if (isNaN(reservationDate.getTime())) {
        console.warn(
          `Fecha de sesión inválida para reserva ID ${reserva.id_reserva}: ${reserva.fecha_sesion}`
        );
        return false;
      }
      return (
        reservationDate.getMonth() === targetMonth &&
        reservationDate.getFullYear() === targetYear
      );
    });

    filtered.sort((a, b) => {
      const dateA = new Date(a.fecha_sesion);
      const dateB = new Date(b.fecha_sesion);
      // Compara los timestamps para ordenar (ascendente)
      return dateA.getTime() - dateB.getTime();
    });
    setFilteredReservations(filtered);
  }, [allReservations, month, year]);

  // No se necesita una función generatePdf aquí, PDFDownloadLink la maneja

  if (loading) {
    return (
      <div className="text-center py-4">Cargando reservas para el PDF...</div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  // 4. Renderiza el PDFDownloadLink
  return (
    <div className="flex justify-end mb-4">
      <PDFDownloadLink
        document={
          <MyDocument
            reservations={filteredReservations}
            month={month}
            year={year}
          />
        }
        fileName={`Reporte_Reservas_${monthNames[month]}_${year}.pdf`}
        className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                    flex items-center justify-center ${
                      filteredReservations.length === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    }`}
        // Deshabilita el enlace si no hay reservas
        disabled={filteredReservations.length === 0}
      >
        {({ loading: pdfLoading }) => (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {pdfLoading
              ? "Generando PDF..."
              : filteredReservations.length === 0
                ? "No hay reservas para exportar este mes"
                : `Exportar ${filteredReservations.length} reservas a PDF`}
          </>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default ReservationsPdfExport;
