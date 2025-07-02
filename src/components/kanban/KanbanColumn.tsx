import React, { useState, useRef } from 'react';
import { PublicationCard } from './PublicationCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Publication } from '@/types';


interface KanbanColumnProps {
  title: string;
  status: Publication['status'];
  publications: Publication[];
  onCardClick: (publication: Publication) => void;
  onCardMove: (publicationId: string, newStatus: Publication['status']) => void;
  onLoadMore: () => void;
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  titleColor?: string;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  status,
  publications,
  onCardClick,
  onCardMove,
  onLoadMore,
  isLoading,
  isLoadingMore,
  hasMore,
  titleColor,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Detectar scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (scrollHeight - scrollTop <= clientHeight * 1.1 && hasMore && !isLoadingMore) {
      onLoadMore();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const publicationId = e.dataTransfer.getData('text/plain');
    if (publicationId) {
      onCardMove(publicationId, status);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 rounded-lg p-4 min-h-[600px]">
      <div className="flex justify-between items-center mb-4">
        <h2 
          className="font-semibold text-gray-800" 
          style={titleColor ? { color: titleColor } : {}}
        >
          {title}
        </h2>
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
          {publications.length}
        </span>
      </div>
      
      {/* drop com scroll */}
      <div
        ref={scrollRef}
        className={`flex-1 space-y-3 overflow-y-auto custom-scrollbar ${
          isDragOver ? 'bg-primary-50 border-2 border-dashed border-primary-300 rounded-lg' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onScroll={handleScroll}
      >
        {isLoading && publications.length === 0 ? (
          <LoadingSpinner />
        ) : publications.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">📋</div>
            <p>Nenhuma publicação</p>
          </div>
        ) : (
          <>
            {publications.map((publication) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
                onClick={() => onCardClick(publication)}
              />
            ))}

            {isLoadingMore && (
              <div className="py-4">
                <LoadingSpinner size="sm" />
              </div>
            )}

            {!hasMore && publications.length > 0 && (
              <div className="text-center text-gray-400 py-4 text-sm">
                Todas as publicações carregadas
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};