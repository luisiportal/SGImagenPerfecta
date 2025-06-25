import { useState } from "react";

export const useServiciosModals = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showReservaModal, setShowReservaModal] = useState(false);
  const [servicioToEditId, setServicioToEditId] = useState(null);
  const [showServiciosModal, setShowServiciosModal] = useState(false);

  const handleOpenEditModal = (id) => {
    setServicioToEditId(id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setServicioToEditId(null);
  };

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleOpenReservaModal = () => {
    setShowReservaModal(true);
  };

  const handleCloseReservaModal = () => {
    setShowReservaModal(false);
  };

  const handleOpenServiciosModal = () => {
    setShowServiciosModal(true);
  };

  const handleCloseServiciosModal = () => {
    setShowServiciosModal(false);
  };

  const handleOpenServiciosModalFromReserva = () => {
    setShowReservaModal(false);
    setShowServiciosModal(true);
  };

  return {
    showEditModal,
    setShowEditModal,
    showCreateModal,
    setShowCreateModal,
    showReservaModal,
    setShowReservaModal,
    servicioToEditId,
    setServicioToEditId,
    showServiciosModal,
    setShowServiciosModal,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleOpenReservaModal,
    handleCloseReservaModal,
    handleOpenServiciosModal,
    handleCloseServiciosModal,
    handleOpenServiciosModalFromReserva,
  };
};
