import { useState, useEffect } from "react";

// Définition du type Personnage
interface Personnage {
  nom: string;
  univers: string;
}

const PersonnageApp = () => {
  const [personnages, setPersonnages] = useState<Personnage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("mytoken123");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // États pour le formulaire d'ajout/modification
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [currentPersonnage, setCurrentPersonnage] = useState<Personnage>({ nom: "", univers: "" });
  const [originalNom, setOriginalNom] = useState<string>("");

  // Le reste du code reste essentiellement le même...