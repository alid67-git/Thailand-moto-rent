"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  verified: boolean;
}

interface PendingRegistration {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  verifyMethod: "email" | "sms";
}

interface AuthContextValue {
  user: UserProfile | null;
  isOpen: boolean;
  authView: AuthView;
  pendingCode: string | null;
  openAuth: (view?: AuthView) => void;
  closeAuth: () => void;
  setAuthView: (view: AuthView) => void;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (data: PendingRegistration) => Promise<{ ok: boolean; error?: string }>;
  verifyCode: (code: string) => Promise<{ ok: boolean; error?: string }>;
  resendCode: () => void;
  requestPasswordReset: (email: string) => Promise<{ ok: boolean }>;
  logout: () => void;
}

export type AuthView = "login" | "register" | "forgot" | "verify";

const STORAGE_USERS = "tmr_users";
const STORAGE_SESSION = "tmr_session";

interface StoredUser extends UserProfile {
  password: string;
}

function loadUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_USERS) ?? "[]") as StoredUser[];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView>("login");
  const [pending, setPending] = useState<PendingRegistration | null>(null);
  const [pendingCode, setPendingCode] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = localStorage.getItem(STORAGE_SESSION);
    if (!sessionId) return;
    const found = loadUsers().find((u) => u.id === sessionId);
    if (found) {
      const { password: _, ...profile } = found;
      setUser(profile);
    }
  }, []);

  const openAuth = useCallback((view: AuthView = "login") => {
    setAuthView(view);
    setIsOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setIsOpen(false);
    setPending(null);
    setPendingCode(null);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const found = loadUsers().find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: "invalidCredentials" };
    if (!found.verified) {
      setPending({
        firstName: found.firstName,
        lastName: found.lastName,
        email: found.email,
        phone: found.phone,
        password: found.password,
        verifyMethod: "email",
      });
      const code = generateCode();
      setPendingCode(code);
      setAuthView("verify");
      setIsOpen(true);
      return { ok: false, error: "unverified" };
    }
    const { password: _, ...profile } = found;
    setUser(profile);
    localStorage.setItem(STORAGE_SESSION, found.id);
    closeAuth();
    return { ok: true };
  }, [closeAuth]);

  const register = useCallback(async (data: PendingRegistration) => {
    const users = loadUsers();
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { ok: false, error: "emailExists" };
    }
    setPending(data);
    const code = generateCode();
    setPendingCode(code);
    setAuthView("verify");
    return { ok: true };
  }, []);

  const verifyCode = useCallback(
    async (code: string) => {
      if (!pending || code !== pendingCode) {
        return { ok: false, error: "invalidCode" };
      }
      const users = loadUsers();
      const existing = users.find((u) => u.email.toLowerCase() === pending.email.toLowerCase());
      if (existing) {
        existing.verified = true;
        saveUsers(users);
        const { password: _pw, ...profile } = existing;
        setUser(profile);
        localStorage.setItem(STORAGE_SESSION, profile.id);
        closeAuth();
        return { ok: true };
      }
      const newUser: StoredUser = {
        id: crypto.randomUUID(),
        firstName: pending.firstName,
        lastName: pending.lastName,
        email: pending.email,
        phone: pending.phone,
        password: pending.password,
        verified: true,
      };
      users.push(newUser);
      saveUsers(users);
      const { password: _pw, ...profile } = newUser;
      setUser(profile);
      localStorage.setItem(STORAGE_SESSION, profile.id);
      closeAuth();
      return { ok: true };
    },
    [pending, pendingCode, closeAuth]
  );

  const resendCode = useCallback(() => {
    setPendingCode(generateCode());
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    void email;
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_SESSION);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isOpen,
      authView,
      pendingCode,
      openAuth,
      closeAuth,
      setAuthView,
      login,
      register,
      verifyCode,
      resendCode,
      requestPasswordReset,
      logout,
    }),
    [
      user,
      isOpen,
      authView,
      pendingCode,
      openAuth,
      closeAuth,
      login,
      register,
      verifyCode,
      resendCode,
      requestPasswordReset,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
