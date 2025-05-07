
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface HeaderProps {
  onAddCharacter: () => void;
  onLoadExamples: () => void;
  isLoadingExamples: boolean;
}

const Header: React.FC<HeaderProps> = ({ onAddCharacter, onLoadExamples, isLoadingExamples }) => {
  return (
    <header className="bg-gradient-to-r from-hero-dark via-hero to-hero-light py-8 px-6 rounded-lg shadow-md mb-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-bold text-white">Gestionnaire de Personnages</h1>
            <p className="text-white/80 mt-2">
              Créez et gérez votre collection de personnages fictifs
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={onAddCharacter}
              className="flex items-center gap-2 bg-white text-hero hover:bg-white/90"
            >
              <Plus size={18} />
              Ajouter un personnage
            </Button>
            <Button 
              onClick={onLoadExamples}
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10"
              disabled={isLoadingExamples}
            >
              {isLoadingExamples ? "Chargement..." : "Charger des exemples"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
