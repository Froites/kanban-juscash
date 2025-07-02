import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import logo_verde from '@/assets/logo_verde.png';


export const Navbar: React.FC = () => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={logo_verde} alt="Logo JusCash" className="h-16 mx-auto mb-2" />
            {/* <h1 className="text-2xl font-bold text-juscash_blue">JusCash</h1> */}
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-sm text-gray-600">
                Olá, {user.nome}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-700 hover:text-red-600 transition-colors px-3 py-2 rounded-md"
            >
              <LogOut className="w-5 h-5 mr-1" />
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};