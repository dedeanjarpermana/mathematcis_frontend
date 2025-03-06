import React, { useEffect, useState } from "react";
import Navigation from '../components/Navigasi';
import NavMenuAkun from '../components/NavMenuAkun';
import axios from "axios";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/anggota-koperasi");; // Pastikan endpoint sesuai dengan settingan backend
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading data...</div>;
  }

  // Render error state jika data tidak ada
  if (!dashboardData) {
    return <div>Error loading dashboard data</div>;
  }

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
          <h3 className="text-red-500">-- List Anggota Koperasi 2024 --</h3>
          <table className="table-auto w-full border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          
          
          <th className="border border-gray-300 px-4 py-2">Jumlah Seluruh Investasi</th>
          <th className="border border-gray-300 px-4 py-2">Jumlah Seluruh Tabungan</th>
          <th className="border border-gray-300 px-4 py-2">Jumlah Seluruh Pinjaman</th>
          <th className="border border-gray-300 px-4 py-2">Jumlah Pinjaman Masuk</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-300 px-4 py-2 text-center">1</td>
          <td className="border border-gray-300 px-4 py-2 text-center">{dashboardData.jumlah_anggota}</td>
          <td className="border border-gray-300 px-4 py-2 text-center">{dashboardData.jumlah_investasi}</td>
          <td className="border border-gray-300 px-4 py-2 text-center">{dashboardData.jumlah_tabungan}</td>
          <td className="border border-gray-300 px-4 py-2 text-center">{dashboardData.jumlah_pinjaman}</td>
          <td className="border border-gray-300 px-4 py-2 text-center">{dashboardData.pinjaman_masuk}</td>
        </tr>
      </tbody>
    </table>
        </div>
      </div>
    </div>

  );
}

export default Dashboard;
