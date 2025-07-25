import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
    id: string;
    username: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // useEffect(() => {
    //     // Fixed: Use consistent localStorage keys
    //     const storedUser = localStorage.getItem('authUser');
    //     const storedToken = localStorage.getItem('authToken');

    //     if (storedUser && storedToken) {
    //         setUser(JSON.parse(storedUser));
    //         setToken(storedToken);
    //     }
    // }, []);

    useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    const storedToken = localStorage.getItem('authToken');

    if (storedUser && storedToken) {
        try {
            // Try to parse the stored user data
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        } catch (error) {
            // If parsing fails, the data is corrupt. Clear it.
            console.error("Failed to parse auth user from localStorage:", error);
            localStorage.removeItem('authUser');
            localStorage.removeItem('authToken');
        }
    }
}, []);

    const login = (userData: User, authToken: string) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('authUser', JSON.stringify(userData));
        localStorage.setItem('authToken', authToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authUser');
        localStorage.removeItem('authToken');
    };

    const authState: AuthState = {
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};