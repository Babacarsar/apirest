
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyStateProps {
  onAddCharacter: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddCharacter }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed rounded-lg border-primary/30 bg-accent/30">
      <div className="text-center max-w-md">
        <h3 className="text-xl font-semibold mb-2">Aucun personnage trouvé</h3>
        <p className="text-muted-foreground mb-6">
          Vous n'avez pas encore ajouté de personnages à votre collection. 
          Commencez par ajouter votre premier personnage ou chargez des exemples.
        </p>
        <Button onClick={onAddCharacter} className="flex items-center gap-2">
          <Plus size={18} />
          Ajouter un personnage
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
