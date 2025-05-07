import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [tokenInput, setTokenInput] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    login(tokenInput);
  };

  return (
    <div className="p-4">
      <input value={tokenInput} onChange={e => setTokenInput(e.target.value)} placeholder="Token" className="border p-2" />
      <button onClick={handleLogin} className="ml-2 bg-green-600 text-white px-4 py-2">Connexion</button>
    </div>
  );
};

export default LoginPage;
