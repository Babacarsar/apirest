
import React from "react";
import { Character } from "../types/character";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Edit, Trash, BookOpen } from "lucide-react";

interface CharacterCardProps {
  character: Character;
  onEdit: (character: Character) => void;
  onDelete: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onEdit, onDelete }) => {
  return (
    <Card className="character-card">
      <div className="p-4">
        <h3 className="font-bold text-xl mb-1">{character.nom}</h3>
        <span className="character-universe-badge">{character.univers}</span>
        
        <div className="mt-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen size={16} />
            <span>Univers: {character.univers}</span>
          </div>
        </div>
        
        <CardFooter className="flex justify-end gap-2 px-0 pt-4 pb-0">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(character)}
            className="flex items-center gap-1"
          >
            <Edit size={14} />
            Modifier
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onDelete(character)}
            className="flex items-center gap-1"
          >
            <Trash size={14} />
            Supprimer
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default CharacterCard;
