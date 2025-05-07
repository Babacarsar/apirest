import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, List, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-purple-700 to-purple-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center transition-transform hover:scale-105">
          <User className="mr-2" size={28} />
          <span>CharacterVerse</span>
        </Link>
        
        <nav>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link 
                to="/characters" 
                className="flex items-center hover:text-purple-200 transition-colors"
              >
                <List className="mr-1" size={20} />
                <span>Characters</span>
              </Link>
              
              <button 
                onClick={handleLogout}
                className="flex items-center hover:text-purple-200 transition-colors"
              >
                <LogOut className="mr-1" size={20} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center hover:text-purple-200 transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;