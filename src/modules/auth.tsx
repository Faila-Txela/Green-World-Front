// auth.js
export const isAuthenticated = () => {
    // Você pode verificar um token de autenticação ou uma flag de login aqui
    return localStorage.getItem("isAuthenticated") === "true";
  };
  