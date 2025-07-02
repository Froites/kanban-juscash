import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Publication } from '@/types';
import { formatCurrency, formatDate } from '@/utils/helpers';

interface PublicationModalProps {
  publication: Publication;
  onClose: () => void;
}

export const PublicationModal: React.FC<PublicationModalProps> = ({
  publication,
  onClose,
}) => {
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`Publicações - ${publication.numero_processo}`}
      size="lg"
    >
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Autor(es)
          </label>
          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
            {publication.autores}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Réu
          </label>
          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
            {publication.reu}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Advogado(s)
          </label>
          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
            {publication.advogados}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Principal Bruto
            </label>
            <p className="text-gray-900 bg-green-50 p-3 rounded-lg font-medium">
              {formatCurrency(publication.valor_principal_bruto)}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor dos Juros Moratórios
            </label>
            <p className="text-gray-900 bg-blue-50 p-3 rounded-lg font-medium">
              {formatCurrency(publication.valor_juros_moratorios)}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor dos Honorários Advocatícios
            </label>
            <p className="text-gray-900 bg-purple-50 p-3 rounded-lg font-medium">
              {formatCurrency(publication.honorarios_advocaticios)}
            </p>
          </div>
          
          {/* URL da publicação (se tiver) */}
          {publication.url_publicacao && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link da Publicação
              </label>
              <a 
                href={publication.url_publicacao}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 bg-gray-50 p-3 rounded-lg block break-all"
              >
                Ver publicação original
              </a>
            </div>
          )}
        </div>
        
        {/* Datas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data DJE
            </label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
              {formatDate(publication.data_disponibilizacao)}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Extração
            </label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
              {publication.data_extracao ? formatDate(publication.data_extracao) : 'N/A'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Última Atualização
            </label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
              {formatDate(publication.updated_at)}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conteúdo Completo da Publicação
          </label>
          <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
            <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
              {publication.conteudo_completo}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
