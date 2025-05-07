
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Character } from "../types/character";
import {
  fetchCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  fetchExampleCharacters
} from "../services/api";

export const useCharacterOperations = () => {
  const { toast } = useToast();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isLoadingExamples, setIsLoadingExamples] = useState<boolean>(false);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    setLoading(true);
    try {
      const data = await fetchCharacters();
      setCharacters(data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur s'est produite lors du chargement des personnages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitForm = async (data: Character, originalName?: string) => {
    setIsSubmitting(true);
    try {
      if (originalName) {
        // Update
        const updatedCharacter = await updateCharacter(originalName, data);
        setCharacters(characters.map(char => 
          char.nom === originalName ? updatedCharacter : char
        ));
        toast({
          title: "Succès",
          description: `Le personnage ${updatedCharacter.nom} a été mis à jour avec succès.`,
        });
      } else {
        // Create
        const newCharacter = await createCharacter(data);
        setCharacters([...characters, newCharacter]);
        toast({
          title: "Succès",
          description: `Le personnage ${newCharacter.nom} a été créé avec succès.`,
        });
      }
      return true;
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur s'est produite",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (name: string) => {
    setIsDeleting(true);
    try {
      await deleteCharacter(name);
      setCharacters(characters.filter(char => char.nom !== name));
      toast({
        title: "Succès",
        description: `Le personnage ${name} a été supprimé avec succès.`,
      });
      return true;
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur s'est produite lors de la suppression",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLoadExamples = async () => {
    setIsLoadingExamples(true);
    try {
      const examples = await fetchExampleCharacters();
      
      // Ajouter chaque exemple s'il n'existe pas déjà
      for (const example of examples) {
        if (!characters.some(char => char.nom === example.nom)) {
          try {
            await createCharacter(example);
          } catch (error) {
            console.error(`Erreur lors de l'ajout de ${example.nom}:`, error);
          }
        }
      }
      
      // Recharger tous les personnages
      await loadCharacters();
      
      toast({
        title: "Succès",
        description: "Les personnages d'exemple ont été chargés avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur s'est produite lors du chargement des exemples",
        variant: "destructive",
      });
    } finally {
      setIsLoadingExamples(false);
    }
  };

  return {
    characters,
    loading,
    isSubmitting,
    isDeleting,
    isLoadingExamples,
    loadCharacters,
    handleSubmitForm,
    handleDelete,
    handleLoadExamples
  };
};
