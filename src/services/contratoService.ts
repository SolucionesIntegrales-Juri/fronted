import api from '../api';
import type { ContratoRequestDto, ContratoResponseDto } from '../types/contract';

// Usamos rutas relativas para que api.ts (baseURL '/api') resuelva adecuadamente en cualquier entorno.
const BASE_PATH = 'contratos';

class ContratoService {
  private extractList(data: unknown): ContratoResponseDto[] {
    if (Array.isArray(data)) return data as ContratoResponseDto[];
    if (data && typeof data === 'object') {
      const obj = data as Record<string, unknown>;
      const content = obj.content;
      if (Array.isArray(content)) return content as ContratoResponseDto[];
      const items = obj.items;
      if (Array.isArray(items)) return items as ContratoResponseDto[];
      const nestedData = obj.data;
      if (Array.isArray(nestedData)) return nestedData as ContratoResponseDto[];
    }
    return [];
  }

  /** GET /api/contratos */
  async findAll(): Promise<ContratoResponseDto[]> {
    const res = await api.get(BASE_PATH);
    return this.extractList(res.data);
  }

  /** GET /api/contratos/{id} */
  async findById(id: string): Promise<ContratoResponseDto> {
    const res = await api.get(`${BASE_PATH}/${id}`);
    return res.data;
  }

  /** GET /api/contratos/cliente/{clienteId} */
  async listarPorCliente(clienteId: string): Promise<ContratoResponseDto[]> {
    const res = await api.get(`${BASE_PATH}/cliente/${clienteId}`);
    return this.extractList(res.data);
  }

  /** GET /api/contratos/vehiculo/{vehiculoId} */
  async listarPorVehiculo(vehiculoId: string): Promise<ContratoResponseDto[]> {
    const res = await api.get(`${BASE_PATH}/vehiculo/${vehiculoId}`);
    return this.extractList(res.data);
  }

  /** GET /api/contratos/estado/{estado} */
  async listarPorEstado(estado: string): Promise<ContratoResponseDto[]> {
    const res = await api.get(`${BASE_PATH}/estado/${estado}`);
    return this.extractList(res.data);
  }

  /** POST /api/contratos */
  async create(dto: ContratoRequestDto): Promise<ContratoResponseDto> {
    const res = await api.post(BASE_PATH, dto);
    return res.data;
  }

  /** PUT /api/contratos/{id} */
  async update(id: string, dto: ContratoRequestDto): Promise<ContratoResponseDto> {
    const res = await api.put(`${BASE_PATH}/${id}`, dto);
    return res.data;
  }

  /** DELETE /api/contratos/{id} */
  async delete(id: string): Promise<void> {
    await api.delete(`${BASE_PATH}/${id}`);
  }

  /** PUT /api/contratos/{id}/finalizar */
  async finalizar(id: string): Promise<ContratoResponseDto> {
    const res = await api.put(`${BASE_PATH}/${id}/finalizar`);
    return res.data;
  }

  /** PUT /api/contratos/{id}/cancelar */
  async cancelar(id: string): Promise<ContratoResponseDto> {
    const res = await api.put(`${BASE_PATH}/${id}/cancelar`);
    return res.data;
  }

  /** POST /api/contratos/rango-fechas */
  async listarPorRangoFechas(fechaInicio: string, fechaFin: string): Promise<ContratoResponseDto[]> {
    const res = await api.post(`${BASE_PATH}/rango-fechas`, { fechaInicio, fechaFin });
    return this.extractList(res.data);
  }
}

export const contratoService = new ContratoService();
