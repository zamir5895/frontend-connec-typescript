import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { loginUser } from "../../Services/Auth/authservice";

const LoginForm: React.FC = () => {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const router = useNavigate();
    const { saveAuthData } = useAuth();

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
        if (name === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(emailPattern.test(value) ? "" : "Correo electrónico no válido");
        }
    };

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!emailError) {
            console.log("Iniciar sesión con:", loginData);
            try{
                console.log("Inicianso")
                const response = await loginUser({email: loginData.email, password: loginData.password});
                console.log(response);
                if(response.status === 200){
                    const token = response.data.token;
                    
                    const role = response.data.role; 
                    saveAuthData(token, role);
                    console.log("Token guardado en localStorage:", localStorage.getItem('authToken'));
                    console.log("Rol guardado en localStorage:", localStorage.getItem('userRole'));
    
                    router("/dashboard");
                }
            }catch(error){
                console.error(error);
        }
    };
}

    return (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleLoginChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        onChange={handleLoginChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                        {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
                Iniciar Sesión
            </button>
        </form>
    );
};

export default LoginForm;