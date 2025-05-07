import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchCharacters, addCharacter, deleteCharacter } from '../services/api';
import { Character } from '../types';
import CharacterCard from '../components/CharacterCard';
import CharacterForm from '../components/CharacterForm';

const CharactersPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const { token } = useAuth();

  const loadCharacters = async () => {
    const data = await fetchCharacters(token!);
    setCharacters(data);
  };

  useEffect(() => { if (token) loadCharacters(); }, [token]);

  const handleAdd = async (char: Character) => {
    await addCharacter(token!, char);
    loadCharacters();
  };

  const handleDelete = async (nom: string) => {
    await deleteCharacter(token!, nom);
    loadCharacters();
  };

  return (
    <div className="p-4">
      <CharacterForm onSave={handleAdd} />
      <div className="mt-4 grid gap-2">
        {characters.map(c => (
          <CharacterCard key={c.nom} character={c} onDelete={() => handleDelete(c.nom)} />
        ))}
      </div>
    </div>
  );
};

export default CharactersPage;
