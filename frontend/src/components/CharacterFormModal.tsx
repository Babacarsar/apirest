
import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CharacterForm from "./CharacterForm";
import { Character } from "../types/character";

interface CharacterFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCharacter: Character | null;
  onSubmit: (data: Character) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const CharacterFormModal: React.FC<CharacterFormModalProps> = ({
  isOpen,
  onOpenChange,
  selectedCharacter,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg">
        <CharacterForm
          character={selectedCharacter || undefined}
          onSubmit={onSubmit}
          onCancel={onCancel}
          isSubmitting={isSubmitting}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CharacterFormModal;
