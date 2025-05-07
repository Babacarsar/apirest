
import React from "react";
import CharacterCard from "./CharacterCard";
import EmptyState from "./EmptyState";
import { Progress } from "@/components/ui/progress";
import { Character } from "../types/character";
import { Button } from "@/components/ui/button";

interface CharacterListProps {
  characters: Character[];
  loading: boolean;
  onEditCharacter: (character: Character) => void;
  onDeleteCharacter: (character: Character) => void;
  onAddCharacter: () => void;
  searchTerm: string;
  universeFilter: string;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  loading,
  onEditCharacter,
  onDeleteCharacter,
  onAddCharacter,
  searchTerm,
  universeFilter,
}) => {
  // Filter characters based on search term and universe filter
  const filteredCharacters = characters.filter((character) => {
    const matchesSearch = searchTerm === '' || 
      character.nom.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUniverse = universeFilter === '' || universeFilter === '_all' || 
      character.univers === universeFilter;
    
    return matchesSearch && matchesUniverse;
  });

  if (loading) {
    return (
      <div className="py-12">
        <p className="text-center mb-4">Chargement des personnages...</p>
        <Progress value={45} className="max-w-md mx-auto" />
      </div>
    );
  }

  if (characters.length === 0) {
    return <EmptyState onAddCharacter={onAddCharacter} />;
  }

  if (filteredCharacters.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">Aucun personnage trouvé</h3>
        <p className="text-muted-foreground mb-4">
          Essayez d'ajuster vos critères de recherche
        </p>
        <Button onClick={() => {
          // This function will be implemented in the parent component
        }} variant="outline">
          Réinitialiser les filtres
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCharacters.map((character) => (
        <CharacterCard
          key={character.nom}
          character={character}
          onEdit={onEditCharacter}
          onDelete={onDeleteCharacter}
        />
      ))}
    </div>
  );
};

export default CharacterList;
