export interface User {
  id: number;
  nome: string;
  email: string;
  created_at?: string;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  confirmPassword: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

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

export interface ApiResponse<T = any> {
  data?: T;
  user?: any;
  token?: string;
  message?: string;
  error?: string;
  estatisticas?: any;
  pagination?: any;
}

export interface ApiError {
  error: string;
  status?: number;
  path?: string;
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/me',
  },
  PUBLICATIONS: {
    LIST: '/publicacoes',
    CREATE: '/publicacoes',
    UPDATE_STATUS: (id: number | string) => `/publicacoes/${id}/status`,
    STATS: '/publicacoes/stats',
  },
  UTILS: {
    HEALTH: '/health',
    DB_TEST: '/api/db-test',
  },
} as const;

export const PUBLICATION_STATUS = {
  NOVA: 'nova',
  LIDA: 'lida',
  ENVIADA: 'enviada_adv',
  CONCLUIDA: 'concluida',
} as const;

export const PUBLICATION_STATUS_LABELS = {
  [PUBLICATION_STATUS.NOVA]: 'Publicações Novas',
  [PUBLICATION_STATUS.LIDA]: 'Publicações Lidas',
  [PUBLICATION_STATUS.ENVIADA]: 'Enviadas para ADV',
  [PUBLICATION_STATUS.CONCLUIDA]: 'Concluídas',
} as const;

export const PUBLICATION_STATUS_COLORS = {
  [PUBLICATION_STATUS.NOVA]: 'status-nova',
  [PUBLICATION_STATUS.LIDA]: 'status-lida',
  [PUBLICATION_STATUS.ENVIADA]: 'status-enviada',
  [PUBLICATION_STATUS.CONCLUIDA]: 'status-concluida',
} as const;

// Regras de movimento do Kanban conforme API
export const VALID_MOVES: Record<string, string[]> = {
  [PUBLICATION_STATUS.NOVA]: [PUBLICATION_STATUS.LIDA],
  [PUBLICATION_STATUS.LIDA]: [PUBLICATION_STATUS.ENVIADA, PUBLICATION_STATUS.CONCLUIDA],
  [PUBLICATION_STATUS.ENVIADA]: [PUBLICATION_STATUS.LIDA, PUBLICATION_STATUS.CONCLUIDA],
  [PUBLICATION_STATUS.CONCLUIDA]: [],
} as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 30,
  MAX_LIMIT: 100,
} as const;