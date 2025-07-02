export interface ApiResponse<T = any> {
  data?: T;
  user?: any;
  token?: string;
  refreshToken?: string;
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
    UPDATE_STATUS: (id: number) => `/publicacoes/${id}/status`,
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