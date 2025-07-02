import React from 'react';
import { Search, Calendar } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string | undefined;
  onSearchChange: (term: string) => void;
  startDate: string | undefined;
  onStartDateChange: (date: string) => void;
  endDate: string | undefined;
  onEndDateChange: (date: string) => void;
  onSearch: () => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onSearch,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 max-w-7xl mx-auto p-4">
        <div className="block text-2xl font-bold text-juscash_blue mb-4 md:mb-0 text-center md:text-left">Publicações</div>

        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
          <div className="flex-1 relative w-full">
            <input
              type="text"
              placeholder="Buscar por número do processo, autor, réu ou advogado..."
              value={searchTerm || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Calendar className="w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={startDate || ''}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
                placeholder="Data início"
              />
            </div>
            
            <span className="text-gray-500 w-full text-center sm:w-auto">até</span>

            <input
              type="date"
              value={endDate || ''}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
              placeholder="Data fim"
            />

            <button
              onClick={onSearch}
              className="flex justify-center p-2 bg-juscash_green text-white rounded-lg hover:bg-success-600 transition-colors w-full sm:w-auto"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};