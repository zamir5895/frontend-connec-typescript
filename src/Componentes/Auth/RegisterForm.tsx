import React, { useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import MapWithSearch from "../Utils/MapWithSearch";
import { registerUser, personalInformation, profile } from "../../Services/Auth/authservice";
import { useNavigate } from "react-router-dom";


const RegisterForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const router = useNavigate();
    const [formData1, setFormData1] = useState({
        userName: "",
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        edad: 0,
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });
    
    const [formData2, setFormData2] = useState({
        direccion: "",
        ciudad: "",
        pais: "",
        telefono: "",
        gender: "",
        celular: "",
        genero: "",
        latitud: 0,
        longitud: 0,

        dateBirth: new Date(),
    });
    const [userId, setUserId] = useState(0);
    
    const [descripcion, setDescripcion] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        width: 100,
        height: 100,
        x: 0,
        y: 0,
    });

    const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
    const [editingImage, setEditingImage] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const wordCount = value.split(/\s+/).filter(Boolean).length;
        if (wordCount <= 200) {
            setDescripcion(value);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setFile(file);
            setImagePreview(URL.createObjectURL(file));
            setEditingImage(true);
        }
    };


    const handleImageSave = () => {
        setEditingImage(false);
    };

   
   

    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData2((prev) => ({ ...prev, [name]: value }));
    };
   
  
    const nextStep = () => setStep((prev) => prev + 1);
    
    interface FormErrors {
      [key: string]: string;
    }
    
const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData1({ ...formData1, [name]: value });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData1).forEach((field) => {
      if (!formData1[field as keyof typeof formData1]) {
        newErrors[field] = "Este campo es requerido";
      }
    });

    if (formData1.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData1.email)) {
      newErrors.email = "Correo electrónico no válido";
    }

    if (formData1.password !== formData1.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return; 

    try {
      console.log("Registrando usuario", formData1);
      const response = await registerUser(formData1); 
      if (response.status === 200) {
        console.log("Usuario registrado exitosamente");
        setUserId(response.data.userId);
        nextStep();
      } else {
        console.log("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al registrar usuario", error);
      alert("Error al registrar usuario");
    }
  };
  const validateForm2 = () => {
    const newErrors: FormErrors = {};

    Object.keys(formData2).forEach((field) => {
      if (!formData2[field as keyof typeof formData2] && field !== 'latitud' && field !== 'longitud') {
        newErrors[field] = "Este campo es requerido";
      }
    });

    if (formData2.telefono && formData2.telefono.length < 9) {
      newErrors.telefono = "El teléfono debe tener al menos 9 dígitos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handlerPersonalInformation = async () => {
        if(!validateForm2()) return;
        try{
            console.log("Registrando información personal", formData2);
            console.log("verificamos userId", userId);

            const response = await personalInformation(formData2, userId);
            if(response.status === 200){
                console.log("Información personal registrada exitosamente");
                nextStep();
            }else{
                console.log("Error al registrar información personal");
            }
        }catch(error){
            console.log("Error al registrar información personal", error);
            alert("Error al registrar información personal");
        }
    }


    const handleProfile = async () => {
        try{
            const response = await profile(descripcion, file!, userId);
            if(response.status === 200){
                console.log("Perfil registrado exitosamente");
                console.log("Datos del perfil:", response.data);
                router("/auth");
            }else{
                console.log("Error al registrar perfil");

            }
        }catch(error){
            console.log("Error al registrar perfil", error);
            alert("Error al registrar perfil");
        }
    }


    return (
        <div>
            <div className="mb-4 text-sm text-gray-500">Paso {step} de 3</div>
            
            {step === 1 && (
              <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="primerNombre"> Primer nombre</label>
                    <input 
                        id="primerNombre" 
                        name="primerNombre" 
                        type="text" 
                        value={formData1.primerNombre} 
                        onChange={handleChange1} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required 
                    />
                    {errors.primerNombre && <span className="text-red-500">{errors.primerNombre}</span>}

                </div>
                <div>
                  <label htmlFor="segundoNombre"> Segundo nombre</label>
                    <input 
                        id="segundoNombre" 
                        name="segundoNombre" 
                        type="text" 
                        value={formData1.segundoNombre} 
                        onChange={handleChange1} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required 
                    />
                    {errors.segundoNombre && <span className="text-red-500">{errors.segundoNombre}</span>}

                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="primerApellido"> Primer apellido</label>
                    <input 
                        id="primerApellido" 
                        name="primerApellido" 
                        type="text" 
                        value={formData1.primerApellido} 
                        onChange={handleChange1} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required 
                    />
                    {errors.primerApellido && <span className="text-red-500">{errors.primerApellido}</span>}

                </div>
                <div>
                  <label htmlFor="segundoApellido"> Segundo apellido</label>
                    <input 
                        id="segundoApellido" 
                        name="segundoApellido" 
                        type="text" 
                        value={formData1.segundoApellido} 
                        onChange={handleChange1} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required 
                    />
                    {errors.segundoApellido && <span className="text-red-500">{errors.segundoApellido}</span>}

                </div>
              </div>
              <div className="space-y-2">
                  <label htmlFor="userName">Nombre de usuario</label>
                  <input 
                      id="userName" 
                      name="userName" 
                      type="text" 
                      value={formData1.userName} 
                      onChange={handleChange1} 
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      required 
                  />
                    {errors.userName && <span className="text-red-500">{errors.userName}</span>}

                  
              </div>
              <div className="space-y-2">
                  <label htmlFor="email">Correo electrónico</label>
                  <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData1.email} 
                      onChange={handleChange1} 
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      required 
                  />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}

              </div>
              <div className="space-y-2">
                <label htmlFor="password">Contraseña</label>
                <input 
                    id="password" 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    value={formData1.password} 
                    onChange={handleChange1} 
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

                    {errors.password && <span className="text-red-500">{errors.password}</span>}
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type={showPassword ? "text" : "password"} 
                    value={formData1.confirmPassword} 
                    onChange={handleChange1} 
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
                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}

              </div>
              <div className="space-y-2">
                <label htmlFor="edad">Edad</label>
                <input 
                    id="edad" 
                    name="edad" 
                    type="number" 
                    value={formData1.edad}  
                    onChange={handleChange1}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required 
                />
                {errors.edad && <span className="text-red-500">{errors.edad}</span>}

              </div>
             
              <div className="space-y-2">
                <label htmlFor="rol">Rol</label>
                <select
                    name="rol"
                    value={formData1.role}
                    onChange={(e) => setFormData1({ ...formData1, role: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                >
                  <option value="">Selecciona tu rol</option>
                  <option value="TRAVELER">VIAJERO</option>
                  <option value="HOST">HOST</option>
                </select>
                {errors.role && <span className="text-red-500">{errors.role}</span>}

              </div>          
              <button onClick={handleRegister} className="bg-gray-600 text-white py-2 px-4 rounded-md mt-4">
                  Registrarse
              </button>
             </div>
            )}
            
            {step === 2 && (
                <div className="space-y-4">
                    <div>
                        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección</label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            value={formData2.direccion}
                            onChange={handleChange2}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.direccion && <span className="text-red-500">{errors.direccion}</span>}

                    </div>
                    <div>
                        <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">Ciudad</label>
                        <input
                            type="text"
                            id="ciudad"
                            name="ciudad"
                            value={formData2.ciudad}
                            onChange={handleChange2}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.ciudad && <span className="text-red-500">{errors.ciudad}</span>}

                    </div>
                    <div>
                        <label htmlFor="pais" className="block text-sm font-medium text-gray-700">País</label>
                        <input
                            type="text"
                            id="pais"
                            name="pais"
                            value={formData2.pais}
                            onChange={handleChange2}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.pais && <span className="text-red-500">{errors.pais}</span>}

                    </div>
                    <div>
                        <MapWithSearch
                            setLatitude={(lat) => {
                            console.log("Latitud:", lat);
                            setFormData2((prev) => ({ ...prev, latitud: lat }));
                            }}
                            setLongitude={(lng) => {
                            console.log("Longitud:", lng);
                            setFormData2((prev) => ({ ...prev, longitud: lng }));
                            }}
                        />
                    </div>
                                                            
                    <div>
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input
                            type="text"
                            id="telefono"
                            name="telefono"
                            value={formData2.telefono}
                            onChange={handleChange2}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.telefono && <span className="text-red-500">{errors.telefono}</span>}

                    </div>
                    <div>
                        <label htmlFor="genero" className="block text-sm font-medium text-gray-700">Género</label>
                        <select
                            id="genero"
                            name="genero"
                            value={formData2.genero}
                            onChange={(e) => setFormData2({ ...formData2, genero: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Selecciona tu género</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaNacimiento">
                        Fecha de Nacimiento
                    </label>
                    <input
                        type="date"
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        value={formData2.dateBirth.toISOString().split('T')[0]}
                        onChange={(e) => setFormData2({ ...formData2, dateBirth: new Date(e.target.value) })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>
                
                    <button onClick={handlerPersonalInformation} className="bg-blue-500 text-white py-2 px-4 rounded-md">
                        Registrar
                    </button>
                </div>
            )}
            

            {step === 3 && (
           <div className="space-y-4">
           <div>
               <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
               <textarea
                   id="descripcion"
                   name="descripcion"
                   onChange={handleDescriptionChange}
                   rows={4}
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md resize-none overflow-hidden"
                   style={{ height: 'auto' }}
               />
               <p className="text-sm text-gray-500 mt-1">Máximo 200 palabras</p>
           </div>

           <div>
               <label htmlFor="foto" className="block text-sm font-medium text-gray-700">Foto de Perfil</label>
               <input
                   type="file"
                   id="foto"
                   name="foto"
                   onChange={handleFileChange}
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
               />
               {imagePreview && (
                   <div className="mt-4">
                       {editingImage ? (
                           <>
                               <ReactCrop
                                   crop={crop}
                                   onChange={(newCrop) => setCrop(newCrop)}
                                   onComplete={(c) => setCompletedCrop(c)}
                               >
                                   <img src={imagePreview} alt="Crop preview" />
                               </ReactCrop>
                               <button
                                   onClick={handleImageSave}
                                   className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                               >
                                   Confirmar Recorte
                               </button>
                           </>
                       ) : (
                           <img
                               src={imagePreview}
                               alt="Vista previa"
                               className="max-w-full h-auto rounded-lg shadow-lg"
                           />
                       )}
                   </div>
               )}
           </div>

           <button onClick={handleProfile} type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
               Finalizar
           </button>
       </div>
        )}
        </div>
    );
};

export default RegisterForm;
