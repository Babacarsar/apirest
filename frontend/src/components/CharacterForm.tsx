
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Character } from "../types/character";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const characterSchema = z.object({
  nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  univers: z.string().min(2, { message: "L'univers doit contenir au moins 2 caractères" })
});

interface CharacterFormProps {
  character?: Character;
  onSubmit: (data: Character) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const CharacterForm: React.FC<CharacterFormProps> = ({ 
  character, onSubmit, onCancel, isSubmitting 
}) => {
  const form = useForm<Character>({
    resolver: zodResolver(characterSchema),
    defaultValues: character || {
      nom: "",
      univers: ""
    }
  });

  const isEditing = !!character;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">{isEditing ? "Modifier un personnage" : "Ajouter un personnage"}</h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="h-8 w-8 rounded-full"
          >
            <X size={16} />
          </Button>
        </div>

        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Entrez le nom du personnage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="univers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Univers</FormLabel>
              <FormControl>
                <Input placeholder="Entrez l'univers du personnage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Traitement..." : isEditing ? "Mettre à jour" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CharacterForm;
