import { apiClient } from './api';
import { Publication, PublicationFilters, PublicationResponse, PublicationStats } from '@/types';
import { API_ENDPOINTS, PAGINATION } from '@/utils/constants';
import { removeEmptyValues } from '@/utils/helpers';

class PublicationService {
  async getPublications(filters: PublicationFilters = {}): Promise<PublicationResponse> {
    const params = new URLSearchParams(removeEmptyValues({
      status: filters.status || '',
      search: filters.search || '',
      data_inicio: filters.data_inicio || '',
      data_fim: filters.data_fim || '',
      autor: filters.autor || '',
      numero_processo: filters.numero_processo || '',
      page: (filters.page || 1).toString(),
      limit: (filters.limit || PAGINATION.DEFAULT_LIMIT).toString(),
    }));

    const response = await apiClient.get<PublicationResponse>(`${API_ENDPOINTS.PUBLICATIONS.LIST}?${params}`);
    return response;
  }

  async updatePublicationStatus(id: number, status: Publication['status']): Promise<Publication> {
    const response = await apiClient.put<{ data: Publication; message: string }>(
      API_ENDPOINTS.PUBLICATIONS.UPDATE_STATUS(id), 
      { status }
    );
    return response.data;
  }

  async getStats(): Promise<PublicationStats> {
    const response = await apiClient.get<PublicationStats>(API_ENDPOINTS.PUBLICATIONS.STATS);
    return response;
  }

  async loadMorePublications(
    currentPublications: Publication[],
    filters: PublicationFilters,
    nextPage: number
  ): Promise<{ publications: Publication[]; hasMore: boolean }> {
    const response = await this.getPublications({
      ...filters,
      page: nextPage,
    });

    return {
      publications: [...currentPublications, ...response.data],
      hasMore: nextPage < response.pagination.totalPages,
    };
  }
}

export const publicationService = new PublicationService();