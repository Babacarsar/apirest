
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface CharacterFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  universeFilter: string;
  onUniverseFilterChange: (value: string) => void;
  universes: string[];
  onResetFilters: () => void;
}

const CharacterFilter: React.FC<CharacterFilterProps> = ({
  searchTerm,
  onSearchChange,
  universeFilter,
  onUniverseFilterChange,
  universes,
  onResetFilters
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-muted/40 p-4 rounded-lg mb-6">
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder="Rechercher un personnage..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      </div>
      
      <div className="flex gap-2">
        <div className="w-full sm:w-[200px]">
          <Select value={universeFilter} onValueChange={onUniverseFilterChange}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <SelectValue placeholder="Tous les univers" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_all">Tous les univers</SelectItem>
              {universes.map((universe) => (
                <SelectItem key={universe} value={universe}>
                  {universe}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" onClick={onResetFilters} disabled={!searchTerm && !universeFilter}>
          Réinitialiser
        </Button>
      </div>
    </div>
  );
};

export default CharacterFilter;
