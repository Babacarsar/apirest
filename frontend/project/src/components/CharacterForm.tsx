import React, { useState } from 'react';
import { Character } from '../types';

interface Props {
  onSave: (char: Character) => void;
}

const CharacterForm: React.FC<Props> = ({ onSave }) => {
  const [nom, setNom] = useState('');
  const [univers, setUnivers] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ nom, univers });
    setNom('');
    setUnivers('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 flex gap-2">
      <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom" className="border p-1" />
      <input value={univers} onChange={e => setUnivers(e.target.value)} placeholder="Univers" className="border p-1" />
      <button type="submit" className="bg-purple-600 text-white px-2">Ajouter</button>
    </form>
  );
};

export default CharacterForm;
