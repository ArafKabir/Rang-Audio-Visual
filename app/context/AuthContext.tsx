import React, { createContext, useContext, useState, type ReactNode } from "react";
import {Navigate} from "react-router";

export type AdminDTO = {
    id: number;
    name: string;
    email: string;
    password: string | null;
    phoneNumber: string;
    role: string;
};

type AuthContextType = {
    admin: AdminDTO | null;
    setAdmin: (admin: AdminDTO | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [admin, setAdmin] = useState<AdminDTO | null>(null);
    return (
        <AuthContext.Provider value={{ admin, setAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { admin } = useAuth();

    if (!admin) {

        return <Navigate to="/login" replace />;
    }

    return children;
}