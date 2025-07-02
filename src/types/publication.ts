export type PublicationStatus = 'nova' | 'lida' | 'enviada_adv' | 'concluida';

export interface Publication {
  id: number;
  numero_processo: string;
  data_disponibilizacao: string;
  autores: string;
  advogados: string;
  reu: string;
  conteudo_completo: string;
  valor_principal_bruto: number;
  valor_juros_moratorios: number;
  honorarios_advocaticios: number;
  status: PublicationStatus;
  data_extracao?: string;
  url_publicacao?: string;
  created_at: string;
  updated_at: string;
}

export interface PublicationFilters {
  status?: PublicationStatus;
  search?: string;
  data_inicio?: string;
  data_fim?: string;
  autor?: string;
  numero_processo?: string;
  page?: number;
  limit?: number;
}

export interface PublicationResponse {
  data: Publication[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PublicationStats {
  estatisticas: {
    total: number;
    por_status: {
      nova: number;
      lida: number;
      enviada_adv: number;
      concluida: number;
    };
    valores: {
      total: number;
      medio: number;
    };
  };
}