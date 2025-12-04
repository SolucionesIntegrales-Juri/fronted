import React, { useEffect, useState } from 'react';
import type { Vehiculo, EstadoVehiculo, TipoCombustible } from '../types/vehicle';
import { ConfirmDialog } from './ConfirmDialog';
import '../styles/ClientDetailsModal.css';

interface VehicleDetailsModalProps {
  vehicle: Vehiculo;
  onClose: () => void;
  onEdit?: (vehicle: Vehiculo) => void;
  onDelete?: (id: string) => void;
  onChangeStatus?: (id: string, status: EstadoVehiculo) => void; // estado operativo
  onChangeActivo?: (id: string, activo: boolean) => void; // activar/desactivar (soft delete / restore)
}

const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({ vehicle, onClose, onDelete, onChangeStatus, onChangeActivo }) => {
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type?: 'warning' | 'danger' | 'info' | 'success';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleDelete = () => {
    if (onDelete) {
      setConfirmDialog({
        isOpen: true,
        title: 'Eliminar vehículo',
        message: `¿Eliminar definitivamente el vehículo ${vehicle.modelo?.marca?.nombre} ${vehicle.modelo?.nombre}? Esta acción no se puede deshacer.`,
        type: 'danger',
        onConfirm: () => {
          onDelete(vehicle.id);
          onClose();
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        },
      });
    }
  };

  const handleChangeActivo = () => {
    if (!onChangeActivo) return;
    const newStatus = !vehicle.activo;
    const vehicleName = `${vehicle.modelo?.marca?.nombre || ''} ${vehicle.modelo?.nombre || ''}`.trim() || 'este vehículo';
    setConfirmDialog({
      isOpen: true,
      title: `${newStatus ? 'Activar' : 'Inactivar'} vehículo`,
      message: `¿${newStatus ? 'Activar' : 'Desactivar'} el vehículo ${vehicleName}?`,
      type: 'warning',
      onConfirm: () => {
        onChangeActivo(vehicle.id, newStatus);
        onClose();
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
      },
    });
  };

  const prettyFuel = (f: TipoCombustible) => {
    switch (f) {
      case 'GASOLINA': return 'Gasolina';
      case 'DIESEL': return 'Diésel';
      case 'ELECTRICO': return 'Eléctrico';
      case 'HIBRIDO': return 'Híbrido';
      case 'GLP': return 'GLP';
      default: return String(f);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="vehicle-details-title">
        <div className="modal-header">
          <div className="modal-title-area">
            <div className="modal-avatar">
              {vehicle.imagenUrl ? (
                <img 
                  src={vehicle.imagenUrl} 
                  alt="Vehículo" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
                />
              ) : (
                '🚗'
              )}
            </div>
            <div>
              <h2 id="vehicle-details-title" className="modal-title">{vehicle.modelo?.marca?.nombre} {vehicle.modelo?.nombre}</h2>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {vehicle.activo && (
                  <div className={`status-badge ${vehicle.estado === 'DISPONIBLE' ? 'active' : 'inactive'}`}>
                    {vehicle.estado === 'DISPONIBLE' ? 'Disponible' : vehicle.estado === 'ALQUILADO' ? 'Alquilado' : 'Mantenimiento'}
                  </div>
                )}
                {!vehicle.activo && (
                  <div className="status-badge inactivo">Inactivo</div>
                )}
              </div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        <div className="modal-body">
          <div className="details-grid">
            <div className="detail-row">
              <div className="detail-label">Tipo</div>
              <div className="detail-value">{vehicle.tipoVehiculo?.nombre || '—'}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Año</div>
              <div className="detail-value">{vehicle.anioFabricacion}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Placa</div>
              <div className="detail-value">{vehicle.placa || '—'}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Combustible</div>
              <div className="detail-value">{vehicle.combustible ? prettyFuel(vehicle.combustible) : '—'}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Descripción Adicional</div>
              <div className="detail-value">{vehicle.descripcion || '—'}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Creado</div>
              <div className="detail-value">{vehicle.creadoEn ? new Date(vehicle.creadoEn).toLocaleString() : '—'}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">ID</div>
              <div className="detail-value monospace">{vehicle.id}</div>
            </div>
          </div>

          {onChangeStatus && (
            <div className="modal-note" style={{ marginTop: 20 }}>
              <div style={{ marginBottom: 8, fontWeight: 600, color: '#374151' }}>Cambiar estado operativo</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(['DISPONIBLE','MANTENIMIENTO','ALQUILADO'] as EstadoVehiculo[]).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onChangeStatus(vehicle.id, s)}
                    className={"btn-secondary"}
                    style={{
                      borderColor: vehicle.estado === s ? '#111827' : undefined,
                      background: vehicle.estado === s ? '#111827' : undefined,
                      color: vehicle.estado === s ? '#fff' : undefined,
                    }}
                  >
                    {s === 'ALQUILADO' ? 'Alquilado' : s === 'DISPONIBLE' ? 'Disponible' : 'Mantenimiento'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cerrar</button>
                    {onChangeActivo && (
                      <button 
                        className={vehicle.activo ? "btn-warning" : "btn-success"} 
                        onClick={handleChangeActivo}
                      >
                        {vehicle.activo ? 'Inactivar' : 'Activar'}
                      </button>
                    )}
          {onDelete && (
            <button className="btn-danger" onClick={handleDelete}>Eliminar</button>
          )}
        </div>
      </div>
      
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default VehicleDetailsModal;
