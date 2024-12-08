import React from "react";
import Navbar from "../Componentes/Navbar/Navbar";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-16"> {/* Ajuste de margen superior */}
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
