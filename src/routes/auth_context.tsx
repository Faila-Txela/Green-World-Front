import React, { createContext, useContext, useEffect, useState } from "react";

interface user {
  // Defina as propriedades para o tipo `user`
  id: string;
  name: string;
}

interface empresa {
  // Defina as propriedades para o tipo `empresa`
  id: string;
  companyName: string;
}

interface authContextType {
  user: empresa | user | null;
  setUser: React.Dispatch<React.SetStateAction<empresa | user | null>>;
}

const authContext = createContext<authContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<empresa | user | null>(null);

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
