import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { SearchAndFilter } from '@/components/layout/SearchAndFilter';
import { KanbanColumn } from './KanbanColumn';
import { PublicationModal } from './PublicationModal';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Publication, PublicationFilters } from '@/types';
import { publicationService } from '@/services/publicationService';
import { useDebounce } from '@/hooks/useDebounce';
import { isValidMove } from '@/utils/helpers';

export const KanbanBoard: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  
  // Filtros
  const [filters, setFilters] = useState<PublicationFilters>({
    search: '',
    data_inicio: '',
    data_fim: '',
  });

  // Debounce para buscas
  const debouncedSearchTerm = useDebounce(filters.search, 500);

  const loadPublications = useCallback(async (resetPage = true) => {
    try {
      setLoading(true);
      setError('');
      
      const page = resetPage ? 1 : currentPage;
      
      const response = await publicationService.getPublications({
        search: debouncedSearchTerm,
        data_inicio: filters.data_inicio,
        data_fim: filters.data_fim,
        page,
      });
      
      if (resetPage) {
        setPublications(response.data);
        setCurrentPage(1);
      } else {
        setPublications(prev => [...prev, ...response.data]);
      }

      setHasMore(page < response.pagination.totalPages);
      setCurrentPage(page);
      
    } catch (error: any) {
      console.error('Erro ao carregar publicações:', error);
      setError(error.error || 'Erro ao carregar publicações. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, filters.data_inicio, filters.data_fim, currentPage]);

  const loadMorePublications = useCallback(async (status: Publication['status']) => {
    if (!hasMore || loadingMore) return;

    try {
      setLoadingMore(true);
      
      const response = await publicationService.getPublications({
        search: debouncedSearchTerm,
        data_inicio: filters.data_inicio,
        data_fim: filters.data_fim,
        status,
        page: currentPage + 1,
      });
      
      setPublications(prev => [...prev, ...response.data]);
      setCurrentPage(prev => prev + 1);
      setHasMore(currentPage + 1 < response.pagination.totalPages);
      
    } catch (error: any) {
      console.error('Erro ao carregar mais publicações:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [debouncedSearchTerm, filters.data_inicio, filters.data_fim, currentPage, hasMore, loadingMore]);

  useEffect(() => {
    loadPublications(true);
  }, [debouncedSearchTerm, filters.data_inicio, filters.data_fim]);

  // Atualizar filtros
  const handleFilterChange = (key: string, value: string) => {
    const filterMapping: Record<string, keyof PublicationFilters> = {
      searchTerm: 'search',
      startDate: 'data_inicio', 
      endDate: 'data_fim',
    };
    
    const apiKey = filterMapping[key] || key;
    setFilters(prev => ({ ...prev, [apiKey]: value }));
    setCurrentPage(1);
    setHasMore(true);
  };

  const handleSearch = () => {
    loadPublications(true);
  };

  // (drag & drop)
  const handleCardMove = async (publicationId: string, newStatus: Publication['status']) => {
    const id = parseInt(publicationId);
    const publication = publications.find(p => p.id === id);
    if (!publication) return;

    if (!isValidMove(publication.status, newStatus)) {
      setError('Movimento não permitido entre essas colunas.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      setPublications(prev =>
        prev.map(pub =>
          pub.id === id ? { ...pub, status: newStatus } : pub
        )
      );
      
      await publicationService.updatePublicationStatus(id, newStatus);
      
    } catch (error: any) {
      console.error('Erro ao mover publicação:', error);
      setError(error.error || 'Erro ao mover publicação. Recarregando...');

      loadPublications(true);
    }
  };

  const getPublicationsByStatus = (status: Publication['status']) => {
    return publications.filter(pub => pub.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <SearchAndFilter
        searchTerm={filters.search || ''}
        onSearchChange={(value) => handleFilterChange('searchTerm', value)}
        startDate={filters.data_inicio || ''}
        onStartDateChange={(value) => handleFilterChange('startDate', value)}
        endDate={filters.data_fim || ''}
        onEndDateChange={(value) => handleFilterChange('endDate', value)}
        onSearch={handleSearch}
      />
      
      {error && (
        <div className="max-w-7xl mx-auto px-4 py-2">
          <ErrorMessage message={error} variant="card" />
        </div>
      )}
      
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KanbanColumn
            title="Novas Publicações"
            status="nova"
            publications={getPublicationsByStatus('nova')}
            onCardClick={setSelectedPublication}
            onCardMove={handleCardMove}
            onLoadMore={() => loadMorePublications('nova')}
            isLoading={loading}
            isLoadingMore={loadingMore}
            hasMore={hasMore}
          />
          
          <KanbanColumn
            title="Publicações Lidas"
            status="lida"
            publications={getPublicationsByStatus('lida')}
            onCardClick={setSelectedPublication}
            onCardMove={handleCardMove}
            onLoadMore={() => loadMorePublications('lida')}
            isLoading={loading}
            isLoadingMore={loadingMore}
            hasMore={hasMore}
          />
          
          <KanbanColumn
            title="Enviar para Advogado Responsável"
            status="enviada_adv"
            publications={getPublicationsByStatus('enviada_adv')}
            onCardClick={setSelectedPublication}
            onCardMove={handleCardMove}
            onLoadMore={() => loadMorePublications('enviada_adv')}
            isLoading={loading}
            isLoadingMore={loadingMore}
            hasMore={hasMore}
          />
          
          <KanbanColumn
            title="Concluído"
            status="concluida"
            publications={getPublicationsByStatus('concluida')}
            onCardClick={setSelectedPublication}
            onCardMove={handleCardMove}
            onLoadMore={() => loadMorePublications('concluida')}
            isLoading={loading}
            isLoadingMore={loadingMore}
            hasMore={hasMore}
            titleColor="#2cbd62"
          />
        </div>
      </div>
      
      {selectedPublication && (
        <PublicationModal
          publication={selectedPublication}
          onClose={() => setSelectedPublication(null)}
        />
      )}
    </div>
  );
};