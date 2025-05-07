
import React, { useState, useMemo } from "react";
import Header from "../components/Header";
import CharacterList from "../components/CharacterList";
import CharacterFormModal from "../components/CharacterFormModal";
import DeleteCharacterDialog from "../components/DeleteCharacterDialog";
import CharacterFilter from "../components/CharacterFilter";
import { Character } from "../types/character";
import { useCharacterOperations } from "../hooks/useCharacterOperations";
import { Button } from "@/components/ui/button";

const Index = () => {
  const {
    characters,
    loading,
    isSubmitting,
    isDeleting,
    isLoadingExamples,
    handleSubmitForm,
    handleDelete,
    handleLoadExamples
  } = useCharacterOperations();

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [characterToDelete, setCharacterToDelete] = useState<Character | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [universeFilter, setUniverseFilter] = useState<string>("_all");

  // Extract unique universes for the filter dropdown
  const universes = useMemo(() => {
    const uniqueUniverses = new Set<string>();
    characters.forEach((character) => {
      uniqueUniverses.add(character.univers);
    });
    return Array.from(uniqueUniverses);
  }, [characters]);

  const handleAddCharacter = () => {
    setSelectedCharacter(null);
    setIsSheetOpen(true);
  };

  const handleEditCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setIsSheetOpen(true);
  };

  const handleDeleteClick = (character: Character) => {
    setCharacterToDelete(character);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseForm = () => {
    setIsSheetOpen(false);
    setSelectedCharacter(null);
  };

  const handleSubmitFormWrapper = async (data: Character) => {
    const success = await handleSubmitForm(data, selectedCharacter?.nom);
    if (success) {
      handleCloseForm();
    }
  };

  const handleConfirmDelete = async () => {
    if (!characterToDelete) return;
    
    const success = await handleDelete(characterToDelete.nom);
    if (success) {
      setIsDeleteDialogOpen(false);
      setCharacterToDelete(null);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setUniverseFilter("_all");
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="container mx-auto px-4">
        <Header 
          onAddCharacter={handleAddCharacter} 
          onLoadExamples={handleLoadExamples}
          isLoadingExamples={isLoadingExamples}
        />
        
        <main>
          <CharacterFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            universeFilter={universeFilter}
            onUniverseFilterChange={setUniverseFilter}
            universes={universes}
            onResetFilters={handleResetFilters}
          />
          
          <CharacterList 
            characters={characters}
            loading={loading}
            onEditCharacter={handleEditCharacter}
            onDeleteCharacter={handleDeleteClick}
            onAddCharacter={handleAddCharacter}
            searchTerm={searchTerm}
            universeFilter={universeFilter}
          />
        </main>

        <CharacterFormModal
          isOpen={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          selectedCharacter={selectedCharacter}
          onSubmit={handleSubmitFormWrapper}
          onCancel={handleCloseForm}
          isSubmitting={isSubmitting}
        />

        <DeleteCharacterDialog
          isOpen={isDeleteDialogOpen}
          character={characterToDelete}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
};

export default Index;
