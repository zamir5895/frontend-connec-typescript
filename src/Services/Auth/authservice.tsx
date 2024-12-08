

import { axiosAuthInstance } from "../AxiosConfig";


export const registerUser = async (data: any) => {
    try {
        const response = await axiosAuthInstance.post("/register", data);
        console.log(response);
        return response;

    } catch (error) {
        return (error as any).response.data;
    }
}

export const personalInformation = async (data: any, userId: Number) => {
    try {
        const response = await axiosAuthInstance.patch(`/personalInformation/${userId}`, data);
        return response;
    } catch (error) {
        return (error as any).response.data;
    }
}

export const profile = async (descripcion: string, foto: File, userId: number) => {
    try {
        const formData = new FormData();
        
        formData.append("descripcion", descripcion);
        formData.append("file", foto);

        const response = await axiosAuthInstance.patch(`/profile/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        return (error as any).response.data;
        throw error;
    }
}


export const loginUser = async (data: any) => {
    try {
        const response = await axiosAuthInstance.post("/login", data);
        return response;
    } catch (error) {
        return (error as any).response;
    }
}


export const logout = async (token: string) => {
    try {
        const response = await axiosAuthInstance.post('/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.log("Error al cerrar sesión:", error);
        return (error as any).response;
    }
};


export const autentificar = async (token: string) => {
    console.log("Autentificando al usuario con token:", token);

    try {
        const response = await axiosAuthInstance.get(
            '/authentication',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log("Error al autentificar al usuario:", error);
        throw error;
    }
};


