import React from 'react';
import { Character } from '../types';

interface Props {
  character: Character;
  onDelete: () => void;
}

const CharacterCard: React.FC<Props> = ({ character, onDelete }) => (
  <div className="p-4 border rounded">
    <h2 className="font-bold">{character.nom}</h2>
    <p className="text-sm">{character.univers}</p>
    <button onClick={onDelete} className="mt-2 text-red-600">Supprimer</button>
  </div>
);

export default CharacterCard;
