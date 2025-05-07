
import { Character, ApiResponse } from "../types/character";

const BASE_URL = "http://localhost:8000"; // Ajustez selon votre configuration
const TOKEN = "mytoken123"; // Normalement ceci devrait être stocké de manière sécurisée

const headers = {
  "Content-Type": "application/json",
  "token": TOKEN
};

export const fetchCharacters = async (): Promise<Character[]> => {
  try {
    const response = await fetch(`${BASE_URL}/personnages`, {
      method: "GET",
      headers
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Une erreur s'est produite lors du chargement des personnages");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erreur lors du chargement des personnages:", error);
    throw error;
  }
};

export const createCharacter = async (character: Character): Promise<Character> => {
  try {
    const response = await fetch(`${BASE_URL}/personnages`, {
      method: "POST",
      headers,
      body: JSON.stringify(character)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Une erreur s'est produite lors de la création du personnage");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la création du personnage:", error);
    throw error;
  }
};

export const updateCharacter = async (originalName: string, character: Character): Promise<Character> => {
  try {
    const response = await fetch(`${BASE_URL}/personnages/${encodeURIComponent(originalName)}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(character)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Une erreur s'est produite lors de la modification du personnage");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la modification du personnage:", error);
    throw error;
  }
};

export const deleteCharacter = async (name: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/personnages/${encodeURIComponent(name)}`, {
      method: "DELETE",
      headers
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Une erreur s'est produite lors de la suppression du personnage");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la suppression du personnage:", error);
    throw error;
  }
};

export const fetchExampleCharacters = async (): Promise<Character[]> => {
  try {
    const response = await fetch(`${BASE_URL}/personnages/exemple`, {
      method: "GET",
      headers
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Une erreur s'est produite lors du chargement des exemples");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erreur lors du chargement des exemples:", error);
    throw error;
  }
};
