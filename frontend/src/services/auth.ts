
import { toast } from "@/hooks/use-toast";

// Types
export interface LoginCredentials {
  user_id: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface AuthState {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  expiresAt: number | null;
}

const BASE_URL = "http://localhost:8000"; // Ajustez selon votre configuration

// Constantes de localStorage
const TOKEN_KEY = "auth_token";
const USER_ID_KEY = "user_id";
const TOKEN_EXPIRY_KEY = "token_expiry";

// Service d'authentification
export const authService = {
  // Initialiser l'état d'authentification depuis localStorage
  getAuthState(): AuthState {
    const token = localStorage.getItem(TOKEN_KEY);
    const userId = localStorage.getItem(USER_ID_KEY);
    const expiresAt = localStorage.getItem(TOKEN_EXPIRY_KEY);

    const isValid = token && expiresAt && parseInt(expiresAt) > Date.now();

    return {
      token: isValid ? token : null,
      userId: isValid ? userId : null,
      isAuthenticated: !!isValid,
      expiresAt: expiresAt ? parseInt(expiresAt) : null
    };
  },

  // Se connecter et obtenir un token
  async login(credentials: LoginCredentials): Promise<AuthState> {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Échec de la connexion");
      }

      const data: AuthResponse = await response.json();

      // Décoder le payload du JWT (simplement pour obtenir l'expiration)
      // Note: Dans une app réelle, utilisez une bibliothèque comme jwt-decode
      const base64Url = data.access_token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));

      // Calculer l'expiration en millisecondes
      const expiresAt = payload.exp * 1000; // Convertir secondes en millisecondes

      // Stocker dans localStorage
      localStorage.setItem(TOKEN_KEY, data.access_token);
      localStorage.setItem(USER_ID_KEY, credentials.user_id);
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt.toString());

      return {
        token: data.access_token,
        userId: credentials.user_id,
        isAuthenticated: true,
        expiresAt
      };
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
  },

  // Se déconnecter
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  },

  // Vérifier si le token est valide
  isAuthenticated(): boolean {
    const { isAuthenticated } = this.getAuthState();
    return isAuthenticated;
  },

  // Obtenir le token pour les appels API
  getToken(): string | null {
    const { token, expiresAt } = this.getAuthState();

    // Vérifier si le token est expiré
    if (token && expiresAt && expiresAt < Date.now()) {
      this.logout();
      return null;
    }

    return token;
  }
};