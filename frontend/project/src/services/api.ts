import { Character, ApiResponse } from '../types';

const API_URL = 'http://localhost:8000';

export const fetchCharacters = async (token: string): Promise<Character[]> => {
  const response = await fetch(`${API_URL}/personnages`, {
    headers: { 'token': token }
  });
  if (!response.ok) throw new Error('Failed to fetch characters');
  return response.json();
};

export const addCharacter = async (token: string, character: Character): Promise<Character> => {
  const response = await fetch(`${API_URL}/personnages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify(character)
  });
  if (!response.ok) throw new Error('Failed to add character');
  return response.json();
};

export const deleteCharacter = async (token: string, nom: string): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/personnages/${encodeURIComponent(nom)}`, {
    method: 'DELETE',
    headers: { 'token': token }
  });
  if (!response.ok) throw new Error('Failed to delete character');
  return response.json();
};
