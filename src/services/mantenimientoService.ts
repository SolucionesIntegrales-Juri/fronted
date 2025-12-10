import api from '../api';

export interface Mantenimiento {
  id: number;
  vehiculoId: string;
  fechaInicio: string;
  fechaFin?: string;
  descripcion: string;
  costo: number;
  estado: 'ACTIVO' | 'FINALIZADO';
  tipoMantenimiento: string;
}

export interface MantenimientoRequestDto {
  vehiculoId: string;
  fechaInicio: string;
  fechaFin?: string;
  descripcion: string;
  costo: number;
  tipoMantenimiento: string;
}

const BASE_PATH = '/mantenimientos';

class MantenimientoService {
  /** GET /api/mantenimientos */
  async listarTodos(): Promise<Mantenimiento[]> {
    const res = await api.get(BASE_PATH);
    return res.data;
  }

  /** GET /api/mantenimientos/activos */
  async listarActivos(): Promise<Mantenimiento[]> {
    const res = await api.get(`${BASE_PATH}/activos`);
    return res.data;
  }

  /** GET /api/mantenimientos/{id} */
  async obtenerPorId(id: number): Promise<Mantenimiento> {
    const res = await api.get(`${BASE_PATH}/${id}`);
    return res.data;
  }

  /** GET /api/mantenimientos/vehiculo/{vehiculoId} */
  async listarPorVehiculo(vehiculoId: string): Promise<Mantenimiento[]> {
    const res = await api.get(`${BASE_PATH}/vehiculo/${vehiculoId}`);
    return res.data;
  }

  /** GET /api/mantenimientos/vehiculo/{vehiculoId}/activos */
  async listarMantenimientosActivosPorVehiculo(vehiculoId: string): Promise<Mantenimiento[]> {
    const res = await api.get(`${BASE_PATH}/vehiculo/${vehiculoId}/activos`);
    return res.data;
  }

  /** GET /api/mantenimientos/vehiculo/{vehiculoId}/historial */
  async listarHistorial(vehiculoId: string): Promise<Mantenimiento[]> {
    const res = await api.get(`${BASE_PATH}/vehiculo/${vehiculoId}/historial`);
    return res.data;
  }

  /** GET /api/mantenimientos/vehiculo/{vehiculoId}/costo-total */
  async obtenerCostoTotal(vehiculoId: string): Promise<number> {
    const res = await api.get(`${BASE_PATH}/vehiculo/${vehiculoId}/costo-total`);
    return res.data;
  }

  /** GET /api/mantenimientos/proximos-vencer */
  async listarProximosAVencer(fechaLimite: string): Promise<Mantenimiento[]> {
    const res = await api.get(`${BASE_PATH}/proximos-vencer`, { params: { fechaLimite } });
    return res.data;
  }

  /** POST /api/mantenimientos */
  async crear(dto: MantenimientoRequestDto): Promise<Mantenimiento> {
    const res = await api.post(BASE_PATH, dto);
    return res.data;
  }

  /** PUT /api/mantenimientos/{id} */
  async actualizar(id: number, dto: MantenimientoRequestDto): Promise<Mantenimiento> {
    const res = await api.put(`${BASE_PATH}/${id}`, dto);
    return res.data;
  }

  /** PUT /api/mantenimientos/{id}/finalizar */
  async finalizar(id: number): Promise<Mantenimiento> {
    const res = await api.put(`${BASE_PATH}/${id}/finalizar`);
    return res.data;
  }

  /** DELETE /api/mantenimientos/{id} */
  async eliminar(id: number): Promise<void> {
    await api.delete(`${BASE_PATH}/${id}`);
  }
}

export const mantenimientoService = new MantenimientoService();
