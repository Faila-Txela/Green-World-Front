import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  // Defina as propriedades para o tipo `user`
  id: string;
  name: string;
}

interface Empresa {
  // Defina as propriedades para o tipo `empresa`
  id: string;
  companyName: string;
}

interface authContextType {
  user: Empresa | User | null;
  setUser: React.Dispatch<React.SetStateAction<Empresa | User | null>>;
}

const authContext = createContext<authContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Empresa | User | null>(null);

  useEffect(()=>{
    const data = localStorage.getItem("user")
    if (data) {
      setUser(JSON.parse(data))
    }
    else{
      setUser(null)
    }
  }, [])

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
