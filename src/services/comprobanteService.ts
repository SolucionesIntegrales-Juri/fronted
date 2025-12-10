import api from '../api';

export interface ComprobanteRequestDto {
  idContrato: string;
  tipoComprobante: 'FACTURA' | 'BOLETA';
}

export interface ComprobanteResponseDto {
  idComprobante: string;
  idContrato: string;
  fechaEmision: string; // LocalDateTime ISO
  tipoComprobante: string;
  numeroSerie: string;
  numeroCorrelativo: string;
  subtotal: string; // BigDecimal serializado
  igv: string; // BigDecimal serializado
  total: string; // BigDecimal serializado
  estado: string;
}

const BASE_PATH = '/comprobantes';

class ComprobanteService {
  /** POST /api/comprobantes */
  async generar(dto: ComprobanteRequestDto): Promise<ComprobanteResponseDto> {
    const res = await api.post(BASE_PATH, dto);
    return res.data;
  }

  /** GET /api/comprobantes/contrato/{contratoId} */
  async obtenerPorContrato(contratoId: string): Promise<ComprobanteResponseDto> {
    const res = await api.get(`${BASE_PATH}/contrato/${contratoId}`);
    return res.data;
  }

  /** GET /api/comprobantes/{comprobanteId}/descargar */
  async descargarPdf(comprobanteId: string): Promise<Blob> {
    const res = await api.get(`${BASE_PATH}/${comprobanteId}/descargar`, {
      responseType: 'blob'
    });
    return res.data;
  }

  /** PUT /api/comprobantes/{comprobanteId}/anular */
  async anular(comprobanteId: string): Promise<void> {
    await api.put(`${BASE_PATH}/${comprobanteId}/anular`);
  }

  /** POST /api/comprobantes/rango-fechas */
  async listarPorRangoFechas(fechaInicio: string, fechaFin: string): Promise<ComprobanteResponseDto[]> {
    const res = await api.post(`${BASE_PATH}/rango-fechas`, { fechaInicio, fechaFin });
    return res.data;
  }
}

export const comprobanteService = new ComprobanteService();
