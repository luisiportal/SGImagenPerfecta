import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import format from "date-fns/format"; // Importar date-fns para formatear fechas
import { es } from "date-fns/locale"; // Localización en español
import { parseDateForCalendar } from "../utils/dateUtils"; // Importar la función de normalización

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

// Estilos para el documento PDF
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
    width: "25%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
    fontSize: 10,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 9,
  },
  noReservations: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 12,
    color: "#555",
  },
});

// Componente para el documento PDF que renderiza la tabla
const ReservationsDocument = ({ reservations, month, year }) => {
  const targetMonth = month;
  const targetYear = year;

  const filteredReservations = reservations.filter((reserva) => {
    if (!reserva.fecha_sesion) return false;
    const reservationDate = parseDateForCalendar(reserva.fecha_sesion); // Usar parseDateForCalendar
    return (
      reservationDate.getMonth() === targetMonth &&
      reservationDate.getFullYear() === targetYear
    );
  });

  // Define los anchos individuales para cada columna del encabezado
  const colWidthsHeader = {
    cliente: "25%",
    oferta: "25%",
    fechaSesion: "15%",
    ci: "15%",
    telefono: "20%",
  };

  // Define los anchos individuales para cada columna de las filas de datos
  const colWidthsData = {
    cliente: "25%",
    oferta: "25%",
    fechaSesion: "15%",
    ci: "15%",
    telefono: "20%",
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>
          Reporte de Reservas - {monthNames[month]} {year}
        </Text>
        {filteredReservations.length > 0 ? (
          <View style={styles.table}>
            {/* Encabezados de la tabla */}
            <View style={styles.tableRow}>
              <Text
                style={[
                  styles.tableColHeader,
                  { width: colWidthsHeader.cliente },
                ]}
              >
                Cliente
              </Text>
              <Text
                style={[
                  styles.tableColHeader,
                  { width: colWidthsHeader.oferta },
                ]}
              >
                Oferta
              </Text>
              <Text
                style={[
                  styles.tableColHeader,
                  { width: colWidthsHeader.fechaSesion },
                ]}
              >
                Fecha Sesión
              </Text>
              <Text
                style={[styles.tableColHeader, { width: colWidthsHeader.ci }]}
              >
                CI
              </Text>
              <Text
                style={[
                  styles.tableColHeader,
                  { width: colWidthsHeader.telefono },
                ]}
              >
                Teléfono
              </Text>
            </View>
            {/* Filas de datos de la tabla */}
            {filteredReservations.map((reserva, index) => (
              <View style={styles.tableRow} key={index}>
                <Text
                  style={[styles.tableCol, { width: colWidthsData.cliente }]}
                >
                  {reserva.nombre_cliente} {reserva.apellidos}
                </Text>
                <Text
                  style={[styles.tableCol, { width: colWidthsData.oferta }]}
                >
                  {reserva.oferta?.nombre_oferta ||
                    reserva.oferta_personalizada?.nombre_oferta ||
                    "Personalizada"}
                </Text>
                <Text
                  style={[
                    styles.tableCol,
                    { width: colWidthsData.fechaSesion },
                  ]}
                >
                  {format(
                    parseDateForCalendar(reserva.fecha_sesion), // Usar parseDateForCalendar
                    "dd/MM/yyyy",
                    { locale: es }
                  )}
                </Text>
                <Text style={[styles.tableCol, { width: colWidthsData.ci }]}>
                  {reserva.ci}
                </Text>
                <Text
                  style={[styles.tableCol, { width: colWidthsData.telefono }]}
                >
                  {reserva.telefono}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noReservations}>
            No hay reservas para el mes seleccionado.
          </Text>
        )}
      </Page>
    </Document>
  );
};

// Componente principal del botón de exportación (sin cambios aquí)
const ReservationsPdfExport = ({ reservations, month, year }) => {
  const filteredReservations = reservations.filter((reserva) => {
    if (!reserva.fecha_sesion) return false;
    const reservationDate = parseDateForCalendar(reserva.fecha_sesion); // Usar parseDateForCalendar
    return (
      reservationDate.getMonth() === month &&
      reservationDate.getFullYear() === year
    );
  });

  return (
    <PDFDownloadLink
      document={
        <ReservationsDocument
          reservations={reservations}
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
              ? "No hay reservas para exportar"
              : "Exportar a PDF"}
        </>
      )}
    </PDFDownloadLink>
  );
};

export default ReservationsPdfExport;
