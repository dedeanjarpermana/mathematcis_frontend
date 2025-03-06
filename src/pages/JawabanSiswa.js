import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigasi";
import NavMenuAkun from "../components/NavMenuAkun";
import axios from "axios";

function HasilSiswa() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // 🔹 State untuk pencarian

  // **🔹 Ambil Data dari Backend**
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/jawaban-siswa");
        setData(response.data);
      } catch (err) {
        setError("Gagal mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  // **🔹 Filter Data Berdasarkan Pencarian Nama**
  const filteredData = data.filter((item) =>
    (item.nama_siswa ? item.nama_siswa.toLowerCase() : "").includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Navigation />

      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between bg-white h-16 px-6 shadow">
          <NavMenuAkun />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Hasil Jawaban Siswa</h2>

          {/* 🔹 Input Pencarian */}
          <input
            type="text"
            placeholder="Cari berdasarkan Nama Siswa..."
            className="w-full border p-2 mb-4 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Nama Siswa</th>
                <th className="border border-gray-300 px-4 py-2">ID Soal</th>
                <th className="border border-gray-300 px-4 py-2">Hasil</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 text-left">
                      {item.nama_siswa || "Tidak Ada Nama"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{item.id_soal}</td>
                    <td
                      className={`border border-gray-300 px-4 py-2 text-center font-semibold ${
                        item.hasil === "benar" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.hasil}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center text-red-500">
                    Tidak ada data siswa yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HasilSiswa;
