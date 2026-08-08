import React, { createContext, useContext, useState, useEffect } from 'react';
import { setAuthToken } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('task_app_token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('task_app_user')) || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('task_app_token', token);
      setAuthToken(token);
    } else {
      localStorage.removeItem('task_app_token');
      setAuthToken(null);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('task_app_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('task_app_user');
    }
  }, [user]);

  const login = (data) => {
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
