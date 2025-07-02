import React from 'react';
import { Eye, Calendar, Clock4} from 'lucide-react';
import { Publication } from '@/types';
import { formatDate } from '@/utils/helpers';

interface PublicationCardProps {
  publication: Publication;
  onClick: () => void;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({
  publication,
  onClick,
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', publication.id.toString());
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      {/* Header do card */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-900 text-sm break-all leading-tight">
          {publication.numero_processo || "Não encontrado"}
        </h3>
        <Eye className="w-4 h-4 text-gray-400 group-hover:text-primary-500 flex-shrink-0 ml-2 transition-colors" />
      </div>
      
      {/* Informações */}
      <div className="flex justify-between items-center text-xs text-gray-600">
        <div className="flex items-center">
          <Clock4 className="w-3 h-3 mr-1 flex-shrink-0" />
          <span>{formatDate(publication.updated_at)}</span>
        </div>

        <div className="flex items-center">
          <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
          <span>DJE: {formatDate(publication.data_disponibilizacao)}</span>
        </div>

        
        {
        /* COMENTADO CASO PRECISE COLOCAR 
        <div className="flex items-start">
          <User className="w-3 h-3 mr-1 flex-shrink-0 mt-0.5" />
          <span className="text-gray-800 font-medium break-words leading-tight">
            {publication.autores}
          </span>
        </div> */}
      </div>
      
      {/* Indicador de drag */}
      <div className="flex justify-center mt-3 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
        Arraste para mover
      </div>
    </div>
  );
};