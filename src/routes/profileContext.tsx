// profileContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProfileContextProps {
  profilePic: string | null;
  setProfilePic: (url: string | null) => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profilePic, setProfilePic] = useState<string | null>(localStorage.getItem("userFoto") || null);

  // Atualiza também no localStorage quando muda!
  const updateProfilePic = (url: string | null) => {
    if (url) localStorage.setItem("userFoto", url);
    else localStorage.removeItem("userFoto");
    setProfilePic(url);
  };

  return (
    <ProfileContext.Provider value={{ profilePic, setProfilePic: updateProfilePic }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within a ProfileProvider");
  return context;
};
