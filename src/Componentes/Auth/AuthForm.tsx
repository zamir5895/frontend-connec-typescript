import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthForm: React.FC = () => {
    const [activeTab, setActiveTab] = useState("login");

    return (
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl transition-all duration-500 ease-in-out transform hover:scale-105">
            <div className="flex items-center justify-center mb-6">
                <p className="text-3xl font-bold text-center text-gray-700">Bienvenido a Living</p>
            </div>
            <div className="flex justify-around mb-6">
                <button
                    className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                        activeTab === "login" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-700"
                    } hover:bg-gray-400`}
                    onClick={() => setActiveTab("login")}
                >
                    Iniciar Sesión
                </button>
                <button
                    className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                        activeTab === "register" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-700"
                    } hover:bg-gray-400`}
                    onClick={() => setActiveTab("register")}
                >
                    Registrarse
                </button>
            </div>

            <div className="mt-4">
                {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
            </div>
        </div>
    );
};

export default AuthForm;