import React, { useEffect, useState } from "react";
import Navigation from '../components/Navigasi';
import NavMenuAkun from '../components/NavMenuAkun';
import axios from "axios";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data dari API
  

  return (

    <div className="flex">
      {/* Sidebar Navigation */}
      <Navigation />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-white h-16 px-6 shadow">
          {/* <span className="text-lg font-bold text-gray-800">Traceability Matrix</span> */}
          <NavMenuAkun />
        </div>
        {/* Main Content */}
        <div className="p-6">
         <h3 className="text-blue-500 text-[60pt]">Selamat datang di latihan soal</h3>
        </div>
      </div>
    </div>

  );
}

export default Dashboard;
