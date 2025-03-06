import React, { useEffect, useState } from "react";
import Navigation from '../components/Navigasi';
import NavMenuAkun from '../components/NavMenuAkun';
import { formatTanggal } from "../utils/dateUtils";
import axios from "axios";

function ListAnggota() {
  const [listAnggota, setListAnggota] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/anggota-koperasi");; // Pastikan endpoint sesuai dengan settingan backend
        setListAnggota(response.data);
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
  if (!listAnggota || listAnggota.length === 0) {
    return <div>No data available </div>;
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
          <h3 className="text-blue-400">List Anggota Koperasi 2024</h3>
          <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID Anggota</th>
              <th className="border border-gray-300 px-4 py-2">Nama Anggota</th>
              <th className="border border-gray-300 px-4 py-2">Tanggal Masuk</th>
              <th className="border border-gray-300 px-4 py-2">Alamat</th>
            </tr>
          </thead>

          <tbody>       
            {listAnggota.map((item) => (
              <tr key={item.id_anggota}>  
              <td className="border border-gray-300 px-4 py-2 text-center text-[12px] text-gray-500">{item.id_anggota}</td>
              <td className="border border-gray-300 px-4 py-2 text-left">{item.nama_lengkap}</td>
              <td className="border border-gray-300 px-4 py-2 text-left">{formatTanggal(item.tanggal_masuk)}</td>
              <td className="border border-gray-300 px-4 py-2 text-left">{item.alamat}</td>
            </tr>

            ))} 
            
          </tbody>

    </table>
        </div>
      </div>
    </div>

  );
}

export default ListAnggota;
