import React from "react";
import AuthForm from "../Componentes/Auth/AuthForm";

const AuthPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen min-w-full bg-gradient-to-r from-blue-100 to-purple-100 px-4">
            <div className="flex items-center justify-center w-full max-w-screen-md p-6 bg-white rounded-lg shadow-lg mx-auto">
                <AuthForm />
            </div>
        </div>
    );
};

export default AuthPage;